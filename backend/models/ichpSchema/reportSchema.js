const mongoose = require("mongoose");

const report = new mongoose.Schema({



   contentdata:{type:Object},

   reportedby: { type: Object },

  

   reporttype: { type: String },
   

   reportreason:{type:String},
  

   action: { type: Object },

})


module.exports = mongoose.model("report", report);
