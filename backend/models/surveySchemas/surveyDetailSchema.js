const mongoose = require("mongoose");
const surveyDetailSchema = new mongoose.Schema({
  reason: { type: String },
  connection: { type: String },
  relation: { type: String },
  savings: { type: String },
  marketing: { type: String },
  reasonStatus: Boolean,
  connectionStatus: Boolean,
  relationStatus: Boolean,
  savingsStatus: Boolean,
  marketingStatus: Boolean,
  email: { type: String, required: true, unique: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "Users" , unique:true},
  
});
module.exports = mongoose.model("survey", surveyDetailSchema);