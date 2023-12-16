const ichpmodal = require("../../models/ichpSchema/ichppostSchema");
const mongoose = require("mongoose");
const ichpPost = require("express").Router();
const Job = require("../../models/jobs/jobSchema");

const Users = require("../../models/userSchema");

const path = require("path");
require("dotenv").config();

const Survey = require("../../models/surveySchemas/surveyDetailSchema");

const multer = require("multer");
const connectionSchema = require("../../models/connection/connectionschema");
const surveyDetailSchema = require("../../models/surveySchemas/surveyDetailSchema");

const AWS = require("aws-sdk");

const multerS3 = require("multer-s3");
const User = require("../../models/userSchema");

const upload = multer({ storage: multer.memoryStorage() });

// Hardcoded values (for troubleshooting purposes)
const accessKeyId = process.env.AccesskeyID;
const secretAccessKey = process.env.Secretaccesskey;

// configu aws.............................................

if (!process.env.AccesskeyID || !process.env.Secretaccesskey) {
  throw new Error("AWS credentials are missing.");
}

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
  region: "ap-south-1", // Specify the AWS region
});

const s3 = new AWS.S3();

// Set up Multer storage and file filter
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// const updateOptions = {
//   new: true, // Return the modified document rather than the original
//   upsert: true, // Create a new document if it doesn't exist
// };

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf' || file.mimetype.startsWith('video/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type.'));
//   }
// };

// const upload = multer({ storage, fileFilter });

// get file with bucket name and file name

ichpPost.get("/get-private-file", async (req, res) => {
  const bucketName = process.env.bucketname;

  const key = req.query.key;

  try {
    const s3Object = await s3
      .getObject({ Bucket: bucketName, Key: key })
      .promise();
      
    res.setHeader("Content-Type", s3Object.ContentType);

    res.send(s3Object.Body);
  } catch (error) {
    res.status(500).send("Error fetching private file");
  }
});








// post part we take ObectId of that person who are ssending post

ichpPost.post("/", upload.single("file"), async (req, res) => {
  const userdata = await Users.find({ _id: req.body.userObectId });
  const reach = req.body.reach;
  let whomToShow;

  if (reach === "Public") {
    const alluserList = await Users.find({
      industry: userdata.industry,
      location: userdata.location,
      skills: { $in: userdata.skills },
    }).select("_id");
    whomToShow = alluserList.map((e) => e._id);
  } else if (reach === "Connections") {
    const alluserList = await connectionSchema
      .findOne({ userId: req.body.userObectId })
      .select("friends");
    whomToShow = alluserList.friends;
  } else if (reach === "Select Objective") {
    const objectiveSurvey = req.body;

    const alluserList = await surveyDetailSchema
      .find({
        or: [
          {
            reason: { $in: objectiveSurvey.reason },
            connection: { $in: objectiveSurvey.connection },
          },
        ],
      })
      .select("userid");
    whomToShow = alluserList.map((e) => {
      if (e.userid) {
        return e.userid.toString();
      }
      return null; // Or any other value you prefer if userid is missing
    });
  }

  try {
    let Postres;

    if (req.file) {
      const { originalname } = req.file;

      Postres = new ichpmodal({
        userObectId: req.body.userObectId,
        name: req.body.name,
        // designation: userdata[0].JobExperience[0].designation,
        email: req.body.email,
        Title: req.body.Title,
        content: req.body.content,
        file: originalname,

        whomToShow: whomToShow,
      });

      await Postres.save();

      const fileContent = req.file.buffer;
      const contentType = req.file.mimetype;

      let fileName = req.file.originalname;

      const uploadParams = {
        Bucket: process.env.bucketname,

        Key: `useFolder/${req.body.email}/uploads/${fileName}`,

        Body: fileContent, // Assuming you're using multer's memory storage
        ContentType: contentType,
      };

      const uploadParams2 = {
        Bucket: process.env.bucketname,

        Key: `uploads/${fileName}`,

        Body: fileContent, // Assuming you're using multer's memory storage
        ContentType: contentType,
      };

      const uploadResponse = await s3.putObject(uploadParams).promise();

      const uploadResponse2 = await s3.putObject(uploadParams2).promise();

      const s3Url = uploadResponse.Location; // The URL of the uploaded object
    }

    if (!req.file) {
      Postres = new ichpmodal({
        userObectId: req.body.userObectId,
        name: req.body.name,
        // designation: userdata[0].JobExperience[0].designation,
        email: req.body.email,
        Title: req.body.Title,
        content: req.body.content,

        whomToShow: whomToShow,
      });

      await Postres.save();
    }

    res.status(200).json({
      status: "Success",
      result: Postres,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// edit post part..............................................

ichpPost.post("/editpost/:postId", upload.single("file"), async (req, res) => {
  const postid = req.params.postId;

  const userdata = await Users.find({ _id: req.body.userObectId });

  const reach = req.body.reach;
  let whomToShow;

  if (reach === "Public") {
    const alluserList = await Users.find({
      industry: userdata.industry,
      location: userdata.location,
      skills: { $in: userdata.skills },
    }).select("_id");
    whomToShow = alluserList.map((e) => e._id);
  } else if (reach === "Connections") {
    const alluserList = await connectionSchema
      .findOne({ userId: req.body.userObectId })
      .select("friends");
    whomToShow = alluserList.friends;
  } else if (reach === "Select Objective") {
    const objectiveSurvey = req.body;

    const alluserList = await surveyDetailSchema
      .find({
        or: [
          {
            reason: { $in: objectiveSurvey.reason },
            connection: { $in: objectiveSurvey.connection },
          },
        ],
      })
      .select("userid");
    whomToShow = alluserList.map((e) => {
      if (e.userid) {
        return e.userid.toString();
      }
      return null; // Or any other value you prefer if userid is missing
    });
  }

  try {
    let postdata = await ichpmodal.findById(postid);

    if (req.file) {
      const { originalname } = req.file;

      (postdata.userObectId = req.body.userObectId),
        (postdata.name = req.body.name),
        // designation: userdata[0].JobExperience[0].designation,
        (postdata.email = req.body.email),
        (postdata.Title = req.body.Title),
        (postdata.content = req.body.content),
        (postdata.file = originalname),
        (postdata.whomToShow = whomToShow),
        await postdata.save();

      const fileContent = req.file.buffer;
      const contentType = req.file.mimetype;

      let fileName = req.file.originalname;

      const uploadParams = {
        Bucket: process.env.bucketname,

        Key: `useFolder/${req.body.email}/uploads/${fileName}`,

        Body: fileContent, // Assuming you're using multer's memory storage
        ContentType: contentType,
      };

      const uploadParams2 = {
        Bucket: process.env.bucketname,

        Key: `uploads/${fileName}`,

        Body: fileContent, // Assuming you're using multer's memory storage
        ContentType: contentType,
      };

      const uploadResponse = await s3.putObject(uploadParams).promise();

      const uploadResponse2 = await s3.putObject(uploadParams2).promise();

      const s3Url = uploadResponse.Location; // The URL of the uploaded object
    }

    if (!req.file) {
      (postdata.userObectId = req.body.userObectId),
        (postdata.name = req.body.name),
        // designation: userdata[0].JobExperience[0].designation,
        (postdata.email = req.body.email),
        (postdata.Title = req.body.Title),
        (postdata.content = req.body.content),
        (postdata.whomToShow = whomToShow),
        await postdata.save();
    }

    res.status(200).json({
      status: "Success",
      result: postdata,
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// get all details part.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

ichpPost.get("/", async (req, res) => {
  try {
    const result = await ichpmodal.find().lean().sort({ createdAt: "-1" });

    if (result) {
      res.status(200).json({
        result: result,
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

//   get post ..........................v1...................................................................

// ichpPost.get("/getPost/:skip/:id", async (req, res) => {
//   try {

//     const skip = req.params.skip === 0 ? 0 : parseInt(req.params.skip) * 5

//     let result = await ichpmodal.find({ whomToShow: { $in: req.params.id } }).sort({_id:-1}).skip(skip).limit(5)

//     const userDetails = await Users.findOne({ _id: req.params.id });

//     const userSurvey = await Survey.findOne({ userid: req.params.id });

//     let alljobs;

//     if (userSurvey.reason !== "Looking for job" || userSurvey.reason === "") {

//       alljobs = await Job.find(
//         {
//           location: userDetails.location,
//           industry: userDetails.industry,
//           requiredSkills: { $in: userDetails.skills },
//           whomToShow: "Public"
//         }
//       ).sort({_id:-1}).skip(skip).limit(5);

//     }

//     else {

//       alljobs = await Job.find(
//         {
//           location: userDetails.location,
//           industry: userDetails.industry,
//           requiredSkills: { $in: userDetails.skills }
//         }
//       ).sort({_id:-1}).skip(skip).limit(5)

//     }

//     if(result.length===0){

//       const allUserDetails=await Users.find({location:userDetails.location}).select("_id");

//       const filteringThings=allUserDetails.map(e=>e._id);

//       result=await ichpmodal.find({userObectId:{$in:filteringThings}});

//     }

//     if (result && alljobs) {

//       res.status(200).json({

//         result: [...result, ...alljobs],

//       })
//     } else if (result) {
//       res.status(200).json({

//         result: [...result]
//       })
//     }
//     else if (alljobs) {

//       res.status(200).json({

//         result: [...alljobs]
//       })

//     }

//   }
//   catch (e) {

//     res.status(400).json({
//       status: "Failed",
//       message: e.message,
//     });
//   }
// }
// )

// getting post ...................v2........................................................................................

function removeDuplicates(array) {
  return array.reduce((acc, post) => {
    if (!acc.find((item) => item._id.toString() === post._id.toString())) {
      acc.push(post);
    }
    return acc;
  }, []);
}

ichpPost.get("/getPost/:skip/:id", async (req, res) => {
  try {
    const skip = req.params.skip === "0" ? 0 : parseInt(req.params.skip) * 5;

    let result = await ichpmodal
      .find({ whomToShow: { $in: req.params.id } })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(5);

    console.log("result", result);

    const userDetails = await Users.findOne({ _id: req.params.id });
    if (!userDetails) {
      // Handle the case where userDetails is null
      // You may want to set a default value or return an error response
      return res.status(400).json({
        status: "Failed",
        message: "User details not found",
      });
    }

    const userSurvey = await Survey.findOne({ userid: req.params.id });

    if (!userSurvey) {
      // Handle the case where userSurvey is null
      // You may want to set a default value or return an error response
      return res.status(400).json({
        status: "Failed",
        message: "User survey data not found",
      });
    }

    let alljobs;

    if (userSurvey.reason !== "Looking for a job" || userSurvey.reason === "") {
      alljobs = await Job.find({
        location: userDetails.location,
        industry: userDetails.industry,
        requiredSkills: { $in: userDetails.skills },
        whomToShow: "Public",
      })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(5);
    } else {
      alljobs = await Job.find({
        location: userDetails.location,
        industry: userDetails.industry,
        requiredSkills: { $in: userDetails.skills },
      })
        .sort({ _id: -1 })
        .skip(skip)
        .limit(5);
    }

    if (result.length === 0) {
      const allUserDetails = await Users.find({
        location: userDetails.location,
      }).select("_id");
      const filteringThings = allUserDetails.map((e) => e._id);
      result = await ichpmodal.find({ userObectId: { $in: filteringThings } });
    }

    // Combine the arrays without duplicates
    const uniqueResult = removeDuplicates(result);
    const uniqueAllJobs = removeDuplicates(alljobs);

    res.status(200).json({
      result: [...uniqueResult, ...uniqueAllJobs],
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// liking the post,,,,,,,,,,,,,,,,,,,,,,,,,,,,/////,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

ichpPost.post("/like/:postId", async (req, res) => {
  const postId = req.params.postId;

  const { userId, name, email } = req.body;

  // console.log(postId,userId,name,email)

  console.log(req.body, "req.body", postId, "postId");

  try {
    if (userId) {
      // with user id i what to fins dsignation.............................

      const designation = await Users.find({ _id: userId });

      // console.log("users=====",designation)

      const Designation = designation[0].designation;

      // console.log("designation",designation[0].designation)

      const updatedlikes = await ichpmodal.findOneAndUpdate(
        { _id: postId, "likes.userId": { $ne: userId } },
        { $addToSet: { likes: { userId, name, email, Designation } } },
        { new: true }
      );

      if (updatedlikes) {
        res.status(200).json({
          result: updatedlikes,
        });
      }
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// commenting the post,,,,,,,,,,,,,,,,,,,,,,,,,,,,/////,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

ichpPost.post("/comment/:postId", async (req, res) => {
  const postId = req.params.postId;

  const { userId, name, email } = req.body;

  const comment = req.body.comment;

  // console.log(req.body,postId)

  try {
    if (userId) {
      const updatedcomments = await ichpmodal.findOneAndUpdate(
        { _id: postId },
        { $push: { comments: { userId, name, email, comment } } },
        { new: true }
      );

      if (updatedcomments) {
        res.status(200).json({
          result: updatedcomments,
        });
      }
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// nested comments to the post,,,,,,,,,,,,,,,,,,,,,,,,,,,,/////,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

// collection.updateOne(

//   { _id: "post_id", "comments._id": "comment_id_1" },
//   { $push: { "comments.$.nestedComments": { _id: "nested_comment_id_3", text: "New Nested Comment" } } }
// );

ichpPost.post("/nestedcomment/:postId", async (req, res) => {
  // console.log(req.body)

  const postId = req.params.postId;

  const { userId, name, email } = req.body;

  const comment = req.body.comment;

  const commentId = req.body.commentId;

  try {
    if (userId) {
      const updatedcomments = await ichpmodal.updateOne(
        { _id: postId, "comments._id": commentId },
        {
          $push: {
            "comments.$.nestedComments": { userId, name, email, comment },
          },
        }
      );

      // console.log(updatedcomments)

      if (updatedcomments) {
        res.status(200).json({
          result: updatedcomments,
        });
      }
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// nested comments to the post,,,,,,,,,,,,,,,,,,,,,,,,,,,,/////,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

// get all comments limit to 10...........................

ichpPost.get("/comment/:postId/:slice", async (req, res) => {
  const postId = req.params.postId;

  const slice = parseInt(req.params.slice);

  // console.log(postId,slice)

  try {
    const comments = await ichpmodal.findById(
      { _id: postId },
      { comments: { $slice: slice } }
    );

    if (comments) {
      res.status(200).json({
        result: comments.comments,
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

//  get all likes part in array form........to frontend ......................................................

ichpPost.get("/like/:postId", async (req, res) => {
  const postId = req.params.postId;

  // const slice=parseInt(req.params.slice)

  try {
    const likes = await ichpmodal.findById({ _id: postId });

    if (likes) {
      res.status(200).json({
        result: likes.likes,
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// delete the post....................POST........

ichpPost.delete("/delete/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const delres = await ichpmodal.findByIdAndDelete({ _id: postId });

    if (delres) {
      res.status(200).json({
        result: delres,
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// edit the post part using post id ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,it is used in edit post.......
ichpPost.post("/edit/:postId", upload.single("file"), async (req, res) => {
  const postId = req.params.postId;

  try {
    if (req.file) {
      const { originalname } = req.file;

      const data = {
        name: req.body.name,
        Title: req.body.Title,
        content: req.body.content,
        file: originalname,
        reach: req.body.reach,
      };

      const post = await ichpmodal.findByIdAndUpdate({ _id: postId }, data);

      if (post) {
        res.status(200).json({
          status: "Success",
        });
      } else {
        res.status(404).json({
          status: "Not Found",
          message: "Post not found",
        });
      }
    } else {
      const data = {
        Title: req.body.Title,
        content: req.body.content,
        reach: req.body.reach,
      };

      const post = await ichpmodal.findByIdAndUpdate({ _id: postId }, data);

      if (post) {
        res.status(200).json({
          status: "Success",
        });
      } else {
        res.status(404).json({
          status: "Not Found",
          message: "Post not found",
        });
      }
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// delete the Comment....................Comment........ using $pull

ichpPost.post("/deletecomment/:postId", async (req, res) => {
  const postId = req.params.postId;

  const commentId = req.body.commentId;

  // console.log(req.body)

  try {
    const updatedPost = await ichpmodal.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true } // Return the updated post after the operation
    );

    if (!updatedPost) {
      return res.json({ error: "Post not found" });
    }

    return res.json("deleted sucesfully");
  } catch (error) {
    return res.status(500).json({ error: "Error deleting comment" });
  }
});

// edit the content in comment ,,,,,,,,,,,,,,,,,.....................with post id and comment id

ichpPost.post("/editcomment/:postId", async (req, res) => {
  const postId = req.params.postId;

  const commentId = req.body.commentId;

  const content = req.body.content;

  try {
    // Find the post by its _id
    const post = await ichpmodal.findById({ _id: postId });

    if (!post) {
      return res.json({ error: "Post not found" });
    }

    // Find the comment in the comments array by its _id
    const commentToUpdate = post.comments.find(
      (comment) => comment._id.toString() === commentId
    );

    // console.log(commentToUpdate)

    if (!commentToUpdate) {
      return res.json({ error: "Comment not found" });
    }

    // Update the content of the comment
    commentToUpdate.comment = content;

    // Save the updated post
    await post.save();

    res.json(commentToUpdate);
  } catch (error) {
    res.status(500).json({ error: "Error updating comment" });
  }
});

// get post by id..............   ........it is used in edit post......

ichpPost.get("/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const result = await ichpmodal.findOne({ _id: postId });

    if (result) {
      res.status(200).json({
        result: result,
      });
    } else {
      res.status(404).json({
        status: "Not Found",
        message: "Post not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// make all likes to blue.............

ichpPost.get("/likestoblue/:postId", async (req, res) => {
  const postId = req.params.postId;

  try {
    const result = await ichpmodal.find({ _id: postId });

    if (result) {
      res.status(200).json({
        result: result.likes,
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// liking the comment.......................................................................

ichpPost.post("/likecomment/:postId", async (req, res) => {
  const postId = req.params.postId;

  const { userId, name, email, commentId } = req.body;

  // console.log(postId,req.body)

  try {
    // Find the post by post ID
    const post = await ichpmodal.findById(postId);

    if (!post) {
      return res.json({ message: "Post not found" });
    }

    // Find the specific comment by comment ID
    const comment = post.comments.find((c) => c._id.toString() === commentId);

    if (!comment) {
      return res.json({ message: "Comment not found" });
    }

    // Check if the user has already liked the comment
    const existingLike = comment.likes.find((like) => like.userId === userId);

    if (existingLike) {
      return res
        .status(400)
        .json({ message: "You have already liked this comment" });
    }

    // Add the like to the comment's 'likes' array
    comment.likes.push({ userId, name, email });

    // Save the updated post
    await post.save();

    res.status(200).json({ message: "Comment liked successfully" });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

ichpPost.get("/listofallposts/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const limit = req.params.limit;
    const limitCount = parseInt(limit) || 10;
    const name = req.body.name;

    // Fetch user details by ID
    const userdetails = await User.findById(id);

    if (
      userdetails.role === "Admin" ||
      userdetails.role === "Sub Admin" ||
      userdetails.role === "Super Admin" ||
      userdetails.AdditionalPortalAccess === "Admin" ||
      userdetails.AdditionalPortalAccess === "Sub Admin" ||
      userdetails.AdditionalPortalAccess === "Super Admin"
    ) {
      // User has access, fetch all posts
      const posts = await ichpmodal.find({});
      res.status(200).json({ posts: posts });
    } else {
      // User doesn't have access
      return res.json({ message: "No access" });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});

// get all posts based on location..........in future add location for filter..............

ichpPost.post("/listofallposts/:limit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const limit = req.params.limit;
    const limitCount = parseInt(limit) || 10;
    const name = req.body.name;

    // Fetch user details by ID
    const userdetails = await User.findById(id);

    if (
      userdetails.role === "Admin" ||
      userdetails.role === "Sub Admin" ||
      userdetails.role === "Super Admin" ||
      userdetails.AdditionalPortalAccess === "Admin" ||
      userdetails.AdditionalPortalAccess === "Sub Admin" ||
      userdetails.AdditionalPortalAccess === "Super Admin"
    ) {
      let query = {};

      if (name) {
        query = {
          $or: [
            { name: new RegExp(name, "i") },
            { email: new RegExp(name, "i") },
            { Title: new RegExp(name, "i") },

            { content: new RegExp(name, "i") },
          ],
        };
      }

      // User has access, fetch all posts
      const posts = await ichpmodal.find(query).limit(limitCount);
      res.status(200).json({ posts: posts });
    } else {
      // User doesn't have access
      return res.json({ message: "No access" });
    }
  } catch (e) {
    res.status(500).json({
      status: "Failed",
      message: e.message,
    });
  }
});

//delete specific post,......................................

ichpPost.post("/deletepost/:id", async (req, res) => {
  try {
    const postId = req.body.postid; // Corrected the typo here

    const id = req.params.id;

    // Fetch user details by ID
    const userdetails = await User.findById(id);

    if (
      userdetails.role === "Admin" ||
      userdetails.role === "Sub Admin" ||
      userdetails.role === "Super Admin" ||
      userdetails.AdditionalPortalAccess === "Admin" ||
      userdetails.AdditionalPortalAccess === "Sub Admin" ||
      userdetails.AdditionalPortalAccess === "Super Admin"
    ) {
      // User has access, fetch all posts

      const postdata = await ichpmodal.findByIdAndDelete(postId);

      if (postdata) {
        res.json({ postdata: postdata }); // Changed to res.json
      }
    } else {
      // User doesn't have access
      return res.json({ message: "No access" });
    }
  } catch (e) {
    res.status(400).json({
      status: "Failed",
      message: e.message,
    });
  }
});

module.exports = ichpPost;
