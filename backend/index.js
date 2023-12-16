const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const xlsx = require("xlsx");

// Set limit to 10mb (or your desired limit)
app.use(bodyParser.json({ limit: '10mb' }));

const axios = require("axios");

app.use(cors({ origin:"http://localhost:3000"}));

const multer = require("multer");
const mongoose = require("mongoose");
const userRoutes = require("./routes/surveyRoutes/userRoutes");
const cityRoutes = require("./routes/dropdownRoutes/cityRoutes");
const reasonRoutes = require("./routes/surveyRoutes/reasonRoutes");
const connectionRoutes = require("./routes/surveyRoutes/connectionRoutes");
const relationRoutes = require("./routes/surveyRoutes/relationRoutes");
const savingsRoutes = require("./routes/surveyRoutes/savingRoutes");
const marketingRoutes = require("./routes/surveyRoutes/marketingRoutes");
const industryRoutes = require("./routes/dropdownRoutes/industryRoutes");
const functionalAreaRoutes = require("./routes/dropdownRoutes/functionalAreaRoutes");
const designationRoutes = require("./routes/dropdownRoutes/designationRoutes");
const skillsRoutes = require("./routes/dropdownRoutes/skillsRoutes");
const surveyRoutes = require("./routes/surveyRoutes/surveyDetailsRoutes");
const hrRoutes = require("./routes/dropdownRoutes/hrRoutes");
const ichpRoutes = require("./routes/ichp/ichpUser");
const iuRoutes = require("./routes/iu/iuRoutes");
const companyRoutes = require("./routes/company/companyRoutes");
const jobRoutes = require("./routes/job/jobRoutes");
const connectionUserRoutes = require("./routes/connectionPeople/connectionRoutes");
const ichpPost = require("./routes/ichp/ichpPost");

const report = require("./routes/reports/reports");

const Users = require("./models/userSchema");

// admin dashboard.......................................

const users = require("./routes/Admindashboard/listallusers");

const AWS = require("aws-sdk");

const multerS3 = require("multer-s3");

const upload = multer({ storage: multer.memoryStorage() });

const User = require("./models/userSchema");

const http = require("http");

const Education = require("./models/education");

const College = require("./models/collage");

if (!process.env.bucketname || !process.env.IP_ADDRESS) {
  throw new Error("bucketname is missing.");
}

AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: "ap-south-1", // Specify the AWS region
});

const s3 = new AWS.S3();

// const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: process.env.IP_ADDRESS,
  },
});

mongoose.set("strictQuery", true);

mongoose
  .connect(process.env.DB_URL)
  .then((res) => console.log("database connected"))
  .catch((err) => console.log(err.message + "err"));
app.use(express.json());
app.use(bodyParser.json());

// const http = require('http').Server(app);

// Create an adminSocket with the '/noteschannelforadmin' namespace
// Create an adminSocket with the '/noteschannelforadmin' namespace
const adminSocket = io.of("/noteschannelforadmin");

// Handling admin's connection
adminSocket.on("connection", (socket) => {
  socket.on("subscribeToUpdates", (userIDs) => {
    if (Array.isArray(userIDs)) {
      // Use the spread operator to join multiple rooms
      userIDs.forEach((userID) => {
        socket.join(userID);
      });
    }
  });
});

// Regular socket for non-admin users
io.on("connection", (socket) => {
  socket.on("subscribeToUpdates", (userID) => {
    socket.join(userID);
  });

  socket.on("unsubscribeFromUpdates", (userID) => {
    socket.leave(userID);
  });
});

// Create a change stream for both admin and regular users
const changeStream = User.watch();

changeStream.on("change", async (change) => {
  try {
    const updatedData = await User.findById(change.documentKey._id);

    if (updatedData) {
      // Emit changes to the respective room in the adminSocket
      adminSocket.to("noteschannelforadmin").emit("noteUpdated", {
        updateddata: updatedData,
      });

      if (updatedData.alerts && updatedData.alerts.length > 0) {
        // Emit changes to the respective room in the regular socket
        io.to(change.documentKey._id.toString()).emit(
          "dataUpdated",
          updatedData.alerts
        );
      }
    }
  } catch (error) {
    console.error("Error fetching updated data:", error);
  }
});

app.use(
  cors({
    origin: ["https://karands.com", "https://api-preprod.phonepe.com","http://localhost:3000","http://karands.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-verify"],
  })
);

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.send("hi");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const fileContent = req.file.buffer;
  const contentType = req.file.mimetype;

  const fileName = req.file.originalname;

  const uploadParams = {
    Bucket: process.env.bucketname,

    Key: `useFolder/${req.body.email}/messagefiles/${fileName}`,

    Body: fileContent, // Assuming you're using multer's memory storage
    ContentType: contentType,
  };

  const uploadParams2 = {
    Bucket: process.env.bucketname,

    Key: `messagefiles_sender/${req.body.email}/${fileName}`,

    Body: fileContent, // Assuming you're using multer's memory storage
    ContentType: contentType,
  };

  const uploadResponse = await s3.putObject(uploadParams).promise();

  const uploadResponse2 = await s3.putObject(uploadParams2).promise();

  res.json({ imagePath: req.file.originalname });
});

// not in use.........................................................................

// const createConversationsFolders = (userid, recipient) => {
//   const conversationsPath = path.join(__dirname, 'conversations');
//   if (!fs.existsSync(conversationsPath)) {
//     fs.mkdirSync(conversationsPath);
//   }

//   const senderFolderPath = path.join(conversationsPath, userid);
//   if (!fs.existsSync(senderFolderPath)) {
//     fs.mkdirSync(senderFolderPath);
//   }

//   const recipientFolderPath = path.join(conversationsPath, recipient);
//   if (!fs.existsSync(recipientFolderPath)) {
//     fs.mkdirSync(recipientFolderPath);
//   }
// };

// // Function to append a message to a conversation file
// const appendMessageToFile = (filename, message) => {
//   fs.appendFile(filename, message, (err) => {
//     if (err) {
//       console.error('Error writing to file:', err);
//     }
//   });
// };

// not in use.........................................................................

// Socket.io connection handling................

io.on("connection", (socket) => {
  console.log("A user connected");

  // Listen for 'userid' event from frontend to associate with the socket
  socket.on("userid", (userid) => {
    socket.userid = userid;
  });

  socket.on("message", async (data) => {
    const { recipient, content, userid, recipientname } = data;

    if (!userid || !recipient) {
      return;
    }

    const senderFilename = `${recipient}.txt`;
    const recipientFilename = `${userid}.txt`;

    const timestamp = new Date().toISOString();

    const senderMessage = `[${timestamp}] Me: ${content}\n`;

    const recipientMessage = `[${timestamp}] ${recipientname}: ${content}\n`;

    const conversationsBucket = process.env.bucketname;

    // Retrieve existing content from S3, append new messages, and upload updated content
    try {
      const senderObject = await s3
        .getObject({
          Bucket: conversationsBucket,
          Key: `conversations/${userid}/${senderFilename}`,
        })
        .promise();

      const recipientObject = await s3
        .getObject({
          Bucket: conversationsBucket,
          Key: `conversations/${recipient}/${recipientFilename}`,
        })
        .promise();

      const updatedSenderContent =
        senderObject.Body.toString("utf-8") + senderMessage;

      const updatedRecipientContent =
        recipientObject.Body.toString("utf-8") + recipientMessage;

      await s3
        .putObject({
          Bucket: conversationsBucket,
          Key: `conversations/${userid}/${senderFilename}`,
          Body: updatedSenderContent,
        })
        .promise();

      await s3
        .putObject({
          Bucket: conversationsBucket,
          Key: `conversations/${recipient}/${recipientFilename}`,
          Body: updatedRecipientContent,
        })
        .promise();

      io.to(socket.id).emit("message", senderMessage);
      io.to(recipient).emit("message", recipientMessage);
    } catch (error) {
      console.error("Error handling message:", error);
      // Handle error response if necessary
    }
  });

  socket.on("image", async (data) => {
    const { recipient, imagePath, userid, recipientname } = data;

    console.log(data);

    // Ensure both sender and recipient have userids
    if (!userid || !recipient) {
      return;
    }

    const senderFilename = `${recipient}.txt`;
    const recipientFilename = `${userid}.txt`;

    const timestamp = new Date().toISOString();

    const senderMessage = `[${timestamp}] Me: ${imagePath}\n`;

    const recipientMessage = `[${timestamp}] ${recipientname}: ${imagePath}\n`;

    const conversationsBucket = process.env.bucketname;

    // Retrieve existing content from S3, append new messages, and upload updated content

    try {
      const senderObject = await s3
        .getObject({
          Bucket: conversationsBucket,
          Key: `conversations/${userid}/${senderFilename}`,
        })
        .promise();

      const recipientObject = await s3
        .getObject({
          Bucket: conversationsBucket,
          Key: `conversations/${recipient}/${recipientFilename}`,
        })
        .promise();

      const updatedSenderContent =
        senderObject.Body.toString("utf-8") + senderMessage;
      const updatedRecipientContent =
        recipientObject.Body.toString("utf-8") + recipientMessage;

      await s3
        .putObject({
          Bucket: conversationsBucket,
          Key: `conversations/${userid}/${senderFilename}`,
          Body: updatedSenderContent,
        })
        .promise();

      await s3
        .putObject({
          Bucket: conversationsBucket,
          Key: `conversations/${recipient}/${recipientFilename}`,
          Body: updatedRecipientContent,
        })
        .promise();

      // Emit the image path to both the sender and the recipient
      io.to(socket.id).emit("image", { sender: "Me", imagePath });
      io.to(recipient).emit("image", { sender: userid, imagePath });
    } catch (error) {
      console.error("Error handling message:", error);
      // Handle error response if necessary
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// call logs/////////////////////////////////////////////////////////////////////  not using................

app.get("/api/folders", (req, res) => {
  console.log("trigerring backend messlogs");

  const conversationFolderPath = path.join(__dirname, "conversations");

  // Read the contents of the "conversation" folder
  fs.readdir(conversationFolderPath, (err, folders) => {
    if (err) {
      console.error("Error reading folder:", err);
      return res.status(500).json({ error: "Error reading folders" });
    }

    // Send the folder names back to the frontend
    res.json({ calllogs: folders });
  });
});

// call logs ver 2.........................................

app.post("/api/textfiles", (req, res) => {
  const folderName = req.body.folderName; // Get the folder name from the request body

  if (!folderName) {
    return res
      .status(400)
      .json({ error: "Folder name is missing in the request body" });
  }

  const prefix = `conversations/${folderName}/`; // Use the prefix to simulate "folder" structure

  const params = {
    Bucket: process.env.bucketname,
    Prefix: prefix,
  };

  // List objects within the specified "folder" in the S3 bucket
  s3.listObjectsV2(params, (err, data) => {
    if (err) {
      console.error("Error listing objects:", err);
      return res
        .status(500)
        .json({ error: "Error listing files in the folder" });
    }

    // Filter only .txt files and send their "key names" back to the frontend
    const txtFiles = data.Contents.filter((object) =>
      object.Key.endsWith(".txt")
    ).map((object) => path.basename(object.Key, ".txt"));

    res.json({ calllogs: txtFiles });
  });
});

// call logs ver 2.........................................

// delete text file in folder of specific user id...............

// app.delete('/api/deletefile', (req, res) => {

//   const folderName = req.body.folderName;
//   const fileName = req.body.fileName;

//   console.log(req.body)

//   if (!folderName || !fileName) {
//     return res.status(400).json({ error: 'Folder name or file name is missing in the request parameters' });
//   }

//   const filePath = path.join(__dirname, 'conversations', folderName, `${fileName}.txt`);

//   // Check if the file exists before deleting
//   fs.access(filePath, fs.constants.F_OK, (err) => {
//     if (err) {
//       console.error('Error accessing file:', err);
//       return res.status(404).json({ error: 'File not found' });
//     }

//     // Delete the file
//     fs.unlink(filePath, (err) => {
//       if (err) {
//         console.error('Error deleting file:', err);
//         return res.status(500).json({ error: 'Error deleting file' });
//       }

//       console.log('File deleted successfully:', filePath);
//       res.json({ message: 'File deleted successfully' });
//     });
//   });
// });

app.delete("/api/deletefile", (req, res) => {
  const folderName = req.body.folderName;
  const fileName = req.body.fileName;

  if (!folderName || !fileName) {
    return res
      .status(400)
      .json({
        error: "Folder name or file name is missing in the request parameters",
      });
  }

  const filePath = `conversations/${folderName}/${fileName}.txt`;

  const params = {
    Bucket: process.env.bucketname,
    Key: filePath,
  };

  // Delete the file object from S3

  s3.deleteObject(params, (err) => {
    if (err) {
      console.error("Error deleting object:", err);
      return res.status(500).json({ error: "Error deleting file" });
    }

    console.log("File deleted successfully:", filePath);
    res.json({ message: "File deleted successfully" });
  });
});

// delete text file in folder of specific user id...............not using...................

function deleteFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    console.log(`Folder "${folderPath}" does not exist.`);
    return;
  }

  const files = fs.readdirSync(folderPath);

  // Recursively delete files and subdirectories inside the folder
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      deleteFolder(filePath);
    } else {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    }
  }

  // Delete the folder itself
  fs.rmdirSync(folderPath);
  console.log(`Deleted folder: ${folderPath}`);
}

app.delete("/api/folders/:folderName", (req, res) => {
  const folderName = req.params.folderName;
  const folderPath = path.join(__dirname, "conversations", folderName);

  if (!fs.existsSync(folderPath)) {
    return res.json({ error: "Folder not found" });
  }

  // Delete the folder recursively
  deleteFolder(folderPath);

  return res.json({ message: "Folder deleted successfully" });
});

// not in use..........................................................

// app.get('/api/messages/:userid/:recipient', (req, res) => {
//   const { userid, recipient } = req.params;

//   // Function to create the conversations folder and user folders if they don't exist
//   const createConversationsFolders = (userid, recipient) => {
//     const conversationsPath = path.join(__dirname, 'conversations');
//     if (!fs.existsSync(conversationsPath)) {
//       fs.mkdirSync(conversationsPath);
//     }

//     const senderFolderPath = path.join(conversationsPath, userid);
//     if (!fs.existsSync(senderFolderPath)) {
//       fs.mkdirSync(senderFolderPath);
//     }

//     const recipientFolderPath = path.join(conversationsPath, recipient);
//     if (!fs.existsSync(recipientFolderPath)) {
//       fs.mkdirSync(recipientFolderPath);
//     }
//   };

//   // Prepare the filename for the conversation file
//   const filename = path.join(__dirname, 'conversations', userid, `${recipient}.txt`);

//   // Check if the folder exists, and create if it doesn't
//   createConversationsFolders(userid, recipient);

//   // Check if the file exists
//   if (!fs.existsSync(filename)) {
//     // File doesn't exist, create it and return an empty response
//     fs.writeFileSync(filename, '', 'utf8'); // Create an empty file
//     return res.json({ messages: [] });
//   }

//   // Read the contents of the file
//   fs.readFile(filename, 'utf8', (err, data) => {

//     if (err) {
//       console.error('Error reading file:', err);
//       // return res.status(500).json({ error: 'Error fetching messages' });
//     }

//     // Split the file contents by lines to get individual messages
//     const messages = data.split('\n').filter(Boolean);
//     // Send the messages back to the frontend
//     res.json({ messages });
//   });
// });

// not in use....................................above code......................

// in use................

app.get("/api/messages/:userid/:recipient", (req, res) => {
  const { userid, recipient } = req.params;

  const userfile = `conversations/${userid}/${recipient}.txt`; // S3 object key

  const recipientfile = `conversations/${recipient}/${userid}.txt`;

  // Fetch the object from S3

  s3.getObject(
    { Bucket: process.env.bucketname, Key: userfile },
    (err, data) => {
      if (err && err.code === "NoSuchKey") {
        // If the object doesn't exist, create an empty file

        s3.putObject(
          { Bucket: process.env.bucketname, Key: userfile, Body: "" },
          (err) => {
            if (err) {
              console.error("Error creating object:", err);
              return res
                .status(500)
                .json({ error: "Error creating messages file" });
            }
            return res.json({ messages: [] }); // Return an empty response
          }
        );

        s3.putObject(
          { Bucket: process.env.bucketname, Key: recipientfile, Body: "" },
          (err) => {}
        );
      } else if (err) {
        console.error("Error reading object:", err);
        return res.status(500).json({ error: "Error fetching messages" });
      } else {
        const messages = data.Body.toString("utf-8")
          .split("\n")
          .filter(Boolean);
        res.json({ messages });
      }
    }
  );
});

app.use("/karands/users", userRoutes);
app.use("/karands/survey", surveyRoutes);
app.use("/karands/reason", reasonRoutes);
app.use("/karands/connection", connectionRoutes);
app.use("/karands/relation", relationRoutes);
app.use("/karands/savings", savingsRoutes);
app.use("/karands/marketing", marketingRoutes);
app.use("/karands/city", cityRoutes);
app.use("/karands/industry", industryRoutes);
app.use("/karands/functionalArea", functionalAreaRoutes);
app.use("/karands/designation", designationRoutes);
app.use("/karands/skills", skillsRoutes);
app.use("/karands/survey", surveyRoutes);
app.use("/karands/hr", hrRoutes);
app.use("/karands/ichp", ichpRoutes);
app.use("/karands/iu", iuRoutes);
app.use("/karands/company", companyRoutes);
app.use("/karands/jobs", jobRoutes);
app.use("/karands/request", connectionUserRoutes);
app.use("/karands/ichpPost", ichpPost);

app.use("/karands/report", report);

app.use("/karands/listusers", users);

// app.use('/uploads', express.static('uploads'));

// app.use('/messagefiles', express.static(path.join(__dirname,'messagefiles')));

app.use(
  "/images",
  (req, res, next) => {
    console.log("Request for image:", req.url);
    next();
  },
  express.static(path.join(__dirname, "htmlimages"))
);

app.get("/", (req, res) => {
  res.send("Hi this is backend");
});

// for payment.....................

function generateUniqueId(prefix) {
  const timestamp = new Date().getTime();
  const random = Math.floor(Math.random() * 10000);
  const uniqueId = (prefix ? prefix + "-" : "") + timestamp + "-" + random;
  return uniqueId;
}

const crypto = require("crypto");









app.post("/phonepe", async (req, res) => {
  try {
    const data = {
      merchantId: "M18MKETAFZWW",
      merchantTransactionId: generateUniqueId("MT"),
      merchantUserId: generateUniqueId("MTU"),
      amount: 100,
      redirectUrl: `https://localhost:8080/paymentstatus/${req.body.userId}`,
      redirectMode: "POST",
      callbackUrl: "https://localhost:3000/callbackPage",
      mobileNumber: "9381264049",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const encode = Buffer.from(JSON.stringify(data)).toString("base64");

    const saltKey = "e9cad0d4-3f72-40dd-849d-2b4ee9d2a1e8";
    const saltIndex = 1;

    const string = `${encode}/pg/v1/pay${saltKey}`;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const finalXHeader = `${sha256}###${saltIndex}`;

    const response = await axios.post(
      "https://api.phonepe.com/apis/hermes/pg/v1/pay",
      {
        request: encode,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": finalXHeader,
          accept: "application/json",
        },
      }
    );

    const responseData = response.data;

    // Redirect to the response URL
    const redirectURL = responseData.data.instrumentResponse.redirectInfo.url;

    // res.redirect(redirectURL); // Redirect the user to PhonePe's payment page

    res.json(responseData.data.instrumentResponse.redirectInfo.url);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});








const moment = require("moment"); // Import the moment library for date formatting










// app.post('/paymentstatus/:userId', async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     // Perform any necessary actions for a successful payment here

//     // Store the transaction ID in MongoDB only if the payment is successful
//     if (req.body.transactionId && req.body.code === "PAYMENT_SUCCESS") {

//       const formattedDate = moment().format('DD/MM/YY');

//       // Check if the job already has an 'expirejob' field
//       const user = await Users.find({_id:userId});

//       if (!user) {
//         return res.status(404).json({
//           status: "Error",
//           message: "Job not found"
//         });
//       }

//       // If 'expirejob' doesn't exist, create it
//       if (!user.subscriptiondetails) {
//         user.subscriptiondetails = {};
//       }

//    // Update the job with the formatted date and status

//    user.subscriptiondetails.transactionId = req.body.transactionId;

//    user.subscriptiondetails.transactionDate = formattedDate;

//    const updatedJobDetails = await user.save();

//       // const transaction = await Users.findByIdAndUpdate(
//       //   { _id: userId },
//       //   { $set:{'subscriptiondetails.transactionId': req.body.transactionId,'subscriptiondetails.transactionDate':} }
//       // );

//       // Redirect the user to a thank you page

//       if(updatedJobDetails){
//         return res.redirect('https://karandszone.com/paymentsuccess');

//       }

//       return res.redirect('https://karandszone.com/paymenterror');
//     }

//     // If payment is not successful, redirect the user to an error page
//     return res.redirect('https://karandszone.com/paymenterror');
//   } catch (error) {
//     console.error('Error processing payment success:', error);
//     // Handle errors and redirect to an error page
//     return res.redirect('https://karandszone.com/paymenterror');
//   }
// });

//payment status......................................................................

app.post("/paymentstatus/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    if (req.body.transactionId && req.body.code === "PAYMENT_SUCCESS") {
      const formattedDate = moment().format("DD/MM/YY");

      // Parse the original date and add 1 year to calculate the expiry date
      const expiryDate = moment(formattedDate, "DD/MM/YY")
        .add(1, "years")
        .subtract(1, "day");
      const formattedExpiryDate = expiryDate.format("DD/MM/YY");

      // Find the user by ID
      const user = await Users.findById(userId);

      if (!user) {
        return res.status(404).json({
          status: "Error",
          message: "User not found",
        });
      }

      // If 'subscriptiondetails' doesn't exist, create it
      if (!user.subscriptiondetails) {
        user.subscriptiondetails = {};
      }

      // Update the subscription details
      user.subscriptiondetails.transactionId = req.body.transactionId;
      user.subscriptiondetails.transactionDate = formattedDate;
      user.subscriptiondetails.expiryDate = formattedExpiryDate;

      // Save the updated user
      await user.save();

      // Redirect the user to a thank you page
      return res.redirect("https://localhost:3000/paymentsuccess");
    }

    // If payment is not successful, redirect the user to an error page
    return res.redirect("https://localhost:3000/paymenterror");
  } catch (error) {
    console.error("Error processing payment success:", error);
    // Handle errors and redirect to an error page
    return res.redirect("https://localhost:3000/paymenterror");
  }
});

const Job = require("./models/jobs/jobSchema");

app.get("/downloadjos", async (req, res) => {
  try {
    const jobs = await Job.find({});

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// download users..............................

app.get("/downloadusers", async (req, res) => {
  try {
    const jobs = await Users.find({});

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// insert document..................

// app.get('/uploadusers', async (req, res) => {

//   console.log("ckjsndjc")

//   try {
//     const filePath = path.resolve(__dirname,'userlists.xlsx');

//     console.log('File path:', filePath);

//     // Read Excel data and convert to JSON
//     const workbook = xlsx.readFile(filePath);

//     const worksheet = workbook.Sheets['Sheet1']; // Replace with your sheet name

//     const jsonData = xlsx.utils.sheet_to_json(worksheet);

// Users.insertMany(jsonData, (err, result) => {

//   if (err) {
//     console.error(err);
//     return;
//   }

//   console.log('Data inserted successfully:', result);

//   res.json({ 'Data inserted successfully:': jsonData })
// }

// )

//     res.json( jsonData )

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

app.get("/uploadusers", async (req, res) => {
  console.log("Reading JSON file...");

  try {
    const filePath = path.resolve(__dirname, "USERS.json");
    console.log("File path:", filePath);

    // Read the JSON data from the file
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // Remove _id from each object in the JSON data
    const modifiedData = jsonData.map((item) => {
      const { _id, ...rest } = item;
      return rest;
    });
    // Insert the modified data into your MongoDB collection

    await Users.insertMany(modifiedData);

    res.send(modifiedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// validate email wheather user their are not........................


app.post("/validateuser", async (req, res) => {
  const email = req.body.email;

  try {
    const users = await Users.find({ email: email });

    if (users.length > 0) {
      res.send(true);
    } else {
      res.send(false); // Return "false" if no user is found
    }
  } catch (error) {
    res.status(500).json({ error }); // Return a 500 status code for other errors
  }
})




// validate otp........................................................................

app.post("/validateotp", async (req, res) => {
  const email = req.body.email;
  const otp = req.body.emailotp;

  try {
    const users = await Users.find({ email: email });

    let isOtpValid = false;

    // Loop through the users array to check if any user has a matching OTP
    for (const user of users) {
      if (user.emailotp === otp) {
        isOtpValid = true;
        break; // Break the loop when a matching OTP is found
      }
    }

    res.send(isOtpValid);
  } catch (error) {
    res.status(500).json({ error }); // Return a 500 status code for other errors
  }
});

// upload educationa details.........................

app.get("/uploadeducation", async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, "education.xlsx");
    console.log("File path:", filePath);

    // Read Excel data and convert to JSON
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets["Sheet1"]; // Replace with your sheet name
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    for (const item of jsonData) {
      // Iterate through each degree and its corresponding course
      for (const [degree, course] of Object.entries(item)) {
        // Check if degree and course are defined and not null
        if (
          degree &&
          course &&
          typeof degree === "string" &&
          typeof course === "string"
        ) {
          const trimmedDegree = degree.trim();

          // Find the education record for the degree and update the course
          const educationRecord = await Education.findOneAndUpdate(
            { degree: trimmedDegree },
            { $addToSet: { course: course.trim() } },
            { upsert: true, new: true }
          );

          console.log("Education record updated:", educationRecord);
        }
      }
    }

    res.status(200).json({ message: "Data processed successfully.", jsonData });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// upload collges in data base...................................with excel sheet....................................its working.........................

app.get("/uploadcolleges", async (req, res) => {
  try {
    const filePath = path.resolve(__dirname, "colleges.xlsx");
    console.log("File path:", filePath);

    // Read Excel data and convert to JSON
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets["Sheet1"]; // Replace with your sheet name
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    // Iterate through each college entry in the JSON data
    for (const collegeEntry of jsonData) {
      const collegeData = {
        name: collegeEntry["Name of University"], // Assuming your JSON key is 'Name of University'
        type: collegeEntry["Type"], // Assuming your JSON key is 'Type'
      };

      // Create a new college record in the database
      const collegeRecord = await College.create(collegeData);
      console.log("College record created:", collegeRecord);
    }

    res.status(200).json({ message: "Data processed successfully." });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// api for getting all colleges names...........

app.get("/getcollegenames", async (req, res) => {
  try {
    const collegedata = await College.find({});

    res.status(200).send(collegedata);
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get qualification////////////////////.....................................................................................................

app.get("/getdegrees", async (req, res) => {
  try {
    const degrees = await Education.find({});

    res.status(200).json({ degrees: degrees });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// get course with degree...........................................................//..................................................

app.get("/getcourse/:degree", async (req, res) => {
  try {
    let degrees;

    degrees = await Education.findOne({ degree: req.params.degree });

    if (!degrees) {
      return res.status(404).json({ error: "Degree not found" });
    }

    res.status(200).json({ data: degrees.course });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// api to verify pan card.....................................................................................

// app.post("/verifypancard", async (req, res) => {
//   const { pancardnumber, userid } = req.body;

//   try {
//     const zoopOptions = {
//       method: "POST",
//       url: "https://test.zoop.one/api/v1/in/identity/pan/lite",
//       headers: {
//         "api-key": "P3C6NEG-7RGMBVB-JDRKB6G-Q4MY1MH",
//         "app-id": "64f9b50cad1d000028fa7188",
//         "Content-Type": "application/json",
//       },
//     };

//     const zoopData = {
//       data: {
//         customer_pan_number: pancardnumber,
//         consent: "Y",
//         consent_text:
//           "I hereby declare my consent agreement for fetching my information via ZOOP API.",
//       },
//       task_id: "f26eb21e-4c35-4491-b2d5-41fa0e545a34",
//     };

//     const zoopResponse = await axios.post(zoopOptions.url, zoopData, {
//       headers: zoopOptions.headers,
//     });

//     console.log("ZOOP API response", zoopResponse.data);

//     if (zoopResponse.data.result) {
//       const userdata = await Users.findById(userid);

//       if (userdata.fullName === zoopResponse.data.result.user_full_name) {
//         const updateObj = {
//           $set: {
//             "panCardverified.status": true,
//             "panCardverified.data": zoopResponse.data.result,
//           },
//         };

//         const user = await Users.findByIdAndUpdate(userid, updateObj, {
//           new: true,
//         });

//         if (!user.panCardverified) {
//           user.panCardverified = {
//             status: true,
//             data: zoopResponse.data.result,
//           };
//           await user.save();
//         }

//         return res.send(user);
//       } else {
//         return res.status(500).send("Name does not match with the PAN card.");
//       }
//     } else {
//       return res.status(500).send("Failed to verify PAN card.");
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.post("/verifypancard", async (req, res) => {
  const { pancardnumber, userid } = req.body;

  try {
    const zoopOptions = {
      method: "POST",
      url: "https://test.zoop.one/api/v1/in/identity/pan/lite",
      headers: {
        "api-key": "P3C6NEG-7RGMBVB-JDRKB6G-Q4MY1MH",
        "app-id": "64f9b50cad1d000028fa7188",
        "Content-Type": "application/json",
      },
    };

    const zoopData = {
      data: {
        customer_pan_number: pancardnumber,
        consent: "Y",
        consent_text:
          "I hereby declare my consent agreement for fetching my information via ZOOP API.",
      },
      task_id: "f26eb21e-4c35-4491-b2d5-41fa0e545a34",
    };

    const zoopResponse = await axios.post(zoopOptions.url, zoopData, {
      headers: zoopOptions.headers,
    });

    console.log("ZOOP API response", zoopResponse.data);

    if (zoopResponse.data.result) {
      const userdata = await Users.findById(userid);


    // Create a regex for flexible matching of names
    const nameParts = userdata.fullName.split(/\s+/).map(part => `(?=.*${part})`);
    const regexFullName = new RegExp(`^${nameParts.join('')}`, 'i');

    if (regexFullName.test(zoopResponse.data.result.user_full_name)) {

        // Names match, proceed with verification
        const updateObj = {
          $set: {
            "panCardverified.status": true,
            "panCardverified.data": zoopResponse.data.result,
          },
        };

        const user = await Users.findByIdAndUpdate(userid, updateObj, {
          new: true,
        });

        if (!user.panCardverified) {
          user.panCardverified = {
            status: true,
            data: zoopResponse.data.result,
          };
          await user.save();
        }

        return res.send(user);
      } else {
        return res.status(500).send("Name does not match with the PAN card.");
      }
    } else {
      return res.status(500).send("Failed to verify PAN card.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});







// api to send otp for adhar card verify.................

app.post("/sendotpforadhar", async (req, res) => {
  const adharcardnumber = req.body.adharcardnumber;

  try {
    const options = {
      method: "POST",
      url: "https://test.zoop.one/in/identity/okyc/otp/request",
      headers: {
        "api-key": "P3C6NEG-7RGMBVB-JDRKB6G-Q4MY1MH",
        "app-id": "64f9b50cad1d000028fa7188",
        "org-id": "60800ca35ed0c7001cad2605",
        "Content-Type": "application/json",
      },
    };

    const data = {
      data: {
        customer_aadhaar_number: adharcardnumber,
        consent: "Y",
        consent_text:
          "I hereby declare my consent agreement for fetching my information via ZOOP API.",
      },
      task_id: "f26eb21e-4c35-4491-b2d5-41fa0e545a34",
    };

    const response = await axios.post(options.url, data, {
      headers: options.headers,
    });

    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.send("Internal Server Error");
  }
});

// api to verify adhar card details.....................

app.post("/verifyadharcard", async (req, res) => {
  const adharotp = req.body.adharotp;

  const request_id = req.body.request_id;

  const userid = req.body.userid;

  try {
    const options = {
      method: "POST",
      url: "https://test.zoop.one/in/identity/okyc/otp/verify",
      headers: {
        "api-key": "P3C6NEG-7RGMBVB-JDRKB6G-Q4MY1MH",
        "app-id": "64f9b50cad1d000028fa7188",
        "Content-Type": "application/json",
      },
    };

    const data = {
      data: {
        request_id: request_id,
        otp: adharotp,
        consent: "Y",
        consent_text:
          "I hear by declare my consent agreement for fetching my information via ZOOP API",
      },
      task_id: "f26eb21e-4c35-4491-b2d5-41fa0e545a34",
    };

    const response = await axios.post(options.url, data, {
      headers: options.headers,
    });

    console.log("response", response);

    let userdetailsres;

    if (response.data.result != null || response.data.result != undefined) {
      const updateObj = {
        $set: {
          "aadharCardverified.status": true,
          "aadharCardverified.data": response.data.result,
          fullName: response.data.result.user_full_name,
          DOB: response.data.result.user_dob,
          gender: response.data.result.user_gender === "M" ? "Male" : "Female",
          name: response.data.result.user_full_name,
          city: response.data.result.user_address.loc || "",
          State: response.data.result.user_address.state || "",
          pincode: response.data.result.address_zip,
          flatNum: [
            response.data.result.user_address.house || "",
            response.data.result.user_address.street || "",
            response.data.result.user_address.loc || "",
            response.data.result.user_address.dist || "",
            response.data.result.user_address.state || "",
            response.data.result.user_address.country || "",
          ]
            .filter((part) => !!part)
            .join(", "),
        },
      };

      // Check if panCardverified exists, create if not
      const user = await Users.findByIdAndUpdate(userid, updateObj, {
        new: true,
      });

      if (!user.panCardverified) {
        user.panCardverified = {
          status: "true",
          data: response.data.result,
        };
        await user.save();
      }

      userdetailsres = user;
    }

    res.send(userdetailsres);

    // res.send(response.data)
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// api to verify bank details....

app.post("/verifybankaccount", async (req, res) => {
  const { bankaccountnumber, ifsc, userid } = req.body;

  try {
    // Call a function to verify bank account
    const verificationResult = await verifyBankAccount(bankaccountnumber, ifsc);

    const useriddetails = await User.findById(userid);

    if (
      verificationResult.result.verification_status == "VERIFIED" &&
      useriddetails
    ) {
      console.log("verified...", verified);

      //push the obecyt inside bankdetails arry in datatbase and make this as unique

      const bankexist = useriddetails.bankdetails.some((data) => {
        data.bankaccountnumber = bankaccountnumber;
      });

      if (!bankexist) {
        useriddetails.bankdetails.push({
          verificationResult: verificationResult,
          bankaccountnumber: bankaccountnumber,
          ifsc: ifsc,
        });
      }

      await useriddetails.save();
    }

    // Process the verification result as needed
    res.json({ verificationResult });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// function for verifying bank account....................................

const verifyBankAccount = async (bankAccountNumber, ifsc) => {
  const options = {
    method: "POST",
    url: "https://test.zoop.one/api/v1/in/financial/bav/lite",
    headers: {
      "app-id": "64f9b50cad1d000028fa7188",
      "api-key": "5FZDNAZ-SBZ4PA4-KSTGPRN-Q66QSM8",
      "org-id": "abc",
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      mode: "sync",
      data: {
        account_number: bankAccountNumber,
        ifsc: ifsc,
        consent: "Y",
        consent_text:
          "I hereby declare my consent agreement for fetching my information via ZOOP API",
      },
      task_id: "f26eb21e-4c35-4491-b2d5-41fa0e545a34",
    }),
  };

  try {
    const response = await axios(options);
    return response.data; // Assuming the relevant information is in the response data
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Failed to verify bank account");
  }
};

const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
