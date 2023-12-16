
const Skills = require("../../models/dropDownSchema/skillsSchema");
const skillsRoutes = require('express').Router();
skillsRoutes.get("/", async (req, res) => {
    try {
       let allFunctionalArea=await Skills.find().limit(50);
       res.send(allFunctionalArea);
    } catch (error) {
        res.send(error.message)
    }
});
skillsRoutes.get("/:skills", async (req, res) => {
    try {
      const startingWords = req.params.skills;
      const regexPattern = new RegExp(`^${startingWords}`, "i");
  
      console.log(regexPattern);
      let allSkills = await Skills.find({ allSklls: { $regex: regexPattern } })
        .then((document) => {
          res.send(document);
        })
        .catch((err) => {
          console.error(err.message);
          res.send(err.message);
        });
    } catch (error) {
      res.send(error.message);
    }
  });

module.exports = skillsRoutes;