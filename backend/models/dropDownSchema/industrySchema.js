const mongoose = require("mongoose");
const industrySchema = new mongoose.Schema({
    label:{type:String},
    value:{type:String},
});
module.exports = mongoose.model("industries", industrySchema);