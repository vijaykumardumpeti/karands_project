const Industry = require("../../models/dropDownSchema/industrySchema");
const industryRoutes = require('express').Router();
industryRoutes.get("/", async (req, res) => {
    try {
       let allIndustry=await Industry.find();
       res.send(allIndustry);
    } catch (error) {
        res.send(error.message)
    }
});

module.exports = industryRoutes;