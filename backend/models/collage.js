const mongoose = require("mongoose");


const collegeschema = new mongoose.Schema({

    name:{type:String},
    type:{type:String}

})




const colleges = mongoose.model("college", collegeschema);




module.exports = colleges;