const Savings = require('../../models/surveySchemas/savingsSchema');
const savingsRoutes = require('express').Router();

savingsRoutes.get("/:email", async (req, res) => {
    try {
        const existingSavings = await Savings.findOne({ email: req.params.email })
        res.status(200).json({
            status: "Success",
            details: existingSavings
        })
    }
    catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
})
savingsRoutes.post("/forInvest", async (req, res) => {
    try {
        const existingSavings = await Savings.findOne({ email: req.body.email })
        if (existingSavings === null || !existingSavings) {
            const newSavings = await Savings.create({
                location: req.body.location,
                preferedLocation: req.body.preferedLocation,
                functionalArea: req.body.functionalArea,
                industry: req.body.industry,
                industryType: req.body.industryType,
                investMentAmount: req.body.investMentAmount,
                projectStage: req.body.projectStage,
                about: req.body.about,
                attachament: req.body.attachament,
                userid: req.body.id,
                surveyType: "Looking for investments",
                email: req.body.email
            })

            res.status(200).json({
                status: "Success",
                details: newSavings
            })
        } else {
            const newSavings = await Savings.findByIdAndUpdate({
                _id: existingSavings._id
            }, {
                location: req.body.location,
                preferedLocation: req.body.preferedLocation,
                industry: req.body.industry,
                industryType: req.body.industryType,
                investMentAmount: req.body.investMentAmount,
                functionalArea: req.body.functionalArea,
                userid: req.body.id,
                projectStage: req.body.projectStage,
                about: req.body.about,
                attachament: "",
                surveyType: "Looking for investments",
                email: req.body.email
            }, { new: true })
            res.status(200).json({
                status: "Success",
                details: newSavings
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
});
savingsRoutes.post("/toInvest", async (req, res) => {
    try {
        const existingSavings = await Savings.findOne({ email: req.body.email })
        if (existingSavings === null || !existingSavings) {
            const newSavings = await Savings.create({
                location: req.body.location,
                preferedLocation: req.body.preferedLocation,
                industry: req.body.industry,
                industryType: req.body.industryType,
                functionalArea: req.body.functionalArea,
                audienceType: req.body.audienceType,
                investMentAmount: req.body.investMentAmount,
                userid: req.body.id,
                about: req.body.about,
                surveyType: "Looking to invest",
                email: req.body.email,

            })

            res.status(200).json({
                status: "Success",
                details: newSavings
            })
        } else {
            const newSavings = await Savings.findByIdAndUpdate({ _id: existingSavings._id }, {
                location: req.body.location,
                preferedLocation: req.body.preferedLocation,
                industry: req.body.industry,
                industryType: req.body.industryType,
                functionalArea: req.body.functionalArea,
                audienceType: req.body.audienceType,
                investMentAmount: req.body.investMentAmount,
                userid: req.body.id,
                about: req.body.about,
                surveyType: "Looking to invest",
                email: req.body.email,

            }, { new: true })
            res.status(200).json({
                status: "Success",
                details: newSavings
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
})
module.exports = savingsRoutes;

