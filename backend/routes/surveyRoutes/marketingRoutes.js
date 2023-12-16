const Marketing = require('../../models/surveySchemas/marketingSchema');
const marketingRoutes = require('express').Router();

marketingRoutes.get("/:email", async (req, res) => {
    try {
        const existingMarketing = await Marketing.findOne({ email: req.params.email })
        res.status(200).json({
            status: "Success",
            details: existingMarketing
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
})
marketingRoutes.post("/advertise", async (req, res) => {
    try {
        const existingMarketing = await Marketing.findOne({
            _email: req.body.email
        })
        if (existingMarketing !== null || existingMarketing) {
        const DeleteData=    await Marketing.findByIdAndDelete({ _id: existingMarketing._id })
            console.log('data Deleted')
        } 
        const newMarketing = await Marketing.create({
            location: req.body.location,
            preferedLocation: req.body.preferedLocation,
            industry: req.body.industry,
            industryType: req.body.industryType,
            functionalArea: req.body.functionalArea,
            designation: req.body.designation,
            skills: req.body.skills,
            age: req.body.age,
            audienceType: req.body.audienceType,
            about: req.body.about,
            educationLevel: req.body.educationLevel,
            earningRange: req.body.earningRange,
            surveyType: "Advertise",
            email: req.body.email,
        userid:req.body.id,

        });

res.status(200).json({
            status: "Success",
            details: newMarketing
        })

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
});
marketingRoutes.post("/affiliate", async (req, res) => {
    try {
        const existingMarketing = await Marketing.findOne({ email: req.body.email });
        if(existingMarketing===null || !existingMarketing){
            const newMarketing = await Marketing.create({
                location: req.body.location,
        userid:req.body.id,

                preferedLocation: req.body.preferedLocation,
                industry: req.body.industry,
                industryType: req.body.industryType,
                functionalArea: req.body.functionalArea,
                designation: req.body.designation,
                skills: req.body.skills,
                age: req.body.age,
                advertiseProperty: req.body.advertiseProperty,
                about: req.body.about,
                educationLevel: req.body.educationLevel,
                earningRange: req.body.earningRange,
                surveyType: "Affiliate",
                email: req.body.email
            })

            res.status(200).json({
                status: "Success",
                details: newMarketing
            })
        }else{
            const newMarketing = await Marketing.findByIdAndUpdate({_id:existingMarketing._id},{
                location: req.body.location,
                preferedLocation: req.body.preferedLocation,
                industry: req.body.industry,
                industryType: req.body.industryType,
                functionalArea: req.body.functionalArea,
                designation: req.body.designation,
                skills: req.body.skills,
                age: req.body.age,
        userid:req.body.id,

                advertiseProperty: req.body.advertiseProperty,
                about: req.body.about,
                educationLevel: req.body.educationLevel,
                earningRange: req.body.earningRange,
                surveyType: "Affiliate",
                email: req.body.email
            },{new:true})
            res.status(200).json({
                status: "Success",
                details: newMarketing
            })
        }
      
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
});
module.exports = marketingRoutes;

