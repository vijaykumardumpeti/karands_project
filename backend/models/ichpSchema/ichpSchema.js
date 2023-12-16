const mongoose = require("mongoose");
const ichpSchema = new mongoose.Schema({
    industry:{required:true, type:Object },
    skills:{required:true, type:Object },
    location:{required:true, type:String },
    email:{required:true, type:String },
    hrTitle:{required:true, type:String },
    WorkExperienceYear:{required:true, type:String },
    WorkExperienceMonth:{required:true, type:String },
});
module.exports = mongoose.model("ichp", ichpSchema);