const mongoose = require("mongoose");


const educationschema = new mongoose.Schema({

    degree:{type:String},
    course:[String]

})


const education = mongoose.model("education", educationschema);

module.exports = education;