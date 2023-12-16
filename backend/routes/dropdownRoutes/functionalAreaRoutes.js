const FunctionalArea = require("../../models/dropDownSchema/functionalAreaSchema");
const functionalAreaRoutes = require('express').Router();
functionalAreaRoutes.get("/", async (req, res) => {
    try {
       let allFunctionalArea=await FunctionalArea.find().limit(50);
       res.send(allFunctionalArea);
    } catch (error) {
        res.send(error.message)
    }
});
functionalAreaRoutes.get("/:functionalarea", async (req, res) => {
    try {
      const startingWords = req.params.functionalarea;
      const regexPattern = new RegExp(`^${startingWords}`, "i");
      const newCity = await FunctionalArea.find({ value: { $regex: regexPattern } });
      res.send(newCity);
   
    } catch (error) {
      res.send(error.message);
    }
  });
  
module.exports = functionalAreaRoutes;