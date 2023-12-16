const Connection = require('../../models/surveySchemas/connectionSchema');
const connectionRoutes = require('express').Router();


connectionRoutes.get("/:email",async(req,res)=>{
try {
    const existingConnection=await Connection.findOne({email:req.params.email})
    res.status(200).json({
        status:"Success",
        details:existingConnection
    })
} catch (error) {
    res.status(400).json({
        status:"Failed",
        message:error.message
    })
}
})
connectionRoutes.post("/network",async(req,res)=>{
   try {
    const existingConnection=await Connection.findOne({email:req.body.email})
   if(existingConnection===null|| !existingConnection){
    const newConnection=await Connection.create({
        location:req.body.location,
        preferedLocation:req.body.preferedLocation,
        industry:req.body.industry,
        functionalArea:req.body.functionalArea,
        designation:req.body.designation,
        skills:req.body.skills,
        about:req.body.about,
        surveyType:"Looking to build Network",
        email:req.body.email,
        userid:req.body.id,
    })
    res.status(200).json({
        status:"Success",
        details:newConnection
    })

   }else{
    const updatedConnection=await Connection.findByIdAndUpdate(
        {_id:existingConnection._id},
        {
        location:req.body.location,
        preferedLocation:req.body.preferedLocation,
        industry:req.body.industry,
        surveyType:"Looking to build Network",
        functionalArea:req.body.functionalArea,
        designation:req.body.designation,
        skills:req.body.skills,
        about:req.body.about,
        userid:req.body.id,

    },{new:true})
    res.status(200).json({
        status:"Success updated",
        details:updatedConnection
    })
   }
   } catch (error) {
    res.status(400).json({
        status:"Failed",
        message:error.message
    })
   }
});
connectionRoutes.post("/collabrate",async(req,res)=>{
    try {
        const existingConnection=await Connection.findOne({email:req.body.email})
        if(existingConnection===null|| !existingConnection){
     const newConnection=await Connection.create({
         location:req.body.location,
         preferedLocation:req.body.preferedLocation,
         functionalArea:req.body.functionalArea,
         designation:req.body.designation,
         skills:req.body.skills,
         about:req.body.about,
         industry:req.body.industry,
         email:req.body.email,
         serviceOffer:req.body.serviceOffer,
         serviceLooking:req.body.serviceLooking,
         surveyType:"Looking to collabrate",
        userid:req.body.id,

     })

     res.status(200).json({
         status:"Success",
         details:newConnection
     })
    }else{
        const updatedConnection=await Connection.findByIdAndUpdate(
            {_id:existingConnection._id},
            {
                location:req.body.location,
                preferedLocation:req.body.preferedLocation,
                functionalArea:req.body.functionalArea,
                designation:req.body.designation,
                skills:req.body.skills,
                about:req.body.about,
                industry:req.body.industry,
              
                serviceOffer:req.body.serviceOffer,
                serviceLooking:req.body.serviceLooking,
                surveyType:"Looking to collabrate",
        userid:req.body.id,

        },{new:true})
        res.status(200).json({
            status:"Success updated",
            details:updatedConnection
        })
    }
    } catch (error) {
     res.status(400).json({
         status:"Failed",
         message:error.message
     })
    }
 })
module.exports = connectionRoutes;

