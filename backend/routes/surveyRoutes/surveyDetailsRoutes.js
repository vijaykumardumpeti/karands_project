const Survey = require('../../models/surveySchemas/surveyDetailSchema');
const User=require('../../models/userSchema')
const surveyRoutes = require("express").Router();

require("dotenv").config();
const cors = require("cors");


surveyRoutes.use(cors(

  {
    origin: process.env.IP_ADDRESS,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // If you need to send cookies or authentication headers
  }



));



surveyRoutes.post("/", async (req, res) => {

    console.log(req.body.id)


  try {
    const existingSurvey=await Survey.findOne({email:req.body.email})


    if(existingSurvey===null||!existingSurvey){
        const newSurvey=await Survey.create({
            email:req.body.email,
            reason:req.body.reason,
            connection:req.body.connection,
            relation:req.body.relation,
            savings:req.body.savings,
        userid:req.body.id,
        marketing:req.body.marketing,
        })
        res.status(200).json({
            status: "Success",
            details: newSurvey
        })
    }
    
    else{
        const updateSurvey=await Survey.findByIdAndUpdate({_id:existingSurvey._id},{
            
            reason:req.body.reason,
            connection:req.body.connection,
            relation:req.body.relation,
            savings:req.body.savings,
            marketing:req.body.marketing,
        userid:req.body.id,
        },
        {
            new:true
        })
        res.status(200).json({
            status: "Success",
            details: updateSurvey
        })
    }
  } catch (error) {
     res.status(400).json({
            status: "Failed",
            message: error.message
        })
  }
});



surveyRoutes.get("/:email", async (req, res) => {
    try {
        console.log(req.params.email);
        const newSurvey = await Survey.findOne({
            email: req.params.email,
        })
        res.status(200).json({
            status: "Success",
            details: newSurvey
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
});


surveyRoutes.put('/update-survey-records', async (req, res) => {
    try {
      // Retrieve all survey records where userId does not exist
      const surveysToUpdate = await Survey.find({ userId: { $exists: false } });
  let count=0;
      for (const survey of surveysToUpdate) {
        // Find the corresponding user based on email
        const user = await User.findOne({ email: survey.email });
        count++;

        console.log(count)
        if (user) {
          // Update the survey record with the user's ID
          await Survey.updateOne(
            { _id: survey._id },
            { $set: { userid: user._id } }
          );
        }
      }
  
      res.status(200).json({ message: 'Survey records updated successfully.' });
    } catch (error) {
      console.error('Error updating survey records:', error);
      res.status(500).json({ error: 'An error occurred while updating survey records.' });
    }
  });
  

module.exports = surveyRoutes