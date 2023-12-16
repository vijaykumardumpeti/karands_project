const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
    title: { type: String },
    companyName: { type: String },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "companies" },
    industry: { type: String },
    functionalArea: { type: String },
    location: { type: String },
    designation: { type: Array },
    skills: { type: Array },
    requiredSkills: { type: Array, required: true },
    employmentType: { type: String },
    RolesAndResponsibilities: { type: String },
    candidateProfile: { type: String },
    jobType: { type: String },
    numberOfVacancies: { type: String },
    salaryStartFrom: { type: Number },
    salaryEndTo: { type: Number },
    experienceStartFrom: { type: Number },
    experienceEndTo: { type: Number },
    educationalQualification: { type: String },
    nameOfRecuriter: { type: String },
    emailOfRecuriter: { type: String },
    contactDetailsOfRecuriter: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    createdBy: { type: String },
    comapnyName: { type: String },
    postedTime: { type: Date, default: new Date() },
    whomToShow: { type: String },
    applied: [
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
      ],
      
      shortlisted: [
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
        }],
        expirejob:{
          status:{type:Boolean},
          date:{type:String}
        }
});



module.exports = mongoose.model("Jobs", jobSchema);