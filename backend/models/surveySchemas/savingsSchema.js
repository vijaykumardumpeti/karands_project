const mongoose = require("mongoose");
const savingsSchema = new mongoose.Schema({
  location: { type: Object, required: true },
  preferedLocation: { type: Array },
  industry: { type: Array, required: true },
  functionalArea: { type: Array, required: true },
  designation: { type: Array, required: true },
  skills: { type: Array, required: true },
  industryType: { type: String, required: true },
  about: { type: String, required: true },
  audienceType: String,
  surveyType: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  projectStage: String,
  investMentAmount: Number,
  attachament: String,
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },

});
module.exports = mongoose.model("savings", savingsSchema);
