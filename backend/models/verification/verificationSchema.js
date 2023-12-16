const mongoose=require('mongoose');
const verificationSchema=new mongoose.Schema({
    aadharCard:String,
    panCard:String,
    passport:String,
    license:String,
    voterId:String,
    otherPersonal:String,
    Convocation:String,
    ConsolidatedMarksheets:String,
    IndividualMarksheet:String,
    otherEducation:String,
    OfferLetter:String,
    AppointmentLetter:String,
    AppraisalLetter:String,
    SalarySlips:String,
    Rewards:String,
    otherProfessional:String,
    othersProject:String,
    othersCertificate:String,
    candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
});
module.exports=mongoose.model('verifications',verificationSchema)