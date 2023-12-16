const mongoose = require("mongoose");
const citySchema = new mongoose.Schema({
   label:{type:String},
   value:{type:String},
});
module.exports = mongoose.model("cities", citySchema);