const mongoose = require("mongoose");
const connectionSchema = new mongoose.Schema({
  location: { type: Object, required: true },
  preferedLocation: { type: Array, required: true },
  industry: { type: Array, required: true },
  functionalArea: { type: Array, required: true },
  designation: { type: Array, required: true },
  skills: { type: Array, required: true },
  about: { type: String, required: true },
  surveyType: { type: String, required: true },
  serviceOffer: { type: String },
  serviceLooking: { type: String },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },

  email: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("connection", connectionSchema);
