const mongoose = require("mongoose");
const iuSchema = new mongoose.Schema({
    industry:{required:true, type:String },
    preferredIndustry:{required:true, type:Object },
    location:{required:true, type:String },
    preferredLocation:{required:true, type:Object },
    email:{required:true, type:String },
    designation:{required:true, type:Object },
    preferredDesignation:{required:true, type:Object },
    skills:{required:true, type:Object },
    WorkExperienceYear:{required:true, type:String },
    WorkExperienceMonth:{required:true, type:String },
});
module.exports = mongoose.model("iu", iuSchema);