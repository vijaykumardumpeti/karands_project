const Ichp = require("../../models/ichpSchema/ichpSchema");
const ichpRoutes = require("express").Router();
ichpRoutes.post("/", async (req, res) => {
  try {
    const existingUser = await Ichp.findOne({ email: req.body.email });
    if (existingUser === null || !existingUser) {
      const newUser = await Ichp.create({
        industry: req.body.industry,
        location: req.body.location,
        skills: req.body.skills,

        email: req.body.email,
        hrTitle: req.body.hrTitle,
        WorkExperienceYear: req.body.WorkExperienceYear,
        WorkExperienceMonth: req.body.WorkExperienceMonth
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
module.exports = ichpRoutes;
