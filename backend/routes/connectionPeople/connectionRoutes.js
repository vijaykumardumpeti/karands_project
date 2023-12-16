const connectionUserRoutes = require('express').Router();
const Request = require("../../models/connection/requestSchema");
const Connection = require("../../models/connection/connectionschema");
const User = require("../../models/userSchema");
const Survey = require('../../models/surveySchemas/surveyDetailSchema');

require("dotenv").config();

if (!process.env.IP_ADDRESS) {
  throw new Error('IP_ADDRESS are missing.');
}

connectionUserRoutes.post("/connection/people", async (req, res) => {
  try {
    const senderid = req.body.senderid;
    const receiverid = req.body.receiverid;
    const senderUpdated = await Connection.findOne({ userId: senderid });
    const receiverUpdated = await Connection.findOne({ userId: receiverid });
    if (senderUpdated === null || !senderUpdated) {
      console.log('created sender')
      await Connection.create({
        userId: senderid,
        friends: []
      })
    }
    if (receiverUpdated === null || !receiverUpdated) {
      console.log('created receiver')

      await Connection.create({
        userId: receiverid,
        friends: []
      })
    }
    const senderUpdation = await Connection.findOneAndUpdate({ userId: senderid }, { $addToSet: { requestSend: receiverid } }, { new: true });
    const receiverUpdation = await Connection.findOneAndUpdate({ userId: receiverid }, { $addToSet: { requestReceived: senderid } }, { new: true });
    res.json({
      send: senderUpdation,
      receiverUpdated: receiverUpdation
    })
  } catch (error) {

  }
})




connectionUserRoutes.patch("/deleteRequest", async (req, res) => {
  try {
    const senderId = req.body.senderid;
    const receiverId = req.body.receiverid;
    const sender = await Connection.find({ userId: senderId });
    const receiver = await Connection.find({ userId: receiverId });
    console.log(receiverId, senderId)
    if (sender.length === 0 || receiver.length === 0) {
      res.status(404).json({
        status: "Failed",
        Message: "User not found"
      })
    } else {
      const senderDetails = await Connection.findOneAndUpdate({ userId: senderId }, { $pull: { requestSend: receiverId } }, { new: true })
      const receiverDetails = await Connection.findOneAndUpdate({ userId: receiverId }, { $pull: { requestReceived: senderId } }, { new: true });
      res.send('okay')
    }

  } catch (error) {
    res.json({
      status: "Failed",
      details: error.message
    })
  }
})




connectionUserRoutes.patch("/acceptRequest", async (req, res) => {
  try {
    const senderId = req.body.senderid;
    const receiverId = req.body.receiverid;

    const sender = await Connection.find({ userId: senderId });
    const receiver = await Connection.find({ userId: receiverId });


    if (sender.length === 0 || receiver.length === 0) {
      res.status(404).json({
        status: "Failed",
        Message: "User not found"
      })
    }
    const senderDetails = await Connection.findOneAndUpdate({ userId: senderId },
      {
        $pull: { requestSend: receiverId },
        $addToSet: { friends: receiverId }
      },

      { new: true }
    )

    const receiverDetails = await Connection.findOneAndUpdate({ userId: receiverId },
      {
        $pull: { requestReceived: senderId },
        $addToSet: { friends: senderId }
      },

      { new: true }
    )

    res.json({
      sender: senderDetails,
      receiver: receiverDetails
    })
  } catch (error) {
    res.json({
      status: "Failed",
      details: error.message
    })
  }

})



connectionUserRoutes.get("/allreceivedrequest/:id", async (req, res) => {
  try {
    const allRoutes = await Connection.findOne({ userId: req.params.id }).select('requestReceived');
    console.log(allRoutes)
    if (allRoutes === null || !allRoutes) {
      res.status(200).json([]);
    } else {
      const vals = allRoutes.requestReceived;
      User.find({ _id: { $in: vals } }).select("name _id location designation").exec(
        (err, results) => {
          if (err) {
            // console.error(err);
            res.status(500).json({ error: 'An error occurred' });
          } else {
            res.status(200).json(results);
          }
        }
      )
    }

  } catch (error) {
    res.json({
      status: "Failed",
      details: error.message
    })

  }
})



connectionUserRoutes.get("/allsendrequest/:id", async (req, res) => {
  try {
    const allRoutes = await Connection.findOne({ userId: req.params.id });
    if (allRoutes === null || !allRoutes) {
      res.status(200).json([]);

    }
    else {
      const vals = allRoutes.requestSend;
      User.find({ _id: { $in: vals } }).select("name _id location designation").exec(
        (err, results) => {
          if (err) {
            // console.error(err);
            res.status(500).json({ error: 'An error occurred' });
          } else {
            res.status(200).json(results);
          }
        }
      )
    }
  } catch (error) {
    res.json({
      status: "Failed",
      details: error.message
    })

  }
})


connectionUserRoutes.get("/allfriends/:id", async (req, res) => {
  const user = await Connection.findOne({ userId: req.params.id });
  if (user === null || !user) {
    res.status(200).json([]);
  } else {

    let selectionOfUser = user.friends;
    User.find({ _id: { $in: selectionOfUser } }).select("name _id location designation").exec(
      (err, results) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          res.status(200).json(results);
        }
      }
    )

  }


})

// get whether the friend is their in connections or not....................................................


connectionUserRoutes.get("/checkconnection/:userId/:targetUserId", async (req, res) => {
  const user = await Connection.findOne({ userId: req.params.userId });
  
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const targetUserId = req.params.targetUserId;
  const isFriend = user.friends.includes(targetUserId);
  
  res.status(200).json({ isFriend });
});








connectionUserRoutes.get("/myid/:id", async (req, res) => {
  const users = await Connection.findOne({ userId: req.params.id });
  res.send(users)
})









connectionUserRoutes.get("/suggestionUser/:skip/:userId", async (req, res) => {

  try {
    const userId = req.params.userId;
    const skip = req.params.skip === 0 ? 0 : req.params.skip * 2;


    const userSurvey = await Survey.findOne({ userid: userId });


    const userDetails = await User.findById({ _id: userId });

    
    if (userSurvey === null) {

      res.send([])
    } else {

      const fullSurvey = [];


      if (userSurvey.reason != "") {
        if (userSurvey.reason === "Looking for job") {

          fullSurvey.push({
            reason: 'Looking to hire'
          })
        } else {
          fullSurvey.push({
            reason: 'Looking for job'
          })
        }
      }


      if (userSurvey.connection != "") {
        if (userSurvey.connection === "Looking to build Network") {

          fullSurvey.push({
            connection: 'Looking to collabrate'
          })
        } else {
          fullSurvey.push({
            connection: "Looking to build Network"
          })
        }
      }
      if (userSurvey.relation != "") {
        if (userSurvey.relation === "Mentoring others") {

          fullSurvey.push({
            relation: "Seeking Mentorship"
          })
        } else {
          fullSurvey.push({
            relation: "Mentoring others"
          })
        }
      }
      if (userSurvey.savings != "") {
        if (userSurvey.savings === "Looking for investments") {
          fullSurvey.push({
            savings: "Looking to invest"
          })
        } else {
          fullSurvey.push({
            savings: "Looking for investments"
          })
        }
      }
      if (userSurvey.marketing != "") {
        if (userSurvey.marketing === "Advertise") {
          fullSurvey.marketing = 'Affiliate';
          fullSurvey.push({
            marketing: "Affiliate"
          })
        } else {
          fullSurvey.push({
            marketing: "Advertise"
          })
        }
      }



      const userConnections = await Connection.findOne({ userId: userId });


      if (userConnections === null || !userConnections) {

        const survey = await Survey.find(
          {
            $or: fullSurvey,
          }
        ).select('userid');





        const finalArr = survey.map(data => data.userid);
        
        const skills = userDetails.skills

        User.find({ _id: { $in: finalArr }, location: userDetails.location,skills:{$in:skills},industry:userDetails.industry }).select("name _id location designation").skip(skip).limit(5).exec(
          (err, results) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'An error occurred' });
            } else {
             if(results.length<2) {
              res.redirect(`https://${process.env.IP_ADDRESS}/karands/request/suggesteduserLocation/${userId}/15`)
             }
             else
             {
              res.status(200).json(results);
             }
            }
          }
        )
      }
      
      
      else {

        const fullArr = [...userConnections.requestSend, ...userConnections.friends, ...userConnections.requestReceived];


        const survey = await Survey.find(
          {
            $or: fullSurvey,
            userid: { $nin: fullArr },
          }
        ).select('userid');


        const finalArr = survey.map(data => data.userid);
        
        
        User.find({ _id: { $in: finalArr },location:userDetails.location , industry:userDetails.industry,skills:{$in:userDetails.skills}}).select("name _id location designation").skip(skip).exec(
          (err, results) => {
            if (err) {
              console.error(err);
              res.status(500).json({ error: 'An error occurred' });
            } else {
              if(results.length==0) {
                res.redirect(`https://${process.env.IP_ADDRESS}/karands/request/suggesteduserLocation/${userId}/15`)
               }
               else
               {
                res.status(200).json(results);
               }
            }
          }
        )
      }

    }

  } catch (error) {
    res.json({
      status: "Failed",
      error: error.message
    })
  }
})









connectionUserRoutes.get("/suggesteduserLocation/:id/:skip", async(req,res)=>{
try {
  const skip=parseInt(req.params.skip);
  const userid=req.params.id;

  const userCollections=await User.findById({_id:userid});

  console.log(userCollections.location);

  const sendAccordingToLocation=await User.find({location:userCollections.location}).select("name _id location designation").skip(skip).limit(5);


  const sendAccordingToIndustry=await User.find({industry:userCollections.industry}).select("name _id location designation").skip(skip).limit(5)


  console.log(sendAccordingToIndustry);
  res.send([...sendAccordingToIndustry,...sendAccordingToLocation])

} catch (error) {
  res.json({
    status: "Failed",
    error: error.message
  })
}
})









module.exports = connectionUserRoutes;