const jobRoutes = require('express').Router();
const Job = require("../../models/jobs/jobSchema");
const Company = require("../../models/company/companySchema.js");
const Users = require("../../models/userSchema");
const Post = require("../../models/ichpSchema/ichppostSchema");
const Survey = require('../../models/surveySchemas/surveyDetailSchema');
const User = require('../../models/userSchema');
const Connection=require('../../models/connection/connectionschema')

const ichpmodal = require("../../models/ichpSchema/ichppostSchema")



const moment = require('moment'); // Import the moment library for date formatting

// ... Existing code ...

jobRoutes.get("/", async (req, res) => {
  const jobs = await Job.find()
  res.send(jobs)
})




// get job by id



jobRoutes.get("/getjobbyid/:id", async (req, res) => {
  try {
    const jobdetails = await Job.find({ _id: req.params.id });
    res.status(200).json({
      Status: "Success",
      details: jobdetails
    })
  } catch (error) {

  }
})


// get all jobs list    currently used in admin dashborad..............





jobRoutes.get("/getjobdetailswithlocation/:id", async (req, res) => {
  try {
    const userdetails = await User.findById(req.params.id);

    if (!userdetails) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found"
      });
    }

    let jobdetails

    if (userdetails.AdditionalPortalAccess == "Sub Admin" || userdetails.role == "Sub Admin") {
      jobdetails = await Job.find({ location: userdetails.location });


    }

    if (userdetails.AdditionalPortalAccess == "Admin" || userdetails.role == "Admin") {

      jobdetails = await Job.find({ state: userdetails.state });


    }


    res.status(200).json({
      status: "Success",
   
      data: jobdetails
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Server error"
    });
  }
});



// get all jobs list of all jobs  data......






jobRoutes.post("/getjobslists/:skip/:limit/:id", async (req, res) => {
  try {
    const userdetails = await User.findById(req.params.id);

    const skip = req.params.skip;
    const name = req.body.name;
    const limit = req.params.limit;

    const skipCount = parseInt(skip) || 0;
    const limitCount = parseInt(limit) || 4;

    if (!userdetails) {
      return res.status(404).json({
        status: "Not Found",
        message: "User not found",
      });
    }

    let jobdetails;

    let query = {
      state: userdetails.state,
      $or: [
        { companyName: new RegExp(name, 'i') },
        { title: new RegExp(name, 'i') }
      ],
    };

    if (userdetails.AdditionalPortalAccess === "Sub Admin" || userdetails.role === "Sub Admin") {
      jobdetails = await Job.find(query);
    }

    if (userdetails.AdditionalPortalAccess === "Admin" || userdetails.role === "Admin") {
      jobdetails = await Job.find(query)
        .skip(skipCount)
        .limit(limitCount);
    }

    res.status(200).json({
      status: "Success",
      data: jobdetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Server error",
    });
  }
});






















// used in job preview....................................................................................................

jobRoutes.get("/myjobs/:id", async (req, res) => {
  try {
    const myjob = await Job.find({ userId: req.params.id });
    res.status(200).json({
      Status: "Success",
      details: myjob
    })
  } catch (error) {

  }
})



// posting a job.................................................................................


jobRoutes.post("/addjobs", async (req, res) => {
  try {


    const constLet = await Job.create(req.body);





    //  here updating posted jobs number..................
    const newJobs = await Company.findByIdAndUpdate(
      { _id: req.body.companyId },
      { $inc: { postedJob: 1 } },
      { new: true }
    );


    console.log(newJobs)
    
    res.send(constLet);

  } catch (error) {
    res.send(error)
  }
})




jobRoutes.get("/:companyid", async (req, res) => {
  const companyId = req.params.id;

  const jobs = await Job.find().populate('companyId');

  res.send(jobs)
});







// may be thse are used in ich post......................not hre it is used.................................

jobRoutes.get("/allpost/:skip/:id", async (req, res) => {
 const userDetails=await Users.findOne({_id:req.params.id});
 const checkUserSurvey=await Survey.findOne({userid:req.params.id});
 const skip=req.params.skip===0?0:parseInt(req.params.skip)*2
 console.log(skip);
//  res.send(checkUserSurvey)
 if(checkUserSurvey.reason!=="Looking for job"|| checkUserSurvey.reason===""){
  const allPost=await Job.find(
    {
      location: userDetails.location,
      industry: userDetails.industry,
      requiredSkills: { $in: userDetails.skills },
      whomToShow:"Public"
    }
   ).skip(skip).limit(2);
 res.send(allPost)

 }else {
  const allPost=await Job.find(
    {
      location: userDetails.location,
      industry: userDetails.industry,
      requiredSkills: { $in: userDetails.skills }    }
   ).skip(skip).limit(2);
 res.send(allPost)

 }

})



jobRoutes.get("/forinfinitescroll/:skip/:id",async(req,res)=>{
  try {
    const userDetails=await Users.findOne({_id:req.params.id});
    const checkUserSurvey=await Survey.findOne({userid:req.params.id});
    const connectionList=await Connection.findOne({userId:req.params.id}).select("friends")
    console.log(connectionList);
    const skip=req.params.skip===0?0:parseInt(req.params.skip)*5
    console.log(skip);
   //  res.send(checkUserSurvey)
   let allPost;
    if(checkUserSurvey.reason!=="Looking for job"|| checkUserSurvey.reason===""){
      allPost=await Job.find(
       {
         location: userDetails.location,
         industry: userDetails.industry,
         requiredSkills: { $in: userDetails.skills },
         whomToShow:"Public"
       }
      ).skip(skip).limit(5);
   
    }else {
      allPost=await Job.find(
       {
         location: userDetails.location,
         industry: userDetails.industry,
         requiredSkills: { $in: userDetails.skills }    }
      ).skip(skip).limit(5);
      
    }
    res.send(allPost)

  } catch (error) {
    res.status(404).json({
        details:error.message
      })
  }
})



// appying for job..................................................





jobRoutes.post("/applyjob",async(req,res)=>{
  try {

    const companyId=req.body.companyId

    const jobId=req.body.jobId
    
     
  const userId=req.body.userId
  const name=req.body.name
  const email=req.body.email



  // const jobs = await Job.find({_id:jobId})



// append the job id in users applied array  schema and it must be uniq



const updateduserdata=await Users.findOneAndUpdate(
  { _id: userId, 'appliedjobs.jobId': { $ne: jobId } },
  { $addToSet: { appliedjobs: { jobId } } },
  { new: true }
);






  const designation=await Users.find({_id:userId})


  // console.log("users=====",designation)


  const Designation=designation[0].designation



  // setting unique userids in applied array.........................................

  const updatedjob = await Job.findOneAndUpdate(
    { _id: jobId, 'applied.userId': { $ne: userId } },
    { $addToSet: { applied: { userId, name, email,Designation } } },
    { new: true }
  );


  if(updatedjob){

    res.send({updatedjob,updateduserdata})

    return
  }else{

    res.send({message:"already applied"})
  }




  } 
  
  
  catch (error) {
    res.status(404).json({
        details:error.message
      })
  }
})



// get job details by id........................................................




jobRoutes.get("/getjob/:jobId", async (req, res) => {



const jobId=req.params.jobId

  try {


    const jobdetails = await Job.find({ _id: jobId});

    res.status(200).json({
      Status: "Success",
      data: jobdetails
    })


  } catch (error) {
 res.status(404).json({
        details:error.message
      })
  }
})


// shorlisting a user in a job................................................................................................



jobRoutes.post("/shortlist", async (req, res) => {
  
  const jobId = req.body.jobId;
  const userId = req.body.userId;
  const name = req.body.name;
  const email = req.body.email;

  try {
    const designation = await Users.find({ _id: userId });
    const Designation = designation[0].designation;

    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId, 'shortlisted.userId': { $ne: userId } },
      { $addToSet: { shortlisted: { userId, name, email, Designation } } },
      { new: true }
    );

    // Remove the user's ID from the applied array of the job...........i can use this in delete also
    const removedAppliedUser = await Job.findByIdAndUpdate(
      jobId,
      { $pull: { applied: { userId } } },
      { new: true }
    );

        // Remove the user's ID from the applied array of the job

    res.status(200).json({
      Status: "Success",
      data: { updatedJob, removedAppliedUser }
    });


  } catch (error) {
    res.status(404).json({
      details: error.message
    });
  }
});


// api to get who are shortlisted.................................get...............



jobRoutes.get("/whoshortlisted/:jobId", async (req, res) => {
  
  const jobId = req.params.jobId;


  try {
  
    const whoshortlisted=await Job.findById({_id:jobId})
      // Remove the user's ID from the applied array of the job

    res.status(200).json({
      Status: "Success",
      data: whoshortlisted.shortlisted
    });


  } catch (error) {
    res.status(404).json({
      details: error.message
    });
  }
});






// delete api to userids in applied users in the jobs...................................delete......................................




jobRoutes.post("/deleteuserId", async (req, res) => {




  const userId = req.body.userId;

  const jobId=req.body.jobId
 

  try {
  
    // Remove the user's ID from the applied array of the job...........i can use this in delete also
    const removedAppliedUser = await Job.findByIdAndUpdate(
      jobId,
      { $pull: { applied: { userId } } },
      { new: true }
    );

        // Remove the user's ID from the applied array of the job

    res.status(200).json({
      Status: "Success",
      data:removedAppliedUser 
    });


  } catch (error) {
    res.status(404).json({
      details: error.message
    });
  }
});


// deleteuserid from shorlisted ...................................delete...............


jobRoutes.post("/deleteshortlisted", async (req, res) => {




  const userId = req.body.userId;

  const jobId=req.body.jobId
 

  try {
  
    // Remove the user's ID from the applied array of the job...........i can use this in delete also
    const removedshortisted = await Job.findByIdAndUpdate(
      jobId,
      { $pull: { shortlisted: { userId } } },
      { new: true }
    );

        // Remove the user's ID from the applied array of the job

    res.status(200).json({
      Status: "Success",
      data:removedshortisted 
    });


  } catch (error) {
    res.status(404).json({
      details: error.message
    });
  }
});




// expiry  job.....................................................................................................................................



// ... Existing code ...
jobRoutes.post("/expirejob", async (req, res) => {
  const { expire, jobId } = req.body;

  try {
    const formattedDate = moment().format('DD/MM/YY');

    // Check if the job already has an 'expirejob' field
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        status: "Error",
        message: "Job not found"
      });
    }

    // If 'expirejob' doesn't exist, create it
    if (!job.expirejob) {
      job.expirejob = {};
    }

    // Update the job with the formatted date and status
    job.expirejob.status = expire;
    job.expirejob.date = formattedDate;

    const updatedJobDetails = await job.save();

    res.status(200).json({
      status: "Success",
      data: updatedJobDetails
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message
    });
  }
});


const Recruitmentdrive=require("../../models/jobs/RecruitmentDriveJob")


// post a recurtmet drive job...............

jobRoutes.post("/postrecruitmentdrive", async (req, res) => {
  try {
    if (req.body) {
      const recruitmentDriveDetails = await Recruitmentdrive.create(req.body);

      if (recruitmentDriveDetails) {
        return res.status(201).json({
          status: "Success",
          data: recruitmentDriveDetails
        });
      } else {
        return res.status(500).json({
          status: "Error",
          message: "Failed to create the recruitment drive"
        });
      }
    } else {
      return res.status(400).json({
        status: "Error",
        message: "Request body is empty"
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message
    });
  }
});



// detele a job............




//delete specific post,......................................

jobRoutes.delete("/deletejob/:id", async (req, res) => {


  const deleteArr = req.body.deletearr;

  try {
  

    const id = req.params.id;

    // Fetch user details by ID
    const userdetails = await User.findById(id);

    if (
      userdetails.role === "Admin" ||
      userdetails.role === "Sub Admin" ||
      userdetails.role === "Super Admin" ||
      userdetails.AdditionalPortalAccess === "Admin" ||
      userdetails.AdditionalPortalAccess === "Sub Admin" ||
      userdetails.AdditionalPortalAccess === "Super Admin"
    ) {




      // User has access, delete jobs

 


      const postdata = await Job.deleteMany({ _id: { $in: deleteArr } });


      if (postdata) {
        res.json({ postdata: postdata }); // Changed to res.json
      }
    } else {
      // User doesn't have access
      return res.json({ message: "No access" });
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});













module.exports = jobRoutes;
