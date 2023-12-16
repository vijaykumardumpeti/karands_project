const mongoose = require("mongoose");
const skillSchema = new mongoose.Schema({
    allSklls:{type:String}
});
module.exports = mongoose.model("skills", skillSchema);