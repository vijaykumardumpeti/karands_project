const mongoose = require('mongoose');
const requestSchema = new mongoose.Schema({
    requestSenderId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    requestReceiverId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    status: {type: String,enum: ['pending', 'accepted', 'rejected'],default: 'pending'},
    createdAt: {type: Date,default: Date.now},
})
module.exports=mongoose.model('request', requestSchema);