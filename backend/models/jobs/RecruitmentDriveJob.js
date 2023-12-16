const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title:{type:String},
 
    title: {type:String},
    companyName: {type:String},
    venue: {type:String},
    No_of_Support_HRs:{type:String},
    HRtitle:[],
    Hourlypay: {type:String},
    totalpositions:{type:String},
    hiringtitles:[],
    totalhours:{type:String},
  
    RecruiterId: {type:String},
    Recruitername: {type:String},
    Recruiteremail:{type:String},
    RecruiterContactDetails:{type:String},
   
    selecteddates: [],
    interested: [
        {
          userId: {
            type:String,
            ref: 'User'
            // unique: true, // Ensure uniqueness of userId within the likes array
            // required: true,
          },
          name: {
            type: String,
            required: true,
          },
          email:{
            type:String
          },
          Designation:{
            type:String
          }
        },
      ]
      
      
});



module.exports = mongoose.model("Recruitment_Drive_Job", jobSchema);