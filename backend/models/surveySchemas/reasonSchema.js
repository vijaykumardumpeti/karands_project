const mongoose = require("mongoose");
const reasonSchema = new mongoose.Schema({
  location: { type: Object, required: true },
  preferedLocation: { type: Array },
  industry: { type: Array, required: true },
  functionalArea: { type: Array, required: true },
  designation: { type: Array, required: true },
  skills: { type: Array, required: true },
  experienceLevel: { type: String, required: true },
  about: { type: String, required: true },
  jobType: { type: String, required: true },
  surveyType: { type: String, required: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  email: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("reasons", reasonSchema);
