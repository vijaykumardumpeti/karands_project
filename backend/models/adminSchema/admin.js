const mongoose=require('mongoose');
const adminSchema=new mongoose.Schema({
    payment:Number,
    totalEarning:Number,
    totalBalance:Number,
    spend:Number,
});
module.exports=mongoose.model("admin",adminSchema);