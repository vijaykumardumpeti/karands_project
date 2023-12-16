const mongoose = require("mongoose");
const functionalAreaSchema = new mongoose.Schema({
    label:{type:String},
    value:{type:String},
});
module.exports = mongoose.model("designations", functionalAreaSchema);