const mongoose=require('mongoose');
const connectionSchema = require('../surveySchemas/connectionSchema');
const connectionPeople=new mongoose.Schema({
    userId:{type:String, unique:true},
    friends: Array,
    requestSend:Array,
    requestReceived:Array
})
module.exports=mongoose.model("friends",connectionPeople)