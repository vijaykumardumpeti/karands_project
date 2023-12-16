const Designation = require("../../models/dropDownSchema/designationSchema");
const designationRoutes = require('express').Router();


designationRoutes.get("/", async (req, res) => {
    try {
       let allDesignation=await Designation.find()
       res.send(allDesignation);
    } catch (error) {
        res.send(error.message)
    }
});



designationRoutes.post("/new",async(req,res)=>{
  const newDesignation=await Designation.create(req.body);
  res.send(newDesignation)
})


designationRoutes.post('/removeDuplicates', async (req, res) => {
  try {
    const result = await Designation.aggregate([
      {
        $group: {
          _id: "$value",
          duplicates: { $addToSet: "$_id" },
          count: { $sum: 1 }
        }
      },
      {
        $match: {
          count: { $gt: 1 }
        }
      }
    ]);

    const duplicateIds = result.flatMap(doc => doc.duplicates.slice(1));

    const deleteResult = await Designation.deleteMany({ _id: { $in: duplicateIds } });

    res.json({ deletedCount: deleteResult.deletedCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

designationRoutes.get("/:designation", async (req, res) => {
    try {
      const startingWords = req.params.designation;
      const regexPattern = new RegExp(`^${startingWords}`, "i");
      const newCity = await Designation.find({ value: { $regex: regexPattern } });
  res.send(newCity);
    } catch (error) {
      res.send(error.message);
    }
  });
module.exports = designationRoutes;