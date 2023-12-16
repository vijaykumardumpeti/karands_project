const reportmodal = require("../../models/ichpSchema/reportSchema");

const reportRouter = require("express").Router();

const moment = require("moment");

reportRouter.post("/report", async (req, res) => {
  try {
    const reportres = await reportmodal.create(req.body);

    if (reportres) {
      res.status(200).json({
        result: reportres,
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// get all reports .....................it is used in admin dashboard lists  ...............in use..................

reportRouter.get(
  "/getallreports/:reporttype/:skip?/:limit?",
  async (req, res) => {
    try {
      const reportType = req.params.reporttype;
      const skipCount = parseInt(req.params.skip) || 0;
      const limitCount = parseInt(req.params.limit) || 4;

      const query = {
        reporttype: new RegExp(reportType, "i"), // Using RegExp for case-insensitive search
      };

      const allreports = await reportmodal
        .find(query)
        .skip(skipCount)
        .limit(limitCount);

      if (allreports) {
        res.status(200).json({
          allreports: allreports,
        });
      } else {
        res.status(404).json({
          status: "Failed",
          message: "Reports not found",
        });
      }
    } catch (e) {
      res.status(500).json({
        status: "Failed",
        message: e.message,
      });
    }
  }
);

// taking action on report...............................wheather it is pendinf=g or action taken it has rea son

reportRouter.post("/actionstatuschange", async (req, res) => {
  try {
    const formattedDate = moment().format("DD/MM/YY");
    const { reportId, actiontaken, status } = req.body;

    // Find the report by its ID
    const reportDetails = await reportmodal.findOne({ _id: reportId });

    if (!reportDetails) {
      return res.status(404).json({
        status: "Not Found",
        message: "Report not found",
      });
    }

    // Define the action object
    const action = {
      status: status,
      date: formattedDate,
    };

    // Update actiontaken if it's provided
    if (actiontaken) {
      action.actiontaken = actiontaken;
    }

    // Set the action in reportDetails
    reportDetails.action = action;

    // Save the updated report
    await reportDetails.save();

    // Respond with a success message
    res.status(200).json({
      status: "Success",
      message: "Action status updated successfully",
    });
  } catch (e) {
    // Handle errors
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});

module.exports = reportRouter;
