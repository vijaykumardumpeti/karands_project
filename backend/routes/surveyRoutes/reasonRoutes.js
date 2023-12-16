const Reason = require("../../models/surveySchemas/reasonSchema");
const reasonRoutes = require("express").Router();

reasonRoutes.get("/:email", async (req, res) => {
  try {
    const existingReason = await Reason.findOne({
      email: req.params.email,
    });
    res.status(200).json({
      status: "Success",
      details: existingReason,
    });
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
});
reasonRoutes.post("/job", async (req, res) => {
  console.log(req.body.id);
  try {
    const existingReason = await Reason.findOne({
      email: req.body.email,
    });
    console.log(existingReason);
    if (existingReason === null || !existingReason) {
      const newReason = await Reason.create({
        location: req.body.location,
        preferedLocation: req.body.preferedLocation,
        functionalArea: req.body.functionalArea,
        designation: req.body.designation,
        skills: req.body.skills,
        experienceLevel: req.body.experienceLevel,
        about: req.body.about,
        industry: req.body.industry,
        jobType: req.body.jobType,
        userid: req.body.id,
        surveyType: "Looking for job",
        email: req.body.email,
      });

      res.status(200).json({
        status: "Success",
        details: newReason,
      });
    } else {
      const updateReason = await Reason.findByIdAndUpdate(
        { _id: existingReason._id },
        {
          location: req.body.location,
          preferedLocation: req.body.preferedLocation,
          functionalArea: req.body.functionalArea,
          designation: req.body.designation,
          skills: req.body.skills,
          experienceLevel: req.body.experienceLevel,
          about: req.body.about,
          industry: req.body.industry,
          userid: req.body.id,
          jobType: req.body.jobType,
          surveyType: "Looking for job",
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: "Successfully updated",
        details: updateReason,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
});
reasonRoutes.post("/hire", async (req, res) => {
  try {
    const existingReason = await Reason.findOne({
      email: req.body.email,
    });
    console.log(existingReason);
    if (existingReason === null || !existingReason) {
      const newReason = await Reason.create({
        location: req.body.location,
        preferedLocation: req.body.preferedLocation,
        functionalArea: req.body.functionalArea,
        designation: req.body.designation,
        skills: req.body.skills,
        experienceLevel: req.body.experienceLevel,
        userid: req.body.id,
        about: req.body.about,
        industry: req.body.industry,
        jobType: req.body.jobType,
        surveyType: "Looking to hire",
        email: req.body.email,
      });

      res.status(200).json({
        status: "Success",
        details: newReason,
      });
    } else {
      const updateReason = await Reason.findByIdAndUpdate(
        { _id: existingReason._id },
        {
          location: req.body.location,
          preferedLocation: req.body.preferedLocation,
          functionalArea: req.body.functionalArea,
          designation: req.body.designation,
          skills: req.body.skills,
          experienceLevel: req.body.experienceLevel,
          about: req.body.about,
          industry: req.body.industry,
          jobType: req.body.jobType,
          userid: req.body.id,
          surveyType: "Looking to hire",
        },
        {
          new: true,
        }
      );
      res.status(200).json({
        status: "Successfully updated",
        details: updateReason,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      message: error.message,
    });
  }
});
module.exports = reasonRoutes;
