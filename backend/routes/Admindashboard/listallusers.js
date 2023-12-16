
const mongoose = require("mongoose");


const Users=require("../../models/userSchema");

const path = require('path');

const express = require('express');

const multer  = require('multer');
const User = require("../../models/userSchema");

const {emailSender}=require("../../secure/mail")

const admindash = require("express").Router();

const dateFns = require('date-fns');

const nodemailer = require('nodemailer');


const CryptoJS = require('crypto-js');

// const NodeGeocoder = require('node-geocoder');

const NodeGeocoder = require('node-geocoder');




const fs = require('fs');


const moment = require('moment'); // Import the moment library for date formatting







// get users by role and location..................................................in use........................useing in assigning task....... by role.....................



// this is for admin to assigne task to admin,ichp,sub admin   


admindash.post("/filter", async (req, res) => {
  const role = req.body.role;
  const location = req.body.location;
  const inputValue = req.body.inputValue;


  const userId = req.body.userId




  try {
    let result;




    if (role != "Team Member") {


      if (location) {
        result = await Users.find({
          $or: [
            { role: role },
            { AdditionalPortalAccess: role }
          ],
          location: { $regex: location, $options: "i" }, // Case-insensitive regex match for location
          name: { $regex: new RegExp(inputValue, "i") }, // Case-insensitive regex match for name
        });
      } else {
        result = await Users.find({
          $or: [
            { role: role },
            { AdditionalPortalAccess: role }
          ],
          name: { $regex: new RegExp(inputValue, "i") }, // Case-insensitive regex match for name
        });
      }


    }




    // here we are sending the team members list of a particular team lead


    if (role == "Team Member") {



      const res = await User.findById(userId).select("AdditionalPortalAccessTeam")


      result = res.AdditionalPortalAccessTeam
    }





    if (result) {
      res.status(200).json({
        result: result,
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});







admindash.post("/getusers/:userId", async (req, res) => {
  const userId = req.params.userId;
  const NameOfUser = req.body.name;


  console.log("NameOfUser", req.body.name)

  try {
    const admindata = await Users.findOne({ _id: userId });

    if (!admindata) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    const adminstate = admindata.state ? admindata.state.toString() : null;
    const location = admindata.location;

    const query = {
      role: { $in: ["iu", "ichp"] },
      verified: false,
      $or: [
        { name: { $regex: new RegExp(NameOfUser, 'i') } }, // Use RegExp for case-insensitive search
        { email: { $regex: new RegExp(NameOfUser, 'i') } },
      ],
    };

    if (adminstate) {
      query.$or.push({
        Professionalstate: { $regex: new RegExp(adminstate, 'i') },
      });
    }

    if (location) {
      query.$or.push({
        $or: [
          { location: { $regex: new RegExp(location, 'i') } },
          { State: { $regex: new RegExp(location, 'i') } },
        ],
      });
    }

    const result = await Users.find(query);

    // Filter users who have all three types of documents
    const filteredUsers = result.filter((user) =>
      user.education.some(
        (data) =>
          data.Convocation || data.ConsolidatedMarksheets || data.IndividualMarksheet
      )
    );

    res.status(200).json({
      result: filteredUsers,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
});












// accpet task..............................................................ACCEPT...................



const { validationResult } = require("express-validator");
const companySchema = require("../../models/company/companySchema");






// ..................................................................................................................................................................................ADMIN.......................






// accept education task...................................................................admin dashboard.........................

admindash.post("/Accepteducationtask_admin", async (req, res) => {

  const formattedDate = moment().format('DD/MM/YY');


  let iuid = req.body.iuid;
  let taskname = req.body.taskname;
  let acceptedUserId = req.body.acceptedUserId;

  try {
    // Validate incoming data
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { iuid, collegename, acceptedUserId, qualification } = req.body;

    // Find the accepted user by ID
    let acceptedUserDetails = await User.findById(acceptedUserId);


    let iudetails = await User.findById(iuid);

    if (!acceptedUserDetails || !iudetails) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found for the provided ID.",
      });
    }



    // Create an empty task array if it doesn't exist

    acceptedUserDetails.acceptededucationtask = acceptedUserDetails.acceptededucationtask || [];

    // Check if a task with the same taskname and userid exists in the task array

    const taskExists = acceptedUserDetails.acceptededucationtask.some(
      (acceptedtasks) => acceptedtasks.collegename === collegename && acceptedtasks.userid === iuid && acceptedtasks.qualification === qualification
    );

    if (!taskExists) {
      // Add the task to the array if it doesn't exist
      acceptedUserDetails.acceptededucationtask.push({ userid: iuid, collegename: collegename, qualification: qualification, date: formattedDate });

      // Update the user document
      acceptedUserDetails = await acceptedUserDetails.save();
    }




    // updatating whoaccepted value in educational details........................

    // Find the education object that matches the specified conditions
    const matchingEducation = iudetails.education.find((data) => {
      return data.college === collegename && data.qualification === qualification;
    });

    // If matchingEducation is found, update "whoaccepted" values
    if (matchingEducation) {
      matchingEducation.whoaccepted = matchingEducation.whoaccepted || {};

      if (matchingEducation.whoaccepted.accepteduseremail !== acceptedUserDetails.email) {

        matchingEducation.whoaccepted.accepteduserId = acceptedUserId;

        matchingEducation.whoaccepted.accepteduseremail = acceptedUserDetails.email;
        matchingEducation.whoaccepted.status = "ongoing"

        matchingEducation.whoaccepted.date = formattedDate;
      }
    }


    // Update iudetails
    iudetails = await iudetails.save();




    res.status(200).json({
      acceptedUserDetails,
      iudetails,
    });
  }

  catch (e) {
    console.error("Error:", e);
    return res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
})



// accepting job task.........which are....accepting in .................................admin dashboard...............


admindash.post("/Acceptjobtask_admin", async (req, res) => {
  const formattedDate = moment().format('DD/MM/YY');
  let iuid = req.body.iuid;
  let taskname = req.body.taskname;
  let acceptedUserId = req.body.acceptedUserId;

  try {
    // Validate incoming data
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { iuid, companyname, acceptedUserId, experienceStart } = req.body;

    // Find the accepted user by ID
    let acceptedUserDetails = await User.findById(acceptedUserId);
    let iudetails = await User.findById(iuid);

    if (!acceptedUserDetails || !iudetails) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found for the provided ID.",
      });
    }

    // Create an empty task array if it doesn't exist
    acceptedUserDetails.acceptedjobtask = acceptedUserDetails.acceptedjobtask || [];

    // Check if a task with the same company name and user ID exists in the task array
    const taskExists = acceptedUserDetails.acceptedjobtask.some(
      (acceptedtasks) => acceptedtasks.companyname === companyname && acceptedtasks.userid === iuid
    );

    if (!taskExists) {
      // Add the task to the array if it doesn't exist
      acceptedUserDetails.acceptedjobtask.push({ userid: iuid, companyname: companyname, experienceStart: experienceStart, date: formattedDate });

      // Update the user document
      acceptedUserDetails = await acceptedUserDetails.save();
    }

    // Updating "whoaccepted" value in job experience details
    // Find the job object that matches the specified conditions
    const matchingjob = iudetails.JobExperience.find((data) => {
      return data.companyName === companyname && data.experienceStart === experienceStart;
    });

    // If matching job is found, update "whoaccepted" values
    if (matchingjob) {
      matchingjob.whoaccepted = matchingjob.whoaccepted || {};

      if (matchingjob.whoaccepted.accepteduserId !== acceptedUserId) {
        matchingjob.whoaccepted.accepteduserId = acceptedUserId;
        matchingjob.whoaccepted.accepteduseremail = acceptedUserDetails.email;
        matchingjob.whoaccepted.status = "ongoing";
        matchingjob.whoaccepted.date = formattedDate;
      }
    }

    // Update iudetails
    iudetails = await iudetails.save();

    res.status(200).json({
      acceptedUserDetails,
      iudetails,
    });
  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
});










// GET ACCEPTED EDUCATIONAL TASKS...............................



async function findUserByIds(userIds, NameOfUser) {
  const query = {
    _id: { $in: userIds },
    $or: [
      { name: NameOfUser ? { $regex: NameOfUser, $options: "i" } : { $exists: true } },
      { fullName: NameOfUser ? { $regex: NameOfUser, $options: "i" } : { $exists: true } }
    ]
  };

  const users = await User.find(query);

  return users;
}



// .................its working.......it is for admin......................same for all...


admindash.post("/getacceptededucationaltasks/:userId", async (req, res) => {

  const userId = req.params.userId;

  const NameOfUser = req.body.name;

  try {
    const admindata = await Users.findById(userId);

    const taskArray = admindata.acceptededucationtask || [];

    // Extract user IDs from the task array
    const userIds = taskArray.map((task) => task.userid);

    // Find users based on the extracted IDs
    const userdetails = await findUserByIds(userIds,NameOfUser);

    // Create a map to associate each user with their task details
    const resultMap = new Map();

    taskArray.forEach((task) => {
      // Extract relevant task information
      const taskInfo = {
        collegename: task.collegename,
        qualification: task.qualification,
        date: task.date,
      }

      // Get the user associated with the task
      const user = userdetails.find((u) => u._id.toString() === task.userid);

      if (user) {
        if (!resultMap.has(user._id)) {
          resultMap.set(user._id, { userdetails: user, tasks: [] });
        }
        resultMap.get(user._id).tasks.push(taskInfo);
      }
    });

    // Convert the map into an array of result objects
    const result = Array.from(resultMap.values());

    res.status(200).json({
      result: result,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});





// get accepted job details.................................................its working...........same for all...

async function findUserByIds(userIds, NameOfUser) {
  const query = {
    _id: { $in: userIds },
    $or: [
      { name: NameOfUser ? { $regex: NameOfUser, $options: "i" } : { $exists: true } },
      { fullName: NameOfUser ? { $regex: NameOfUser, $options: "i" } : { $exists: true } }
    ]
  };

  const users = await User.find(query);

  return users;
}



admindash.post("/getacceptedjobtasks/:userId", async (req, res) => {

  const userId = req.params.userId;

  const NameOfUser = req.body.name;

  try {
    const admindata = await Users.findById(userId);

    const taskArray = admindata.acceptedjobtask || [];

    // Extract user IDs from the task array
    const userIds = taskArray.map((task) => task.userid);


    const userdetails = await findUserByIds(userIds, NameOfUser);


    // Create a map to associate each user with their task details
    const resultMap = new Map();



    taskArray.forEach((task) => {
      // Extract relevant task information
      const taskInfo = {
        companyname: task.companyname,
        experienceStart: task.experienceStart,
        date: task.date,
      }

      // Get the user associated with the task
      const user = userdetails.find((u) => u._id.toString() === task.userid);

      if (user) {
        if (!resultMap.has(user._id)) {
          resultMap.set(user._id, { userdetails: user, tasks: [] });
        }
        resultMap.get(user._id).tasks.push(taskInfo);
      }
    });


    // Convert the map into an array of result objects


    const result = Array.from(resultMap.values());


    res.status(200).json({
      result: result,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});





// assign  task..........................................................................ASSIGNING................



// assign education verification task................same for all......


admindash.post("/assigneducationtask", async (req, res) => {

  const { assigneduserids, college, qualification, assignedby, iuid } = req.body;
  const indiaTimeZone = 'Asia/Kolkata';
  const formattedDate = Moment.tz(indiaTimeZone).format('DD/MM/YY HH:mm:ss');

  const Assigneduseremails = [];

  try {
    // Check if assignedby and iuid exist
    const assignedbydetails = await User.findById(assignedby);

    const iuuserdetails = await User.findById(iuid).select('-subscriptiondetails -password')

    if (!assignedbydetails || !iuuserdetails) {
      return res.status(404).json({
        status: "Not Found",
        message: "Invalid assigned by user or iu user.",
      });
    }

    // Find subadmin users and handle errors
    const assignedusers = await User.find({ _id: { $in: assigneduserids } });
    if (!assignedusers || assignedusers.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: "No subadmin users found for the provided IDs.",
      });
    }

    // Process subadmin users in parallel
    const updatePromises = assignedusers.map(async (subAdminUser) => {
      try {
        const assignedUserDetails = await User.findById(subAdminUser._id);

        if (!assignedUserDetails) {
          throw new Error("User not found for the provided ID.");
        }

        // Check if the task is already assigned to the subadmin
        const isTaskAssigned = assignedUserDetails.educationtask.some((task) => {
          return task.userdetails.email === iuuserdetails.email&& task.collegename === college && task.qualification === qualification;
        });

        assignedUserDetails.alerts = assignedUserDetails.alerts || [];

        if (!isTaskAssigned) {
          Assigneduseremails.push(assignedUserDetails.email);

          // Assign education verification task
          assignedUserDetails.educationtask.push({
            userdetails: iuuserdetails,
            date: formattedDate,
            assignedby: assignedbydetails.email,
            collegename: college,
            qualification: qualification,
          });

          // Send a notification
          const message = {
            subject: "Education Verification",
            content: `Education task of user ${iuuserdetails.name} at ${college} has been assigned to you by ${assignedbydetails.email}`,
            data: {
              userId: iuid,
              profilepic: iuuserdetails.profilePicture,
              
            },
            date: formattedDate
          };
          assignedUserDetails.alerts.push(message);

          // Save the subadmin user
          await assignedUserDetails.save({ suppressWarning: true });
        }
      } catch (error) {
        console.error("Error in updating task:", error.message);
      }
    });

    // Wait for all subadmin updates to complete
    await Promise.all(updatePromises);

    // Update iu user's education assignedto
    iuuserdetails.education.forEach((educationData) => {
      if (educationData.college === college && educationData.qualification === qualification) {
        educationData.assignedto = {
          AssigneduserIds: assigneduserids,
          Assigneduseremails: Assigneduseremails,
          accepteduseremail: "",
          status: "Assigned",
          date: formattedDate,
        };
      }
    });

    // Update assignedbydetails
    assignedbydetails.assignededucationtask = assignedbydetails.assignededucationtask || [];
    assignedbydetails.assignededucationtask.push({
      userdetails: {
        name: iuuserdetails.name,
        email: iuuserdetails.email,
        mobilenumber: iuuserdetails.mobilenumber,
      },
      college: college,
      date: formattedDate,
      assignedto: assigneduserids,
      Assigneduseremails: Assigneduseremails,
      qualification: qualification,
      Accepteduser: "",
      status: "Assigned",
    });

    // Save the iu user
    await iuuserdetails.save({ suppressWarning: true });
    // Save assignedbydetails
    await assignedbydetails.save({ suppressWarning: true });

    res.status(200).json({
      status: "Success",
      message: "Task updated for subadmin users.",
      Assigneduseremails,
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});







// assign job task.......................................................................................same for all...........



admindash.post("/assignjobtask", async (req, res) => {
  const { assigneduserids, companyname, experienceStart, assignedby, iuid } = req.body;
  const indiaTimeZone = 'Asia/Kolkata';
  const formattedDate = Moment.tz(indiaTimeZone).format('DD/MM/YY HH:mm:ss');


const Assigneduseremails=[]


  try {
    // Check if assignedby and iuid exist
    const assignedbydetails = await User.findById(assignedby);

    const iuuserdetails = await User.findById(iuid).select('-subscriptiondetails -password')

    if (!assignedbydetails || !iuuserdetails) {
      return res.status(404).json({
        status: "Not Found",
        message: "Invalid assigned by user or iu user.",
      });
    }

    // Find subadmin users and handle errors
    const assignedusers = await User.find({ _id: { $in: assigneduserids } });
    if (!assignedusers || assignedusers.length === 0) {
      return res.status(404).json({
        status: "Not Found",
        message: "No subadmin users found for the provided IDs.",
      });
    }

    // Process subadmin users in parallel
const updatePromises = assignedusers.map(async (subAdminUser) => {
  try {
    const assignedUserDetails = await User.findById(subAdminUser._id);

    if (!assignedUserDetails) {
      throw new Error(` user not found for ID: ${subAdminUser._id}`);
    }

    // Check if the job task is already assigned to the subadmin
    const isTaskAssigned = assignedUserDetails.jobtask.some((task) => {
      return task.userdetails.email === iuuserdetails.email && task.companyname === companyname && task.experienceStart === experienceStart;
    });

    // Initialize or ensure `alerts` is an array
    assignedUserDetails.alerts = assignedUserDetails.alerts || [];

    if (!isTaskAssigned) {

      Assigneduseremails.push(assignedUserDetails.email)

      // Assign job task
      assignedUserDetails.jobtask.push({
       userdetails: iuuserdetails,
        date: formattedDate,
        assignedby: assignedbydetails.email,
        companyname: companyname,
        experienceStart: experienceStart,
      })

      // Send a notification




      assignedUserDetails.alerts.push({
        subject: "Job Task Assignment",
        content: `Job task of user ${iuuserdetails.name} at ${companyname} has been assigned to you by ${assignedbydetails.email}`,
        data: {
          userId: iuid,
          profilepic: iuuserdetails.profilePicture,
          date: formattedDate,
        }
      });

      // Save the subadmin user
      await assignedUserDetails.save({ suppressWarning: true });
    }
  } catch (error) {
    console.error("Error in updating task:", error.message);
  }
});


    // Wait for all subadmin updates to complete
    await Promise.all(updatePromises);

    // Update iu user's job task assignedto
    iuuserdetails.JobExperience.forEach((jobdata) => {
      if (jobdata.companyName === companyname && jobdata.experienceStart === experienceStart) {
        jobdata.assignedto = {
          AssigneduserIds: assigneduserids,
          Assigneduseremails:Assigneduseremails,
          accepteduseremail: "",
          status: "Assigned",
          date: formattedDate,
        };
      }
    });

    // Update assignedbydetails
    assignedbydetails.assignedjobtask = assignedbydetails.assignedjobtask || [];
    assignedbydetails.assignedjobtask.push({
      userdetails: {
        name: iuuserdetails.name,
        email: iuuserdetails.email,
        mobilenumber: iuuserdetails.mobilenumber,
      },
      companyname: companyname,
      date: formattedDate,
      assignedto: assigneduserids,
      Assigneduseremails:Assigneduseremails,
      experienceStart: experienceStart,
      Accepteduser: "",
      status: "Assigned",
    });

    // Save the iu user
    await iuuserdetails.save({ suppressWarning: true });
    // Save assignedbydetails
    await assignedbydetails.save({ suppressWarning: true });

    res.status(200).json({
      status: "Success",
      message: "Task updated for subadmin users.",
      Assigneduseremails
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
})






// here these two apis are used in assigned list of job and education .... in ..................same for all.......



admindash.post("/getassignededucationtask/:userId", async (req, res) => {
  
  const userId = req.params.userId;
  const NameOfUser = req.body.name;

  try {
    const admindata = await Users.findById(userId);
    admindata.assignededucationtask = admindata.assignededucationtask || [];

    // Filter assignededucationtask based on the regex match of name within userdetails
    const result = NameOfUser
      ? admindata.assignededucationtask.filter((data) => {
          const nameRegex = new RegExp(NameOfUser, 'i'); // 'i' flag makes it case-insensitive
          return nameRegex.test(data.userdetails.name);
        })
      : admindata.assignededucationtask;

    res.status(200).json({
      result: result,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});



// Get assigned job tasks..........................it has name filter as well.....................we are using regex.................it is in assigned list of every user

admindash.post("/getassignedjobtask/:userId", async (req, res) => {
  const userId = req.params.userId;
  const NameOfUser = req.body.name;

  try {
    const admindata = await Users.findById(userId);
    admindata.assignedjobtask = admindata.assignedjobtask || [];

    // Filter assignedjobtask based on the regex match of name within userdetails
    const result = NameOfUser
      ? admindata.assignedjobtask.filter((data) => {
          const nameRegex = new RegExp(NameOfUser, 'i'); // 'i' flag makes it case-insensitive
          return nameRegex.test(data.userdetails.name);
        })
      : admindata.assignedjobtask;

    res.status(200).json({
      result: result,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});













// verify task.......................................admin



// change status for education ......in user education documents section and at same time at...........assigned part in admin sections   ........


admindash.post("/changeedustatus_admin", async (req, res) => {
  const formattedDate = moment().format('DD/MM/YY');
  const iuid = req.body.iuid;

  const acceptedadminId = req.body.acceptedadminId;
  const collegename = req.body.collegename;
  const qualification = req.body.qualification;
  const status = req.body.status;

  try {
    // Find the IU user by ID
    const iudetails = await User.findById(iuid);

 

    // Find the accepted admin user by ID
    const acceptedadmindetails = await User.findById(acceptedadminId);

    if (!iudetails  || !acceptedadmindetails) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }


 // Change status in the user's educational documents


 iudetails.education.forEach((eduData) => {
  if (eduData.college === collegename && eduData.qualification === qualification) {
    eduData.status = status;
  }
});

const verified_count = iudetails.education.filter((data) => data.status === "Verified").length;

iudetails.educationstatus = verified_count === iudetails.education.length ? "verified" : "not verified";

await iudetails.save();



    // Change status in the accepted admin's educational documents
    acceptedadmindetails.acceptededucationtask = acceptedadmindetails.acceptededucationtask || [];
    const updatedEducationInAccepted = acceptedadmindetails.acceptededucationtask.map((data) => {
      if (data.userid == iudetails._id && data.college == collegename && data.qualification == qualification) {
        return {
          ...data,
          status: `${status} (${acceptedadmindetails.email} role: ${acceptedadmindetails.AdditionalPortalAccess || acceptedadmindetails.role}) Date: ${formattedDate}`,
        };
      }
      return data;
    });

    acceptedadmindetails.acceptededucationtask = updatedEducationInAccepted;
    await acceptedadmindetails.save();

    res.status(200).json({
      status: "Success",
      message: "Status added to education task",
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});









// change status for job..........in user and at the same time ....staus will change in assigned value in admins db...........

admindash.post("/changejobstatus_admin", async (req, res) => {
  const formattedDate = moment().format('DD/MM/YY');
  const iuid = req.body.iuid;
  const companyname = req.body.companyname;
  const experienceStart = req.body.experienceStart;
  const status = req.body.status;

  const acceptedadminId = req.body.acceptedadminId; // Declare acceptedadminId

  try {
    // Find the IU user by ID
    const iudetails = await User.findById(iuid);



    // Find the accepted admin user by ID
    const acceptedadmindetails = await User.findById(acceptedadminId);

    if (!iudetails  || !acceptedadmindetails) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

// Change status in the user's job experience data
const updatedJobExperience = iudetails.JobExperience.map((jobExp) => {
  if (jobExp.companyName === companyname && jobExp.experienceStart === experienceStart) {
    return { ...jobExp, status };
  }
  return jobExp;
});

iudetails.JobExperience = updatedJobExperience;

const verifiedJobExpCount = iudetails.JobExperience.filter((jobExp) => jobExp.status === "Verified").length;

iudetails.jobexperiencestatus = verifiedJobExpCount === iudetails.JobExperience.length ? "verified" : "not verified";

await iudetails.save();





    // Change status in the accepted admin's job experience data

    acceptedadmindetails.acceptedjobtask = acceptedadmindetails.acceptedjobtask || [];
    const updatedJobInAccepted = acceptedadmindetails.acceptedjobtask.map((data) => {
      if (data.userid == iudetails._id && data.companyname == companyname && data.experienceStart == experienceStart) {
        return {
          ...data,
          status: `${status} (${acceptedadmindetails.email} role: ${acceptedadmindetails.AdditionalPortalAccess || acceptedadmindetails.role}) Date: ${formattedDate}`,
        };
      }
      return data;
    });

    acceptedadmindetails.acceptedjobtask = updatedJobInAccepted;
    await acceptedadmindetails.save();




    res.status(200).json({
      status: "Success",
      message: "Status added to job experience data",
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});













// .....................................................................................................................................................................................SUB-ADMIN.......................








admindash.post("/Accepteducationtask_subadmin", async (req, res) => {





})








admindash.post("/Acceptjobtask_admin", async (req, res) => {
  





})







































admindash.post("/changeedustatus_subadmin", async (req, res) => {
  const formattedDate = moment().format('DD/MM/YY');
  const iuid = req.body.iuid;
  const assignedadminId = req.body.assignedadminId;
  const acceptedadminId = req.body.acceptedadminId;
  const collegename = req.body.collegename;
  const qualification = req.body.qualification;
  const status = req.body.status;

  try {
    // Find the IU user by ID
    const iudetails = await User.findById(iuid);

    // Find the assigned admin user by ID
    const assignedadmindetails = await User.findById(assignedadminId);

    // Find the accepted admin user by ID
    const acceptedadmindetails = await User.findById(acceptedadminId);

    if (!iudetails || !assignedadmindetails || !acceptedadmindetails) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }


 // Change status in the user's educational documents


 iudetails.education.forEach((eduData) => {
  if (eduData.college === collegename && eduData.qualification === qualification) {
    eduData.status = status;
  }
});

const verified_count = iudetails.education.filter((data) => data.status === "Verified").length;

iudetails.educationstatus = verified_count === iudetails.education.length ? "verified" : "not verified";

await iudetails.save();




    // Change status in the assigned details of the assigned admin
    assignedadmindetails.assignededucationtask = assignedadmindetails.assignededucationtask || [];
    const updatedEducationInAssigned = assignedadmindetails.assignededucationtask.map((data) => {
      if (data.userdetails.email == iudetails.email && data.college == collegename && data.qualification == qualification) {
        return {
          ...data,
          status: `${status} (${assignedadmindetails.email} role: ${assignedadmindetails.AdditionalPortalAccess || assignedadmindetails.role}) Date: ${formattedDate}`,
        };
      }
      return data;
    });

    assignedadmindetails.assignededucationtask = updatedEducationInAssigned;
    await assignedadmindetails.save();

    // Change status in the accepted admin's educational documents
    acceptedadmindetails.acceptededucationtask = acceptedadmindetails.acceptededucationtask || [];
    const updatedEducationInAccepted = acceptedadmindetails.acceptededucationtask.map((data) => {
      if (data.userid == iudetails._id && data.college == collegename && data.qualification == qualification) {
        return {
          ...data,
          status: `${status} (${acceptedadmindetails.email} role: ${acceptedadmindetails.AdditionalPortalAccess || acceptedadmindetails.role}) Date: ${formattedDate}`,
        };
      }
      return data;
    });

    acceptedadmindetails.acceptededucationtask = updatedEducationInAccepted;
    await acceptedadmindetails.save();

    res.status(200).json({
      status: "Success",
      message: "Status added to education task",
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});









// change status for job..........in user and at the same time ....staus will change in assigned value in admins db...........

admindash.post("/changejobstatus_subadmin", async (req, res) => {
  const formattedDate = moment().format('DD/MM/YY');
  const iuid = req.body.iuid;
  const companyname = req.body.companyname;
  const experienceStart = req.body.experienceStart;
  const status = req.body.status;
  const adminId = req.body.adminid;
  const acceptedadminId = req.body.acceptedadminId; // Declare acceptedadminId

  try {
    // Find the IU user by ID
    const iudetails = await User.findById(iuid);

    // Find the admin user by ID
    const admindetails = await User.findById(adminId);

    // Find the accepted admin user by ID
    const acceptedadmindetails = await User.findById(acceptedadminId);

    if (!iudetails || !admindetails || !acceptedadmindetails) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

// Change status in the user's job experience data
const updatedJobExperience = iudetails.JobExperience.map((jobExp) => {
  if (jobExp.companyName === companyname && jobExp.experienceStart === experienceStart) {
    return { ...jobExp, status };
  }
  return jobExp;
});

iudetails.JobExperience = updatedJobExperience;

const verifiedJobExpCount = iudetails.JobExperience.filter((jobExp) => jobExp.status === "Verified").length;

iudetails.jobexperiencestatus = verifiedJobExpCount === iudetails.JobExperience.length ? "verified" : "not verified";

await iudetails.save();






    // Change status in the assigned details of the admin
    admindetails.assignedjobtask = admindetails.assignedjobtask || [];
    const updatedJobInAssigned = admindetails.assignedjobtask.map((data) => {
      if (data.userdetails.email == iudetails.email && data.companyname == companyname && data.experienceStart == experienceStart) {
        return { ...data, status: `${status} (${admindetails.email} role: ${admindetails.AdditionalPortalAccess ? admindetails.AdditionalPortalAccess : admindetails.role}) Date: ${formattedDate}` };
      }
      return data;
    });

    admindetails.assignedjobtask = updatedJobInAssigned;
    await admindetails.save();

    // Change status in the accepted admin's job experience data
    acceptedadmindetails.acceptedjobtask = acceptedadmindetails.acceptedjobtask || [];
    const updatedJobInAccepted = acceptedadmindetails.acceptedjobtask.map((data) => {
      if (data.userid == iudetails._id && data.companyname == companyname && data.experienceStart == experienceStart) {
        return {
          ...data,
          status: `${status} (${acceptedadmindetails.email} role: ${acceptedadmindetails.AdditionalPortalAccess || acceptedadmindetails.role}) Date: ${formattedDate}`,
        };
      }
      return data;
    });

    acceptedadmindetails.acceptedjobtask = updatedJobInAccepted;
    await acceptedadmindetails.save();

    res.status(200).json({
      status: "Success",
      message: "Status added to job experience data",
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});














// api to get accepted company task data with userid............................get.....................its working..............................

async function findCompanyByName(companynames, NameOfcompany, taskArray) {
  const companies = await companySchema.find({
    nameOfCompany: {
      $in: companynames,
      ...(NameOfcompany && { $regex: new RegExp(NameOfcompany, "i") }),
    },
  });

  // Combine company details with the associated date
  const companiesWithDate = companies.map((company) => {
    const task = taskArray.find((task) => task.companyname === company.nameOfCompany);
    return {
      companydetails: company,
      date: task ? task.date : null,
    };
  });

  return companiesWithDate;
}

admindash.post("/getacceptedcompanytasks/:userId", async (req, res) => {
  const userId = req.params.userId;
  const NameOfcompany = req.body.name;

  try {
    const admindata = await Users.findById(userId);
    const taskArray = admindata.acceptedcompanytask || [];

    // Extract the companynames values from the task array
    const companynames = taskArray.map((task) => task.companyname);

    const companyDetailsWithDate = await findCompanyByName(companynames, NameOfcompany, taskArray);

    console.log("companyDetailsWithDate", companyDetailsWithDate);
    res.status(200).json({
      result: companyDetailsWithDate,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});









// Decline educational task...................................................


admindash.post("/Declineeducationtask", async (req, res) => {

  const formattedDate = moment().format('DD/MM/YY');

  try {
    // Validate incoming data
    const { subadminid, collegename, qualification } = req.body;

    // Fetch subadmin details
    const subadmindetails = await User.findById(subadminid);

    if (!subadmindetails) {
      return res.status(404).json({
        status: "Failed",
        message: "Subadmin not found",
      });
    }

    subadmindetails.Declinededucationtask = subadmindetails.Declinededucationtask || [];

    // Filter data based on conditions and move to Declinededucationtask
    const subadminfiltereddata = subadmindetails.educationtask.filter((data) => {
      if (data.collegename === collegename && data.qualification === qualification) {
        subadmindetails.Declinededucationtask.push(data);
        return false; // Exclude this data in the filtered result
      }
      return true; // Include this data in the filtered result
    });

    // Update the subadmin's educationtask with the filtered result
    subadmindetails.educationtask = subadminfiltereddata;

    // Save the updated subadmin details
    await subadmindetails.save({ suppressWarning: true });

    res.status(200).json({
      subadminfiltereddata,
    });

  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
});




// Decline job tasks........................................................


admindash.post("/Declinejobtask", async (req, res) => {
  const formattedDate = moment().format('DD/MM/YY');

  try {
    // Validate incoming data
    const { subadminid, companyname, experienceStart } = req.body;

    // Fetch subadmin details
    const subadmindetails = await User.findById(subadminid);

    if (!subadmindetails) {
      return res.status(404).json({
        status: "Failed",
        message: "Subadmin not found",
      });
    }

    subadmindetails.Declinedjobtask = subadmindetails.Declinedjobtask || [];

    // Filter data based on conditions and move to Declinedjobtask
    const subadminfiltereddata = subadmindetails.jobtask.filter((data) => {
      if (data.companyname === companyname && data.experienceStart === experienceStart) {
        subadmindetails.Declinedjobtask.push(data);
        return false; // Exclude this data in the filtered result
      }
      return true; // Include this data in the filtered result
    });

    // Update the subadmin's jobtask with the filtered result
    subadmindetails.jobtask = subadminfiltereddata;

    // Save the updated subadmin details
    await subadmindetails.save({ suppressWarning: true });

    res.status(200).json({
      subadminfiltereddata,
    });
  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
});





























// add note to user details.. with userID..............






// accept company verification task......................................................................................in use................................



admindash.post("/Acceptcompanyverification", async (req, res) => {


  const formattedDate = moment().format('DD/MM/YY');

  try {
    const { companyname, acceptedUserId } = req.body;

    // Find the accepted user by ID
    let acceptedUserDetails = await User.findById(acceptedUserId);
    let companydetails = await companySchema.findOne({ nameOfCompany: companyname });

    if (!acceptedUserDetails || !companydetails) {
      return res.status(404).json({
        status: "Not Found",
        message: "User or company not found for the provided ID or name.",
      });
    }

    // Check if the task is already accepted by the user
    const taskAccepted = acceptedUserDetails.acceptedcompanytask.some(
      (task) => task.companyname === companyname
    );

    if (!taskAccepted) {
      // Add the task to the user's accepted tasks
      acceptedUserDetails.acceptedcompanytask.push({ companyname, date: formattedDate });

      // Save the updated user document
      acceptedUserDetails = await acceptedUserDetails.save();
    }

    // Check if the user has already accepted the company
    const userAcceptedCompany = companydetails.whoaccepted.some(
      (task) => task.accepteduserid === acceptedUserId
    );

    if (!userAcceptedCompany) {
      // Add the user to the accepted users for the company
      companydetails.whoaccepted.push({ accepteduserid: acceptedUserId, date: formattedDate,status:"ongoing" });
      companydetails = await companydetails.save();
    }

    res.status(200).json({
      acceptedUserDetails,
      companydetails,
    });
  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
});




// assigning..........................company verification task................................................its working.......


const Moment = require('moment-timezone');







admindash.post("/assigncompanytask", async (req, res) => {


  const { assigneduserids, companyname, assignedby } = req.body;
  // const formattedDate = moment().format('DD/MM/YY');
  const indiaTimeZone = 'Asia/Kolkata'; // Set the desired time zone (India Standard Time)

  const formattedDate = Moment.tz(indiaTimeZone).format('DD/MM/YY HH:mm:ss');
  try {
    const assignedusers = await User.find({ _id: { $in: assigneduserids } });


    const assignedbydetails = await User.findById(assignedby);

    if (!assignedusers || assignedusers.length === 0 || !assignedbydetails) {
      return res.status(404).json({
        status: "Not Found",
        message: "No subadmin users found for the provided ids or invalid assigned by user.",
      });
    }

    const updatePromises = assignedusers.map(async (subAdminUser) => {
      try {
        let assignedUserDetails = await User.findById(subAdminUser._id);
        let companydetails = await companySchema.findOne({ nameOfCompany: companyname });

        if (!assignedUserDetails || !companydetails) {
          throw new Error("User or company not found for the provided ID.");
        }

        // Assigning company task to assigned task array
        assignedUserDetails.companytask = assignedUserDetails.companytask || [];
        assignedUserDetails.alerts = assignedUserDetails.alerts || [];

        const taskExists = assignedUserDetails.companytask.some(task => task.companyname === companyname)

        if (!taskExists) {
          assignedUserDetails.companytask.push({ companyname: companyname, date: formattedDate, assignedby: assignedbydetails.email });

          // Push messages to alerts for notification
          assignedUserDetails.alerts.push(`Company task of company name ${companyname} has been assigned to you by ${assignedbydetails.email}`);

          await assignedUserDetails.save();
        }

        // Assigning task to company
        companydetails.assignedto = companydetails.assignedto || [];
        const taskAssigned = companydetails.assignedto.some(task => task.assigneduserid.toString() === subAdminUser._id.toString());

        if (!taskAssigned) {
          companydetails.assignedto.push({
            assigneduserid: subAdminUser._id,
            assignedby: assignedby,
            date: formattedDate,
            status: "Assigned"
          });
          await companydetails.save();
        }

        // Add assigned company task for the assigning user
        assignedbydetails.assignedcompanytask = assignedbydetails.assignedcompanytask || [];
        assignedbydetails.assignedcompanytask.push({
          companyname: companyname,
          date: formattedDate,
          assignedto: [...assigneduserids],
          Accepteduser: "",
          status: "Assigned"
        });
        await assignedbydetails.save();
      } catch (error) {
        console.error("Error in updating task:", error.message);
      }
    });

    await Promise.all(updatePromises);

    res.status(200).json({
      status: "Success",
      message: "Task updated for subadmin users.",
    });
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});









// get company assigned task in admin dashboard and status who are accepte also.............................................


// function to find users byb ids .......................................

function findUserByIds(arr) {
  // Assuming this function returns a Promise
  return Promise.all(
    arr
      .filter((userId) => userId) // Remove null or undefined values
      .map(async (userId) => {
        return await User.findById(userId);
      })
  );
}






async function findAssignedCompanyDetails(companynames, nameOfcompany, assignedcompanytask) {

  const indiaTimeZone = 'Asia/Kolkata'; 


  const companies = await companySchema.find({
    nameOfCompany: {
      $in: companynames,
      ...(nameOfcompany && { $regex: new RegExp(nameOfcompany, "i") }),
    },
  });

  const companiesWithDate = await Promise.all(companies.map(async (company) => {
    const task = assignedcompanytask.find((task) => task.companyname === company.nameOfCompany);
    let assignedToUsers = [];

    if (task?.assignedto && Array.isArray(task.assignedto)) {
      // Filter out null or undefined values from assignedto array
      const filteredAssignedTo = task.assignedto.filter((userId) => userId);
      assignedToUsers = await findUserByIds(filteredAssignedTo);
    }
    let Assigneddate = null;
    if (task && task.date) {
      Assigneddate = moment.tz(task.date, "DD/MM/YY HH:mm:ss", indiaTimeZone).format('DD/MM/YY HH:mm:ss');
    }

    let Deadlinedate = null;
    if (task && task.date) {
      const expiryDate = moment.tz(task.date, "DD/MM/YY HH:mm:ss", indiaTimeZone).add(1, 'day');
      Deadlinedate = expiryDate.isValid() ? expiryDate.format('DD/MM/YY HH:mm:ss') : null;
    }

    return {
      companydetails: company,
      Assigneddate,
      Deadlinedate,
      Accepteduser: task?.Accepteduser || null,
      status: task?.status || null,
      assignedto: assignedToUsers,
    };
  }));

  return companiesWithDate;
}



admindash.post("/getassignedcompanytask/:userId", async (req, res) => {
  const userId = req.params.userId;
  const nameOfcompany = req.body.name;

  try {
    const admindata = await Users.findById(userId);
    const assignedcompanytask = admindata.assignedcompanytask || [];
    const companynames = assignedcompanytask.map((task) => task.companyname);

    const companyDetailsWithDate = await findAssignedCompanyDetails(companynames, nameOfcompany, assignedcompanytask);

    console.log("companyDetailsWithDate", companyDetailsWithDate);

    res.status(200).json({
      result: companyDetailsWithDate,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});


// ....................get companytask of a ......user..........................................



async function findCompaniesInCompanyTask(companynames, NameOfcompany, taskArray) {
  const companies = await companySchema.find({
    nameOfCompany: {
      $in: companynames,
      ...(NameOfcompany && { $regex: new RegExp(NameOfcompany, "i") }),
    },
  });

  const companiesWithDate = companies.map((company) => {
    const task = taskArray.find((task) => task.companyname === company.nameOfCompany);
    return {
      companydetails: company,
      date: task ? task.date : null,
      assignedby: task ? task.assignedby : null,
    };
  });

  return companiesWithDate;
}

admindash.post("/getcompanytask/:userId", async (req, res) => {
  const userId = req.params.userId;
  const NameOfcompany = req.body.name;

  try {
    const admindata = await Users.findById(userId);
    const taskArray = admindata.companytask || [];

    const companynames = taskArray.map((task) => task.companyname);

    const companyDetailsWithDate = await findCompaniesInCompanyTask(companynames, NameOfcompany, taskArray);

    console.log("companyDetailsWithDate", companyDetailsWithDate);

    res.status(200).json({
      result: companyDetailsWithDate,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});


//..........................///...............................................................


admindash.post("/Acceptuserscompanytask", async (req, res) => {
  try {
    const { companyname, acceptedUserId, assignedby } = req.body;


    const formattedDate = moment().format('DD/MM/YY');

    // Find the accepted user by ID
    const acceptedUserDetails = await User.findById(acceptedUserId);

    // Check if user, company, or assignedby user details are not found
    if (!acceptedUserDetails) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found for the provided ID.",
      });
    }

    const companydetails = await companySchema.findOne({ nameOfCompany: companyname });

    if (!companydetails) {
      return res.status(404).json({
        status: "Not Found",
        message: "Company not found for the provided name.",
      });
    }

    const assignedbyuserdetails = await User.findById(assignedby);

    if (!assignedbyuserdetails) {
      return res.status(404).json({
        status: "Not Found",
        message: "AssignedBy user not found for the provided ID.",
      });
    }

    // Check if the task is already accepted by the user
    const taskAccepted = acceptedUserDetails.acceptedcompanytask.some(
      (task) => task.companyname === companyname
    );

    if (!taskAccepted) {
      // Add the task to the user's accepted tasks
      acceptedUserDetails.acceptedcompanytask.push({ companyname, date: formattedDate });
      // Remove the task from company tasks
      acceptedUserDetails.companytask = acceptedUserDetails.companytask.filter(task => task.companyname !== companyname);

      // Save the updated user document
      await acceptedUserDetails.save();
    }

    // Check if the user has already accepted the company
    const userAcceptedCompany = companydetails.whoaccepted.some(
      (task) => task.accepteduserid === acceptedUserId
    );

    if (!userAcceptedCompany) {
      // Add the user to the accepted users for the company
      companydetails.whoaccepted.push({ accepteduserid: acceptedUserId, date: formattedDate, status: "ongoing" });
      await companydetails.save();
    }

    // Update the assigned user details
   // Update the assigned user details
if (assignedbyuserdetails) {
  const updatedAssignedCompanyTask = assignedbyuserdetails.assignedcompanytask.map(task => {
    if (task.companyname === companyname) {
      return {
        ...task,
        Accepteduser: acceptedUserDetails.email,
        Accepteddate: formattedDate,
        status: "Accepted"
      };
    }
    return task;
  });

  assignedbyuserdetails.assignedcompanytask = updatedAssignedCompanyTask;

  await assignedbyuserdetails.save();
}

    // Change status in admin database to accepted (if needed)

    res.status(200).json({
      acceptedUserDetails,
      companydetails,
    });
  } catch (e) {
    console.error("Error:", e);
    return res.status(500).json({
      status: "Failed",
      message: "Internal server error",
    });
  }
});













// get educatuon tasks of ichps or subadmins        we can say assigned education task.............



// EXPERIEMTING..............its working........................get .............educationtask....................

admindash.get("/getassignededucationtasks/:userId", async (req, res) => {
  const userId = req.params.userId;



  try {
    const admindata = await Users.findById(userId);

    const taskArray = admindata.educationtask || [];

    // Create a map to associate each user with their task details
    const resultMap = new Map();

    taskArray.forEach((task) => {
      // Extract relevant task information
      const taskInfo = {
        collegename: task.collegename,
        qualification: task.qualification,
        date: task.date,
      };

      const user = task.userdetails;

      if (user) {
        if (!resultMap.has(user.email)) {
          resultMap.set(user.email, { userdetails: user, tasks: [] });
        }
        resultMap.get(user.email).tasks.push(taskInfo);
      }
    });

    // Convert the map into an array of result objects
    const result = Array.from(resultMap.values());

    res.status(200).json({
      result: result,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});





// get jobs tasks of ichps or subadmins        we can say assigned education task.............



// EXPERIEMTING..............its working...........................get...............jobtask.................


admindash.post("/getassignedjobtasks/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const admindata = await Users.findById(userId);

    const taskArray = admindata.jobtask || [];

    // Create a map to associate each user with their task details
    const resultMap = new Map();

    taskArray.forEach((task) => {
      // Extract relevant task information
      const taskInfo = {
        companyname: task.companyname,
        experienceStart: task.experienceStart,
        date: task.date,
      };

      const user = task.userdetails;

      if (user) {
        if (!resultMap.has(user.email)) {
          resultMap.set(user.email, { userdetails: user, tasks: [] });
        }
        resultMap.get(user.email).tasks.push(taskInfo);
      }
    });

    // Convert the map into an array of result objects
    const result = Array.from(resultMap.values());

    res.status(200).json({
      result: result,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});














// adding note to   user document verification......................education task.......


admindash.post("/addnotetoeducation", async (req, res) => {
  const iuid = req.body.iuid;
  const collegename = req.body.collegename;
  const qualification = req.body.qualification;
  const senderid = req.body.senderid;
  const note = req.body.note;

  const indiaTimeZone = 'Asia/Kolkata';
  const formattedDate = Moment.tz(indiaTimeZone).format('DD/MM/YY HH:mm:ss');

  try {
    const iudetails = await User.findById(iuid);
    const senderdetails = await User.findById(senderid).select('name email role');

    if (!iudetails) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    // Filter the user's education data that matches the college name and qualification
    const filteredEducation = iudetails.education.find((data) => {
      return data.college === collegename && data.qualification === qualification;
    });

    if (!filteredEducation) {
      return res.status(404).json({
        status: "Failed",
        message: "Education data not found",
      });
    }

    // Check if the 'note' array exists, and if not, create it
    if (!filteredEducation.note) {
      filteredEducation.note = [];
    }

    // Create a message object
    const message = {
      note: note,
      date: formattedDate,
      senderdetails: senderdetails,
    };

    // Push the message to the user's education task
    filteredEducation.note.push(message);

    // Save the changes to the user's document
    await iudetails.save();

    res.status(200).json({
      status: "Success",
      message: "Note added to education task",
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});






// adding note to user job document....................................................

admindash.post("/addnotetojob", async (req, res) => {

  const iuid = req.body.iuid;
  const companyname = req.body.companyname;
  const experienceStart = req.body.experienceStart; // Corrected variable assignment
  const senderid = req.body.senderid;
  const note = req.body.note;

  const indiaTimeZone = 'Asia/Kolkata';
  const formattedDate = Moment.tz(indiaTimeZone).format('DD/MM/YY HH:mm:ss');

  try {
    const iudetails = await User.findById(iuid);
    const senderdetails = await User.findById(senderid).select('name email role');

    if (!iudetails) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    // Find the user's job experience data that matches the company name and experience start
    const filteredJobExperience = iudetails.JobExperience.find((data) => {
      return data.companyName === companyname && data.experienceStart === experienceStart;
    });

    if (!filteredJobExperience) {
      return res.status(404).json({
        status: "Failed",
        message: "Job experience data not found",
      });
    }

    // Create a message object
    const message = {
      note: note,
      date: formattedDate,
      senderdetails: senderdetails,
    };

    // Push the message to the user's job experience
    filteredJobExperience.note.push(message);

    // Save the changes to the user's document
    await iudetails.save();

    res.status(200).json({
      status: "Success",
      message: "Note added to job experience",
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

















// hr mail ......................................................section....................................................................






// add note to user ..................


admindash.post("/sendalert", async (req, res) => {

  const iuid = req.body.iuid;
  const note = req.body.note;

  const location=req.body.location

console.log(req.body)
let industry;

if(req.body.industry){
  industry=req.body.industry
}
else{
  industry="all"
}


  const role="Sub-Admin"

  try {
    const updatedIu = await Users.findByIdAndUpdate(
      { _id: iuid },
      { $push: { alerts: note } }, // Use $push to add the note to the 'alerts' array
      { new: true } // To get the updated document as a result
    );



    const updatedsubadmin=await Users.findOneAndUpdate({location:{$regex:location},role:role},{ $push: { alerts: note },industry:industry},{ new: true })


      res.status(200).json({
        status: "Success",
        message: "Note sent to iu schema successfully.",
        updatedIu: updatedIu,
        updatedsubadmin:updatedsubadmin
      });



  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }

});



// send note .....................................................................................................



// sending mail to hr.....................................................................

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.adminEmail,
    pass: process.env.password,
  },
});



const Cryptr = require('cryptr');


// Initialize Cryptr with a secret key
const cryptr = new Cryptr('myTotallySecretKey');




admindash.post("/sendemailtohr", async (req, res) => {
  try {
    const { email, employuserId, adminId, selectedCompany, experienceStart } = req.body;

    // Find user details by ID
    const employuserdetails = await User.findById(employuserId);

    if (!employuserdetails) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    const combinedData = `${employuserId}|${adminId}|${selectedCompany}|${experienceStart}`;
    const encryptedString = cryptr.encrypt(combinedData);

    // Get user details
    const userdata = await User.findById(employuserId);

    if (!userdata) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    const name = userdata.name;
    const inputDate = new Date();
    const formattedDate = dateFns.format(inputDate, 'dd/MM/yyyy');
    const companyname = "Karands verification team";

    const IP_ADDRESS = process.env.IP_ADDRESS;
    const clickherehref = `${IP_ADDRESS}/hrform?query=${combinedData}`;

    const htmlFilePath = path.join(__dirname, 'email_templates', 'email_template.html');
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

    const modifiedHtmlContent = htmlContent
      .replace('CandidatesName', name)
      .replace('Date:', formattedDate)
      .replace('[Organization Name]', "Karandszone Verification Team")
      .replace('hr click here', clickherehref)
      .replace('[Reference Company Name] [Address]', selectedCompany);

    await transporter.sendMail({
      from: 'your-email@example.com',
      to: email,
      subject: "Background Verification",
      html: modifiedHtmlContent,
    });

    // Find the appropriate job details
    const filteredJobDetails = employuserdetails.JobExperience.find((data) => {
      return data.companyName === selectedCompany && data.experienceStart === experienceStart;
    });

    if (!filteredJobDetails) {
      return res.status(404).json({
        status: "Failed",
        message: "Job details not found",
      });
    }

    // Update the mailsended property for the specific job details
    filteredJobDetails.set({ mailsended: true });

    // Save the changes to the database
    await employuserdetails.save();

    res.status(200).json({
      status: "Success",
      message: "Email sent successfully",
    });
  } catch (e) {
    console.error('Error sending email:', e);
    res.status(400).json({
      status: "Failed",
      message: "Failed to send email",
    });
  }
});





// sending mail to hr.....................................................................


// hrform is stored in user modal and we are sending message to admin............. that hr had been filled the form..........



// Define the route handler........................................


admindash.post("/hrmailform", async (req, res) => {
  const { employuserId, adminId, formdata, selectedCompany, experienceStart } = req.body;


  console.log("req.body",req.body)

  const newData = {
    formData: formdata,
    selectedCompany: selectedCompany,
  };

  const note = {
    message: "hr had filled the form",
    employerId: employuserId,
  };

  try {

    // Check if the hrform field already exists....................................

    const employerData = await Users.findById(employuserId);

    if (!employerData) {
      return res.status(404).json({
        status: "Failed",
        message: "Employer not found",
      });
    }

  
    // Find the appropriate job details
    const filteredJobDetails = employerData.JobExperience.find((data) => {
      return data.companyName === selectedCompany && data.experienceStart === experienceStart
    });

    if (!filteredJobDetails) {
      return res.status(404).json({
        status: "Failed",
        message: "Job details not found",
      });
    }

    // Update the hrform field for the specific job details
    filteredJobDetails.hrform = newData;

    filteredJobDetails.note.push(newData)
   
   

    // Save the changes to the database
    await employerData.save();

    // Update admin's data
    const updatedAdminData = await Users.findByIdAndUpdate(
      adminId,
      { $push: { alerts: note } },
      { new: true }
    );

    if (updatedAdminData) {
      return res.status(200).json({
       
      });
    }
  } catch (e) {
    return res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});



admindash.post("/statusformviewed", async (req, res) => {
  const { employuserId, selectedCompany, experienceStart, Status } = req.body;

  try {
    // Check if the hrform field already exists
    const employerData = await Users.findById(employuserId);

    if (!employerData) {
      return res.status(404).json({
        status: "Failed",
        message: "Employer not found",
      });
    }

    // Find the appropriate job details
    const filteredJobDetails = employerData.JobExperience.find((data) => {
      return data.companyName === selectedCompany && data.experienceStart === experienceStart;
    });

    if (!filteredJobDetails) {
      return res.status(404).json({
        status: "Failed",
        message: "Job details not found",
      });
    }

    // Update the formviewed property for the specific job details
    filteredJobDetails.set({ formviewed: Status });

    // Save the changes to the database
    await employerData.save();

    // You may need to implement the logic to add alerts when the form is viewed by HR.

    return res.status(200).json({});
  } catch (e) {
    return res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});
















module.exports=admindash;