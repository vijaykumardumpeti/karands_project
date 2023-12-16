const Cities = require("../../models/dropDownSchema/citySchema");
const cityRoutes = require("express").Router();
cityRoutes.get("/", async (req, res) => {
  try {
    let allCity = await Cities.find()
    console.log(allCity[49].label);
    res.send(allCity);
  } catch (error) {
    res.send(error.message);
  }
});

cityRoutes.get("/:city", async (req, res) => {
 try {
  const startingWords = req.params.city;
  const regexPattern = new RegExp(`^${startingWords}`, "i");
  const newCity = await Cities.find({ value: { $regex: regexPattern } });
  res.send(newCity);
 } catch (error) {
    res.status(400).json({
      status:'Error Occured',
      details:"Failed"
    })
 }
})
module.exports = cityRoutes;
