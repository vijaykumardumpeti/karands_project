const mongoose = require("mongoose");
const relationSchema = new mongoose.Schema({
  location: { type: Object },
  preferedLocation: { type: Array },
  industry: { type: Array, required: true },
  functionalArea: { type: Array, required: true },
  designation: { type: Array, required: true },
  skills: { type: Array, required: true },
  professionalExperience: Number,
  about: { type: String },
  surveyType: { type: String },
  email: { type: String, required: true, unique: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },

});
module.exports = mongoose.model("relations", relationSchema);
