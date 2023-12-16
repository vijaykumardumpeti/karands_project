const mongoose = require("mongoose");
const hrSchema = new mongoose.Schema({
    label:{type:String},
    value:{type:String},
});
module.exports = mongoose.model("hrs", hrSchema);