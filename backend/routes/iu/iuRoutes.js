const Iu = require("../../models/iuSchema/iuSchema");
const iuRoutes = require("express").Router();
iuRoutes.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const existingUser = await Iu.findOne({ email: req.body.email });
    if (existingUser === null || !existingUser) {
      const newUser = await Iu.create({
        location: req.body.location,
        preferredLocation: req.body.preferredLocation,
        designation: req.body.designation,
        preferredDesignation: req.body.preferredDesignation,
        industry: req.body.industry,
        preferredIndustry: req.body.preferredIndustry,
        email: req.body.email,
        skills: req.body.skills,
        WorkExperienceYear: req.body.WorkExperienceYear,
        WorkExperienceMonth: req.body.WorkExperienceMonth,
      })
      res.status(200).json({
        status: 'Success',
        result: newUser
      })
    } else {
      res.status(400).json({
        status: "Failed",
        message: "User already completed",
      });
    }

  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
});
module.exports = iuRoutes;
