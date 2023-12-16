const Hr=require("../../models/dropDownSchema/hrSchema");
const hrRoutes = require("express").Router();
hrRoutes.get("/", async (req, res) => {
    try {
      let allHR = await Hr.find().limit(50);
      res.send(allHR);
    } catch (error) {
      res.send(error.message);
    }
  });
  hrRoutes.get("/:hr", async (req, res) => {
    try {
      console.log('called');
      const startingWords = req.params.hr;
      const regexPattern = new RegExp(`^${startingWords}`, "i");
      const newCity = await Hr.find({ value: { $regex: regexPattern } });
      res.send(newCity);
    } catch (error) {
      res.send(error.message);
    }
  });
module.exports = hrRoutes;
