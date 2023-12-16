const mongoose = require("mongoose");
const marketingSchema = new mongoose.Schema({
  location: { type: Object, required: true },
  preferedLocation: { type: Array, required: true },
  industry: { type: Array, required: true },
  functionalArea: { type: Array, required: true },
  designation: { type: Array, required: true },
  skills: { type: Array, required: true },
  industryType: { type: String, required: true },

  age: Number,

  audienceType: String,
  advertiseProperty: String,

  educationLevel: { type: String, required: true },
  earningRange: String,
  about: { type: String, required: true },
  surveyType: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },

});
module.exports = mongoose.model("marketings", marketingSchema);
