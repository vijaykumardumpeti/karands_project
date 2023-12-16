const Relation = require('../../models/surveySchemas/relationSchema');
const relationRoutes = require('express').Router();


relationRoutes.get("/:email", async (req, res) => {
    try {
        const existingRelation = await Relation.findOne({
            email: req.params.email
        })
        res.status(200).json({
            status: "Success",
            details: existingRelation
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
})
relationRoutes.post("/mentoring", async (req, res) => {
    try {
        const existingRelation = await Relation.findOne({
            email: req.body.email
        })
        console.log(existingRelation);
        if (existingRelation === null || !existingRelation) {
            const newRelation = await Relation.create({
                location: req.body.location,
                preferedLocation: req.body.preferedLocation,
                industry: req.body.industry,
                functionalArea: req.body.functionalArea,
                designation: req.body.designation,
                skills: req.body.skills,
                about: req.body.about,
                professionalExperience: req.body.professionalExperience,
                userid: req.body.id,
                surveyType: "Mentoring others",
                email: req.body.email
            })

            res.status(200).json({
                status: "Success",
                details: newRelation
            })
        } else {
            const updatedRelation = await Relation.findByIdAndUpdate(
                { _id: existingRelation._id },
                {
                    location: req.body.location,
                    preferedLocation: req.body.preferedLocation,
                    industry: req.body.industry,
                    functionalArea: req.body.functionalArea,
                    designation: req.body.designation,
                    skills: req.body.skills,
                    about: req.body.about,
                    professionalExperience: req.body.professionalExperience,
                    userid: req.body.id,
                    surveyType: "Mentoring others",
                    email: req.body.email
                },
                { new: true }
            )
            res.status(200).json({
                status: "Successfully updated",
                details: updatedRelation
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
});
relationRoutes.post("/mentorship", async (req, res) => {
    try {
        const existingRelation = await Relation.findOne({ email: req.body.email })
        console.log(existingRelation);

        if (existingRelation === null || !existingRelation) {
            const newRelation = await Relation.create({
                location: req.body.location,
                preferedLocation: req.body.preferedLocation,
                industry: req.body.industry,
                functionalArea: req.body.functionalArea,
                designation: req.body.designation,
                userid: req.body.id,
                skills: req.body.skills,
                about: req.body.about,
                surveyType: "Seeking Mentorship",
                email: req.body.email
            })
            res.status(200).json({
                status: "Success",
                details: newRelation
            })

        } else {
            const newRelation = await Relation.findByIdAndUpdate(
                { _id: existingRelation._id },
                {
                    location: req.body.location,
                    preferedLocation: req.body.preferedLocation,
                    industry: req.body.industry,
                    functionalArea: req.body.functionalArea,
                    designation: req.body.designation,
                    skills: req.body.skills,
                    userid: req.body.id,
                    about: req.body.about,
                    surveyType: "Seeking Mentorship",
                    email: req.body.email
                })
            res.status(200).json({
                status: "Success",
                details: newRelation
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
})
module.exports = relationRoutes;

