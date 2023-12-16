const User = require('../../models/userSchema');
const Verification = require('../../models/verification/verificationSchema')
const userRoutes = require('express').Router();
const fs = require('fs');





const moment = require('moment'); // Import the moment library for date formatting

const Connection = require("../../models/connection/connectionschema")
const Admin = require('../../models/adminSchema/admin')
const { emailSender } = require("../../secure/mail")
const multer = require('multer');
const Request = require('../../models/connection/requestSchema')
const { tokenGenerator } = require("../../secure/token");
const { hashGenerate, hashValidator } = require("../../secure/hash");

const bcrypt = require("bcryptjs");
// const twilio = require('twilio');
const Survey = require('../../models/surveySchemas/surveyDetailSchema');
const { log } = require('console');
const companySchema = require('../../models/company/companySchema');

const accountSid = "AC5b8384fda3c5287240f10e34da1162db";

const authToken = "9c553a14dd64333e3de815568ed74657";

const verifySid = "VAc5cc26fb54a3002673f7f486ca641fdf";

const client = require("twilio")(accountSid, authToken);


const axios = require('axios');

const Company=require("../../models/company/companySchema")

// const client = twilio(process.env.accountSid, process.env.authToken);

const Job = require("../../models/jobs/jobSchema");

const AWS = require('aws-sdk');

const multerS3 = require('multer-s3');

const upload = multer({ storage: multer.memoryStorage() });


const NodeGeocoder = require('node-geocoder');

// Configure node-geocoder with the OpenStreetMap (Nominatim) provider
const geocoder = NodeGeocoder({
  provider: 'openstreetmap',
  language: 'en', // Language for the results
});










// Configure AWS credentials (set your own accessKeyId and secretAccessKey)


AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey,
    region: "ap-south-1" // Specify the AWS region
  });
  

  const s3 = new AWS.S3();










// function to for register.txt file..............................................................................................


async function registertextfile (KEY,content){

    
    const lines = [];


    for (const key in content) {

        if (content.hasOwnProperty(key)) {
            lines.push(`${key}: ${content[key]}`);
        }
    }


    const contentString = lines.join('\n')

    const timestamp = new Date().toISOString();


    const addcontent=`\n[${timestamp}]:\n${contentString}\n`;
  


   // Check if the key exists
   try {
    await s3.headObject({ Bucket: process.env.bucketname, Key: KEY }).promise();

} catch (error) {

    if (error.statusCode === 404) {
        // Key does not exist, create it

        await s3.putObject({ Bucket: process.env.bucketname, Key: KEY, Body: '' }).promise();

    } else {
        throw error; // Other error occurred, rethrow it
    }
}




// get old data..........

    const registertext = await s3.getObject({ Bucket: process.env.bucketname, Key: KEY }).promise();

    const updatediu = registertext.Body.toString('utf-8') + addcontent



    const saved = await s3.putObject({ Bucket: process.env.bucketname, Key: KEY, Body: updatediu }).promise();



}



// function to for register.txt file..............................................................................................









//   not used...............................................

// Define a function to generate S3 file keys

const generateS3Key = (req, folderName, fileName, extension, lengthOfFile) => {

    const fullName = `${fileName}${lengthOfFile}.${extension}`;

    return `useFolder/${req.params.email}/${folderName}/${fullName}`;
  };
  

// Initialize multer middleware with S3 storage

const s3Storage = (folderName) => multerS3({
  s3,
  bucket: process.env.bucketname, // Replace with your S3 bucket name
  key: (req, file, cb) => {
    const s3Key = generateS3Key(req, folderName, req.params.fileName, req.params.extension, req.params.lengthOfFile);
    cb(null, s3Key);
  }
});


//   not used...............................................




const generateOTP = () => {
    const otpLength = 6;
    const digits = '0123456769';
    let otp = '';
    for (let i = 0; i < otpLength; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
};


// get all user used in admin dahsboard delete users...................................in  use.............................................................

userRoutes.post("/getusers/:skip/:limit", async (req, res) => {
    const skip = req.params.skip;
    const limit = req.params.limit;
    const name = req.body.name; // Use req.query to get the "name" parameter from the query string
  
    const skipCount = parseInt(skip) || 0;
    const limitCount = parseInt(limit) || 4;
  
    try {
      let query = {}; // Initialize an empty query object
  
        query = {
          $or: [
            { name: new RegExp(name, 'i')  }, // Case-insensitive search
            { email: new RegExp(name, 'i') },
          ],
        };
   
  
      // Use query for filtering users
      const allUser = await User.find(query)
        .skip(skipCount)
        .limit(limitCount);
  
      res.send(allUser);
    } catch (error) {
      res.status(500).send({ error: "Internal Server Error" });
    }
  });
  

// delete users ............................................admin dashboard................................in use..........................



userRoutes.delete("/deleteusers", async (req, res) => {
    const deleteArr = req.body.deletearr;

    try {
        const result = await User.deleteMany({ _id: { $in: deleteArr } });
        console.log('Users deleted successfully:', result.deletedCount);

        res.json({
            status: 'Success',
            message: `${result.deletedCount} users deleted successfully.`
        });
    } catch (error) {
        console.error('Error deleting users:', error);
        res.status(500).json({ status: 'Failed', message: 'Internal Server Error' });
    }
});


//.............................................





userRoutes.get("/getall", async (req, res) => {
    const allUser = await User.find().select("_id")
    res.send(allUser)
});

userRoutes.get("/getbyid/:id", async (req, res) => {
    const user = await User.findById({ _id: req.params.id });
    res.send(user)
})

userRoutes.put("/changeverifiedStatus", async (req, res) => {
    try {
        const verificationSign = await User.updateMany({ role: "ichp" }, { verified: false }, { new: true });
        res.send(verificationSign)
    } catch (error) {
        res.send(error.message)
    }
});

userRoutes.post("/passwordChecker/:email", async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.params.email });
        console.log(existingUser.expirationOtp > new Date());
        if (existingUser.emailotp == req.body.otp) {
            console.log('enter');
            const hashPassword = hashGenerate(req.body.otp)
            const checking = await User.findOneAndUpdate({ email: req.params.email }, { emailVerified: true }, { new: true })
            res.status(200).json({
                status: "Success",
                message: 'OTP Verified',

            })
        } else {
            res.status(400).json({
                status: "Failed",
                message: 'Wrong OTP or Otp expired'
            })
        }
    } catch (error) {

    }
});


userRoutes.get("/forgotpassword/:email", async (req, res) => {
    try {
        let otpNow = generateOTP()
        emailSender(`Dear ${req.params.email},\n\nYour One-Time Password (OTP) is: ${otpNow}.\nPlease use this OTP to complete your verification process.\n Click this link to access login page https://localhost:3000/invite/login \nThank you,\nYour Service Team`, 'Your One-Time Password (OTP)', req.params.email)
        
        
        const forgotPassword = await User.findOneAndUpdate({ email: req.params.email }, { emailotp: otpNow, expirationOtp: new Date(Date.now() + 30 * 60 * 1000) }, { new: true })

        
        res.send(forgotPassword)


    } catch (error) {
        res.send(error.message)
    }
})

// admin register...................................................................


userRoutes.post("/admin/registration", async (req, res) => {

    
    try {
        console.log("req.body",req.body);

        // const reffererDetails = await User.findOne({ refferalCodeGenerated: req.body.refferalCodeGenerated });


        const user = await User.findOne({ email: req.body.email });


        if (user === null || !user) {

            const password = generateOTP()







            let user
            if (req.body.location && req.body.state) {
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    mobilenumber: req.body.mobilenumber,
                    location: req.body.location,
                    state: req.body.state,
                    password: password,
                    role: req.body.role,
                    RegistrationDate: calculateDate(),

                    featureRole: req.body.featureRole
                });


            }
            if (!req.body.location && req.body.state) {

                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    mobilenumber: req.body.mobilenumber,

                    state: req.body.state,
                    password: password,
                    role: req.body.role,
                    RegistrationDate: calculateDate(),
    
    featureRole: req.body.featureRole
});
      
}









                emailSender(`Hi ${req.body.name}\n\n\tWe are delighted to welcome you to Karands Business Services. We appreciate your interest in joining our team and look forward to working together.\nHere are your company credentials:\nEmail ID: ${req.body.email}\nOne-Time Password (OTP): ${password}\nLink to Login: https://${process.env.IP_ADDRESS}/invite/login. \nIf you have any questions or need assistance, please don't hesitate to reach out\nOnce again, welcome aboard! We're thrilled to have you as part of our organization.\n\nBest regards,\nKarands Business Services`, "Welcome to Karands!", req.body.email)
                res.json({
                   
                    user: user
                })
            } else {
                res.status(400).json({
                    status: "Failed",
                    message: "Email already Exist",
                });
            }
      

    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        })
    }
})











// admin login...............................................................

// userRoutes.post("/admin/login", async (req, res) => {
//     try {
//         const adminReferalCheck = await User.findOne({ email: req.body.email });




//         if (adminReferalCheck === null || !adminReferalCheck) {

            
//             res.status(400).json({
//                 status: "Failed",
//                 message: "User Not Found, Kindly signup ",
//             });


//         }
        
        
//         else {

//             if (adminReferalCheck.oneTimePasswordChanges=="false") {


//                 let passCheck1 = adminReferalCheck.password == req.body.password;


//      let passCheck2=adminReferalCheck.AdditionalPortalAccesspassword=req.body.password

//                 if (passCheck1||passCheck2) {

//                     let token = await tokenGenerator(req.body.email, process.env.JWT_KEY);

//                     res.status(200).json({
//                         status: "Successfully Login",
//                         token: token,
//                         email: adminReferalCheck.email,
//                         id: adminReferalCheck._id,
//                         name: adminReferalCheck.name,
//                         loginStatus: "new",
//                     });


//                 } else {
//                     res.status(400).json({
//                         status: "Failed",
//                         message: "Enter valid Password",
//                     });
//                 }
//             }
            
            
//             else {
//                 let passCheck1 = await hashValidator(
//                     req.body.password,
//                     adminReferalCheck.password
//                 );

//                 let passCheck2 = await hashValidator(
//                     req.body.password,
//                     adminReferalCheck.AdditionalPortalAccesspassword
//                 );




//                 if (passCheck1||passCheck2) {
//                     let token = await tokenGenerator(req.body.email, process.env.JWT_KEY);
//                     res.status(200).json({
//                         status: "Successfully Login",
//                         token: token,
//                         email: adminReferalCheck.email,
//                         id: adminReferalCheck._id,
//                         name: adminReferalCheck.name,
//                         loginStatus: "old",

//                     });
//                 } else {
//                     res.status(400).json({
//                         status: "Failed",
//                         message: "Enter valid Password",
//                     });
//                 }
//             }
//         }
//     } catch (error) {
//         res.status(400).json({
//             status: "Failed",
//             message: "Check your credentials",
//         });
//     }
// })




// presentling in use.......................................................





userRoutes.post("/admin/login", async (req, res) => {
    try {
      const adminReferalCheck = await User.findOne({ email: req.body.email });


      if (!adminReferalCheck) {
        return res.status(400).json({
          status: "Failed",
          message: "User Not Found, Kindly sign up",
        });
      }
  
      if (adminReferalCheck.oneTimePasswordChanges === "false") {
        const passwordMatch = await bcrypt.compare(req.body.password, adminReferalCheck.password);
        const additionalPasswordMatch = req.body.password === adminReferalCheck.AdditionalPortalAccesspassword;
  
        if (req.body.password==adminReferalCheck.password || req.body.password ==adminReferalCheck.AdditionalPortalAccesspassword) {
          const token = await tokenGenerator(req.body.email, process.env.JWT_KEY);
  
          res.status(200).json({
            status: "Successfully Login",
            token: token,
            email: adminReferalCheck.email,
            id: adminReferalCheck._id,
            name: adminReferalCheck.name,
            loginStatus: "new",
          });
        } else {
          res.status(400).json({
            status: "Failed",
            message: "Enter valid Password",
          });
        }
      }
       else {
        const passwordMatch = await bcrypt.compare(req.body.password, adminReferalCheck.password);
        const additionalPasswordMatch = await bcrypt.compare(req.body.password, adminReferalCheck.AdditionalPortalAccesspassword);
  

  console.log("passmatch",passwordMatch)

        if (passwordMatch || additionalPasswordMatch) {
          const token = await tokenGenerator(req.body.email, process.env.JWT_KEY);
  
          res.status(200).json({
            status: "Successfully Login",
            token: token,
            email: adminReferalCheck.email,
            id: adminReferalCheck._id,
            name: adminReferalCheck.name,
            loginStatus: "old",
          });
        } else {
          res.status(400).json({
            status: "Failed",
            message: "Enter valid Password",
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        message: "Check your credentials",
      });
    }
  });




userRoutes.put("/changePassword/empin", async (req, res) => {
    try {
        console.log(req.body);

        const hashPass = await hashGenerate(req.body.password);
        const existingUser = await User.findOneAndUpdate({ email: req.body.email }, {
            password: hashPass,
            empin: req.body.empin,
            oneTimePasswordChanges: true
        });
        res.status(200).json({
            status: "Success",
            details: existingUser
        })
    } catch (error) {
        res.json({
            status: "Failed",
            error: error.message
        })
    }
})



userRoutes.put("/generatempin", async (req, res) => {
    try {
        console.log(req.body);

        const hashPass = await hashGenerate(req.body.password);

        const existingUser = await User.findOneAndUpdate({ email: req.body.email }, {
           empin: req.body.empin,
       
        });
        res.status(200).json({
            status: "Success"
         
        })
    } catch (error) {
        res.json({
            status: "Failed",
            error: error.message
        })
    }
})


















// change password for user.............
userRoutes.post("/userchangePassword", async (req, res) => {
    try {
  
  
        const hashPass = await hashGenerate(req.body.password);
        
        const existingUser = await User.findOneAndUpdate({ email: req.body.email }, {
            password: hashPass,
           
        });
        res.status(200).json({
            status: "Success",
            details: existingUser
        })
    } catch (error) {
        res.json({
            status: "Failed",
            error: error.message
        })
    }
  })
  








userRoutes.get("/superadmin/:skip", async (req, res) => {
    try {
        let skip = parseInt(req.params.skip) == 0 ? 0 : parseInt(req.params.skip) * 6

        console.log(skip);
        const admin = await User.find({ role: 'Super Admin' }).select('name location role industry permission _id password email').skip(skip).limit(6);
        res.status(200).json({
            Status: "Success",
            superAdmin: admin
        })
    } catch (error) {
        res.send(error.message)
    }
})
userRoutes.get("/admin/:skip", async (req, res) => {
    try {
        let skip = parseInt(req.params.skip) == 0 ? 0 : parseInt(req.params.skip) * 6
        const subadmin = await User.find({ role: 'Admin' }).select('name location role industry permission').skip(skip).limit(6);
        res.status(200).json({
            Status: "Success",
            admin: subadmin
        })
    } catch (error) {
        res.send(error.message)
    }
});





//admin earning

userRoutes.get("/changeEarningAndBalance", async (req, res) => {
    try {

        const adminAccess = await Admin.find().limit(1)
        res.json({ adminAccess: adminAccess[0] })
    } catch (error) {
        res.send({ error: error })


    }
})



//admin full details
// userRoutes.get("/adminAllDetails/:id", async (req, res) => {
//     try {
//         const userRole=await User.findById({_id:req.params.id}).select("role");
//         const checkUser = await User.aggregate([
//             {
//                 $group: {
//                     _id: '$role',
//                     count: { $sum: 1 },
//                     verifiedCount: {
//                         $sum: { $cond: [{ $eq: ['$verified', true] }, 1, 0] }
//                     },
//                     unverifiedCount: {
//                         $sum: { $cond: [{ $eq: ['$verified', false] }, 1, 0] }
//                     }
//                 }
//             }
//         ])
//         res.json({ details: checkUser })
//     } catch (error) {
//         res.send(error)
//     }
// })



userRoutes.get("/adminAllDetails/:id", async (req, res) => {
    const userId = req.params.id;

    try {
        const userRole = await User.findById(userId).select("role location industry state");
        let checkUser;
        
        console.log("userrole",userRole.role)

        if (userRole.role === 'Super Admin') {
            checkUser = await getOverallUserCounts();
        } else if (userRole.role === 'Admin') {
            checkUser = await getUserCountsBystate(userRole.location);
        }else if(userRole.role=="consultant"){
            checkUser = await getUserCountsBylocation(userRole.location);

        }
        
        
        else if (userRole.role === 'Sub-Admin') {
            checkUser = await getUserCountsByLocationAndIndustry(userRole.location, userRole.industry);
        } else {
            return res.status(400).json({ error: "Invalid user role" });
        }

        const companyCount = await companySchema.countDocuments();
        res.json({ details: checkUser, company: companyCount });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

async function getOverallUserCounts() {
    return await User.aggregate([
        {
            $group: {
                _id: "$role",
                count: { $sum: 1 },
                verifiedCount: { $sum: { $cond: [{ $eq: ['$verified', true] }, 1, 0] } },
                unverifiedCount: { $sum: { $cond: [{ $eq: ['$verified', false] }, 1, 0] } }
            }
        }
    ]);
}

async function getUserCountsBylocation(location) {
    return await User.aggregate([
        { $match: { location: location } },
        {
            $group: {
                _id: "$role",
                count: { $sum: 1 },
                verifiedCount: { $sum: { $cond: [{ $eq: ['$verified', true] }, 1, 0] } },
                unverifiedCount: { $sum: { $cond: [{ $eq: ['$verified', false] }, 1, 0] } }
            }
        }
    ]);
}


async function getUserCountsBystate(location) {
    return await User.aggregate([
        { $match: { state: location } },
        {
            $group: {
                _id: "$role",
                count: { $sum: 1 },
                verifiedCount: { $sum: { $cond: [{ $eq: ['$verified', true] }, 1, 0] } },
                unverifiedCount: { $sum: { $cond: [{ $eq: ['$verified', false] }, 1, 0] } }
            }
        }
    ]);
}

async function getUserCountsByLocationAndIndustry(location, industry) {
    return await User.aggregate([
        { $match: { location, industry } },
        {
            $group: {
                _id: "$role",
                count: { $sum: 1 },
                verifiedCount: { $sum: { $cond: [{ $eq: ['$verified', true] }, 1, 0] } },
                unverifiedCount: { $sum: { $cond: [{ $eq: ['$verified', false] }, 1, 0] } }
            }
        }
    ]);
}


//change empty to false for some user in verified status  ... change to verify to true



userRoutes.patch("/changeStatusVerified", async (req, res) => {
    try {
        const roleFilter = ['ichp'];
        const usersToUpdate = await User.find({ role: { $in: roleFilter } }).limit(5);

        usersToUpdate.forEach(async (user) => {
            user.verified = true;
            await user.save();
        });

        res.status(200).json({ message: 'Users updated successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});



userRoutes.get("/getallusers/:role/:id", async (req, res) => {
    try {
        const userDetails = await User.findById({ _id: req.params.id }).select("role industry location");
        console.log(userDetails);
        let allDetails;
        if (userDetails.role === "Super Admin") {
            allDetails = await User.find({ role: req.params.role })

        } else if (userDetails.role === "Admin") {
            allDetails = await User.find({ role: req.params.role, location: userDetails.location })

        } else if (userDetails.role === "Sub-Admin") {
            allDetails = await User.find({ role: req.params.role,  location: userDetails.location, industry: userDetails.industry })

        } else {
            res.status(400).json({
                Status: "Failed",
                details: "You dont Have access to see user details"
            })
        }
        res.send(allDetails)
    } catch (error) {
        res.status(400).json({
            Status: "Failed",
            details: error.message
        })
    }
})


userRoutes.get("/getusers/:role/:status/:id", async (req, res) => {
    try {
        const userDetails = await User.findById({ _id: req.params.id }).select("role industry location");
        console.log(userDetails);
        let allDetails;
        if (userDetails.role === "Super Admin") {
            allDetails = await User.find({ role: req.params.role, verified: req.params.status })

        } else if (userDetails.role === "Admin") {
            allDetails = await User.find({ role: req.params.role, verified: req.params.status, location: userDetails.location })

        } else if (userDetails.role === "Sub-Admin") {
            allDetails = await User.find({ role: req.params.role, verified: req.params.status, location: userDetails.location, industry: userDetails.industry })

        } else {
            res.status(400).json({
                Status: "Failed",
                details: "You dont Have access to see user details"
            })
        }
        res.send(allDetails)
    } catch (error) {
        res.status(400).json({
            Status: "Failed",
            details: error.message
        })
    }
})







userRoutes.get("/subadmin/:skip", async (req, res) => {
    try {
        let skip = parseInt(req.params.skip) == 0 ? 0 : parseInt(req.params.skip) * 6
        const subadmin = await User.find({ role: 'Sub-Admin' }).select('name location role industry permission').skip(skip).limit(6);
        res.status(200).json({
            Status: "Success",
            subadmin: subadmin
        })
    } catch (error) {
        res.send(error.message)
    }
})




userRoutes.get("/userList/iu", async (req, res) => {
    try {
        console.log('No');
        const subAdmin = await User.find({ role: 'Sub-Admin' }).select('name location role industry permission').limit(6);
        const admin = await User.find({ role: 'Admin' }).select('name location role industry permission').limit(6);
        const subAdminCount = await User.countDocuments({ role: 'Sub-Admin' }).exec();
        const adminCount = await User.countDocuments({ role: 'Admin' }).exec();

        res.status(200).json({
            Status: "Success",
            subAdminCount: subAdminCount,
            adminCount: adminCount,
            subAdmin: subAdmin,
            admin: admin,

        })
    } catch (error) {
        res.send(error.message)
    }
});


userRoutes.post("/getFilter", async (req, res) => {
    try {
        const role = req.body.role;
        const industry = req.body.industry;
        const location = req.body.location;

        const query = {
            role: role,
            industry: { $in: industry },
            location: { $in: location }
        };
        console.log(query);
        const data = await User.find(query).exec();

        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

userRoutes.post("/industry/getFilter", async (req, res) => {
    try {
      const role = req.body.role;
      const industry = req.body.industry;
  
      let query = {
        role: role
      };
  
      if (industry) {
        query.industry = { $in: industry };
      }
  
      console.log('Query:', query);
  
      const data = await User.find(query).exec();
      res.json(data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  

userRoutes.post("/location/getFilter", async (req, res) => {
  try {
    const role = req.body.role;
    const location = req.body.location;

    let query = {
      role: role
    };

    if (location) {
      query.location = { $in: location };
    }

    console.log('Query:', query);

    const data = await User.find(query).exec();
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});




userRoutes.get("/getunverifiedICHP/:id", async (req, res) => {
    try {
        const userCheck = await User.findById({ _id: req.params.id });
        let userCount = 0;
        if (userCheck.role === "Super Admin") {
            console.log('super admin enter');

            userCount = await User.countDocuments({ role: 'ichp', verified: false })

        } else if (userCheck.role === "Admin") {
            console.log('admin enter');

            userCount = await User.countDocuments({ role: "ichp", verified: false, location: userCheck.location })
        } else if (userCheck.role === "Sub-Admin") {
            console.log('subb admin enter');

            userCount = await User.countDocuments({ role: "ichp", verified: false, location: userCheck.location, industry: userCheck.industry })

        }
        res.send({ userCount: userCount })
    } catch (error) {

    }
})


userRoutes.get("/roleGetter", async (req, res) => {
    try {
        const ichpCount = await User.countDocuments({ role: 'ichp' });
        const iuCount = await User.countDocuments({ role: 'iu' });
        res.status(201).json({
            status: "Success",
            ichp: ichpCount,
            iu: iuCount,
            total: ichpCount + iuCount,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            details: error.message
        })
    }
})

// emial.........and.................. phone........verify............

userRoutes.post("/verification/:email", async (req, res) => {
    try {
      const existingUser = await User.findOne({ email: req.params.email });
  
      if (
        existingUser.emailotp === req.body.emailOtp &&
        existingUser.smsotp === req.body.phoneOtp &&
        existingUser.expirationOtp > new Date()
      ) {
        console.log('Verification successful.');
        const updatedUser = await User.findOneAndUpdate(
          { email: req.params.email },
          { emailVerified: true, phoneVerified: true },
          { new: true }
        );
  
        res.status(200).json({
          status: "Success",
          message: "Email and phone OTPs verified successfully.",
          user: updatedUser
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "Wrong OTP or OTP expired."
        });
      }
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        message: error.message
      });
    }
  })
  




async function sendsms(phoneNumber){

        const smsotp = generateOTP();

        const smssendedres = await axios.post(`https://api.authkey.io/request`, null, {
            params: {
                authkey: "9dd3c61b71db1a5b",
                mobile: phoneNumber,
                country_code: "+91",
                sid: "10170",
                name: "Twinkle",
                otp: smsotp,
                time: 10
            }
        })

        if(smssendedres){

            return smsotp
        }

        console.log("smssendedres", smssendedres);
}







//phone & email   otp...........sending.......................................

userRoutes.get("/email/:email", async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.params.email });

        // const phoneNumber = "+91" + existingUser.mobilenumber;


        const phoneNumber=existingUser.mobilenumber

    

        const otpNow = generateOTP();


       const smsotp=await sendsms(phoneNumber)






        const mail = `Dear ${existingUser.name},\n\n\tThank you for choosing Karands Business Services! We're excited to have you on board. To complete your account registration and ensure the security of your information, we require you to verify your email address.\nPlease use the following OTP to proceed with the verification process:\nOTP: ${otpNow}.\nPlease enter this OTP on our website or app within 10 minutes to verify your email address. If you did not initiate this request, please disregard this email.\nNote: For security reasons, please do not share this OTP with anyone. Karands Business Services will never ask you for your OTP or any other sensitive information.\nIf you have any questions or encounter any issues during the verification process, please don't hesitate to reach out to our support team at [Karands.bs@gmail.com] or call us at [1234567691].\nThank you for choosing Karands Business Services!\nBest regards,\nTSG Singh\nKarands Business Services`
       
        emailSender(mail, "OTP Verification - Karands Business Service", req.params.email);

        console.log("mail sent");


        const newUpdates = await User.findByIdAndUpdate({ _id: existingUser._id }, {
            emailotp: otpNow,
            smsotp:smsotp,
            expirationOtp: new Date(Date.now() + 10 * 60 * 1000)
        })





        res.json({ status: newUpdates })
        

    } catch (error) {
        res.send({
            status: error.message
        })
    }
})









userRoutes.post("/subscription/:id", async (req, res) => {
    try {
        var currentDate = new Date();
        const filteringDate = `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()}`
        var nextYearDate = `${currentDate.getFullYear() + 1}/${currentDate.getMonth()}/${currentDate.getDate()}`


        const newUpdate = await User.findByIdAndUpdate({ _id: req.params.id }, {
            SubscriptionsDate: filteringDate,
            expiryDate: nextYearDate,
        }, { new: true })
        const newUpdateInAdmin = await
            res.status(200).json({
                status: "Sucess",
                details: newUpdate
            })
    } catch (error) {
        res.status(400).json({
            Status: 'Failed',
            message: error.message
        })
    }
})
userRoutes.get('/refferalCode/:refferalCode', async (req, res) => {
    try {
        console.log(req.params.refferalCode);
        const adminReferralCheck = await User.findOne({ refferalCodeGenerated: req.params.refferalCode });
        res.send(adminReferralCheck)
    } catch (error) {
        res.send(error.message)
    }
})









userRoutes.patch('/statusVerification/:id', async (req, res) => {
    try {
        const newUpdate = await Verification.findOneAndUpdate({ candidateId: req.params.id }, req.body, { new: true });
        res.send('updated')
    } catch (error) {
        res.send(error.message)
    }
});
userRoutes.get('/verification/:id', async (req, res) => {
    const existingUser = await Verification.findOne({ candidateId: req.params.id });
    res.send(existingUser)
})
function calculateDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    return `${day}/${month}/${year}`;
}




// const storage = multer.diskStorage({
//     destination: async (req, file, cb) => {
//         const folderPath = `useFolder/${req.params.email}/`;
//         const subFolder = `useFolder/${req.params.email}/${req.params.folderName}`
//         console.log('enter inside upload');
//         if (!fs.existsSync(folderPath)) {
//             fs.mkdirSync(folderPath, { recursive: true });
//             fs.mkdirSync(subFolder, { recursive: true });

//         } else if (!fs.existsSync(subFolder)) {
//             fs.mkdirSync(subFolder, { recursive: true });


//         }
//         cb(null, subFolder);
//     },
//     filename: async (req, file, cb) => {
//         cb(null, req.params.fileName);
//     },
// });



// const projectCheck = multer.diskStorage({
//     destination: async (req, file, cb) => {
//         const folderPath = `useFolder/${req.params.email}/`;

//         const subFolder = `useFolder/${req.params.email}/${req.params.folderName}`

//         console.log('enter');
//         if (!fs.existsSync(folderPath)) {
//             fs.mkdirSync(folderPath, { recursive: true });
//             fs.mkdirSync(subFolder, { recursive: true });
//         } else if (!fs.existsSync(subFolder)) {
//             fs.mkdirSync(subFolder, { recursive: true });
//         }
//         cb(null, subFolder);
//     },
//     filename: async (req, file, cb) => {
//         const fullName = req.params.fileName + req.params.lengthOfFile + "." + req.params.extension;
//         console.log(fullName);
//         cb(null, fullName);
//     },
// });






// const upload = multer({ storage });


// const projects = multer({ storage: projectCheck })




// Initialize multer with S3 storage for default upload

  
  
  // Initialize multer with S3 storage for 'projects' storage





// uploading files...................

// userRoutes.post("/upload/:email/:fileName/:folderName", upload.single('pdfFile'), async (req, res) => {
//     try {
//         const folderPath = `useFolder/${req.params.email}/`;
//         const subFolder = `useFolder/${req.params.email}/${req.params.folderName}`;

//         let pathFromSave = path.join(`C:\\KARANDS\\BACKEND\\`, subFolder, req.params.fileName);

        
//         if (!fs.existsSync(folderPath)) {
//             fs.mkdirSync(folderPath, { recursive: true });
//             fs.mkdirSync(subFolder, { recursive: true });
//         } else if (!fs.existsSync(subFolder)) {
//             fs.mkdirSync(subFolder, { recursive: true });
//         }
//         const fieldName = req.params.fileName.split(".")[0];
//         const fieldName2 = req.params.folderName
//         const update = {};
//         update[fieldName] = pathFromSave;
//         update[fieldName2] = 'Uploaded Documents';

//         const userUpdate = await User.findOneAndUpdate(
//             { email: req.params.email },
//             update,
//             { new: true }
//         );

//         const verficationUpdate = {};
//         verficationUpdate[fieldName] = 'underVerification';
//         console.log(verficationUpdate);
//         const userVerificationChange = await Verification.findOneAndUpdate({ candidateId: userUpdate._id }, verficationUpdate, { new: true })

//         if (!userUpdate) {
//             // Handle case when the user is not found
//             console.error('User not found');
//             return res.sendStatus(404);
//         }

//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error uploading PDF file:', error);
//         res.sendStatus(400);
//     }
// });








// upload resume....................................................

userRoutes.post("/uploadresume/:email/:fileName/:folderName",upload.single('pdfFile'), async (req, res) => {


    const timestamp = new Date().toISOString();

    try {
      const email = req.params.email;
      const folderName = req.params.folderName;
      const fileName = req.params.fileName;
  
      const fileContent = req.file.buffer;
      const contentType = req.file.mimetype;

      
  


     const key=`useFolder/${email}/${folderName}/${folderName}.txt`

     const content={

        fileName: `useFolder/${email}/${folderName}/${fileName}`

     }


      registertextfile(key,content)



     


      const uploadParams = {
        Bucket: process.env.bucketname,
        Key: `useFolder/${email}/${folderName}/${fileName}`,

        Body:fileContent ,// Assuming you're using multer's memory storage

        ContentType:contentType
      };




      const uploadResponse = await s3.putObject(uploadParams).promise();
  

  
      const userUpdate = await User.findOneAndUpdate(
        { email: email },
        {resume:`useFolder/${email}/${folderName}/${fileName}`},
        { new: true }
      );
  
    
  
      if (!userUpdate) {
        console.error('User not found');
        return res.sendStatus(404);
      }
  
      res.sendStatus(200);
    } catch (error) {
      console.error('Error uploading PDF file:', error);
      res.sendStatus(400);
    }
  });














// 


userRoutes.post("/upload/:email/:fileName/:folderName",upload.single('pdfFile'), async (req, res) => {




    const timestamp = new Date().toISOString();

    try {
      const email = req.params.email;
      const folderName = req.params.folderName;
      const fileName = req.params.fileName;
  
      const fileContent = req.file.buffer;
      const contentType = req.file.mimetype;

      
  


     const key=`useFolder/${email}/${folderName}/${folderName}.txt`

     const content={

        fileName: `useFolder/${email}/${folderName}/${fileName}`

     }


      registertextfile(key,content)



     


      const uploadParams = {
        Bucket: process.env.bucketname,
        Key: `useFolder/${email}/${folderName}/${fileName}`,

        Body:fileContent ,// Assuming you're using multer's memory storage

        ContentType:contentType
      };




      const uploadResponse = await s3.putObject(uploadParams).promise();
  
      const s3Url = uploadResponse.Location; // The URL of the uploaded object
  
      const fieldName = fileName.split(".")[0];
      const fieldName2 = folderName;


      const update = {};
      update[fieldName] = `useFolder/${email}/${folderName}/${fileName}`;
      update[fieldName2] = 'Uploaded Documents';
  
      const userUpdate = await User.findOneAndUpdate(
        { email: email },
        update,
        { new: true }
      );
  
      const verficationUpdate = {};
      verficationUpdate[fieldName] = 'underVerification';
      console.log(verficationUpdate);

      const userVerificationChange = await Verification.findOneAndUpdate(
        { candidateId: userUpdate._id },
        verficationUpdate,
        { new: true }
      );
  
      if (!userUpdate) {
        console.error('User not found');
        return res.sendStatus(404);
      }
  
      res.sendStatus(200);
    } catch (error) {
      console.error('Error uploading PDF file:', error);
      res.sendStatus(400);
    }
  });

// upload educationnal........................... files.............................

// userRoutes.post("/uploadeducational/:email/:fileName/:folderName1/:folderName2", upload.single('pdfFile'), async (req, res) => {




//     const timestamp = new Date().toISOString();

//     try {
//         const email = req.params.email;

//         const fileName = req.params.fileName;

//         const fileContent = req.file.buffer;
//         const contentType = req.file.mimetype;

//         const folderName1 = req.params.folderName1;

//         const folderName2 = req.params.folderName2;


//         const collegeName = req.body.collegeName





//         const key = `useFolder/${email}/${folderName1}/${folderName1}.txt`

//         const content = {

//             fileName: `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`

//         }


//         registertextfile(key, content)






//         const uploadParams = {
//             Bucket: process.env.bucketname,
//             Key: `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`,

//             Body: fileContent,// Assuming you're using multer's memory storage

//             ContentType: contentType
//         };



//         // uploading docs to s3 bucket................................................................................

//         const uploadResponse = await s3.putObject(uploadParams).promise();


//         const user = await User.findOne({ email: email })

//         if (!user) {
//             console.error('User not found');
//             return res.sendStatus(404);
//         }

//         console.log("collegeName.................", collegeName)



//         const educationIndex = user.education.findIndex(edu => edu.college === collegeName);



//         if (educationIndex === -1) {
//             console.log('College not found in education');
//             return;
//         }


//         const propertyToUpdate = fileName

//         user.education[educationIndex].filepath = `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`;

//         await user.save()


//         console.log("user..........", user, "educationIndex", educationIndex);






//         const verficationUpdate = {};
//         verficationUpdate[folderName1] = 'underVerification';
//         console.log(verficationUpdate);

//         const userVerificationChange = await Verification.findOneAndUpdate(
//             { candidateId: user._id },
//             verficationUpdate,
//             { new: true }
//         );

//         if (!user) {
//             console.error('User not found');
//             return res.sendStatus(404);
//         }

//         res.sendStatus(200);
//     }




//     catch (error) {
//         console.error('Error uploading PDF file:', error);
//         res.sendStatus(400);
//     }
// });


userRoutes.post("/uploadeducational/:email/:fileName/:folderName1/:folderName2", upload.single('pdfFile'), async (req, res) => {
    const timestamp = new Date().toISOString();

    try {
        const email = req.params.email;
        const fileName = req.params.fileName; // This should already have the extension
        const fileContent = req.file.buffer;
        const contentType = req.file.mimetype;
        const folderName1 = req.params.folderName1;
        const folderName2 = req.params.folderName2;
        const collegeName = req.body.collegeName;

        // Correct the key for the text file
        const textFileKey = `useFolder/${email}/${folderName1}/${folderName1}.txt`;
        const textFileContent = {
            fileName: `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`
        };

        registertextfile(textFileKey, textFileContent);

        // Correct the key for the uploaded file
        const fileKey = `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`;

        const uploadParams = {
            Bucket: process.env.bucketname,
            Key: fileKey,
            Body: fileContent,
            ContentType: contentType
        };

        const uploadResponse = await s3.putObject(uploadParams).promise();

        // Update filepath in user MongoDB database
        const filenameWithoutExtension = fileName.split('.')[0];
        const dynamicKey = `${filenameWithoutExtension}`;

        const updateQuery = {
            $set: {
                [`education.$[elem].${dynamicKey}`]: fileKey,
            },
        };

        const options = {
            arrayFilters: [{ 'elem.college': collegeName }],
            new: true,
        };
        
        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            updateQuery,
            options
        );

        if (!updatedUser) {
            console.error('User not found');
            return res.sendStatus(404);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error('Error uploading PDF file:', error);
        res.sendStatus(400);
    }
});





// upload proffectional details.............................................................................................................




userRoutes.post("/uploadjoddetails/:email/:fileName/:folderName1/:folderName2", upload.single('pdfFile'), async (req, res) => {

    const timestamp = new Date().toISOString();

    try {
        const email = req.params.email;
        const fileName = req.params.fileName;
        const fileContent = req.file.buffer;
        const contentType = req.file.mimetype;
        const folderName1 = req.params.folderName1;
        const folderName2 = req.params.folderName2;
        const companyname = req.body.companyname;

        const experienceStart=req.body.experienceStart


        

        const key = `useFolder/${email}/${folderName1}/${folderName1}.txt`;
        const content = {
            fileName: `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`
        };

        registertextfile(key, content);

        const uploadParams = {
            Bucket: process.env.bucketname,
            Key: `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`,
            Body: fileContent,
            ContentType: contentType
        };

        const uploadResponse = await s3.putObject(uploadParams).promise();


        // update filepath in user mongodb database.............................................................

        const filename=fileName.split('.')[0]

        const dynamicKey = `${filename}`; // or any other dynamic key

        const updateQuery = {
            $set: {
                [`JobExperience.$[elem].${dynamicKey}`]: `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`,
            },
        };
    
        // const options = {
        //     arrayFilters: [{ 'elem.companyName': companyname }],
        //     new: true,
        // };
        

        const options = {
            arrayFilters: [
                // { 'elem.companyName': companyname },
                { 'elem.experienceStart': experienceStart }
            ],
            
            new: true,
          };
          
       


        const updatedUser = await User.findOneAndUpdate(
            { email: email },
            updateQuery,
            options
        );
        
        if (!updatedUser) {
            console.error('User not found');
            return res.sendStatus(404);
        }

     


        res.sendStatus(200);
    } catch (error) {
        console.error('Error uploading PDF file:', error);
        res.sendStatus(400);
    }
});



// upload company documents.....................................




// userRoutes.post("/uploadcompanydetails/:email/:fileName/:folderName1/:folderName2", upload.single('pdfFile'), async (req, res) => {
//   try {
//     const email = req.params.email;
//     const fileName = req.params.fileName;
//     const fileContent = req.file.buffer;
//     const contentType = req.file.mimetype;
//     const folderName1 = req.params.folderName1;
//     const folderName2 = req.params.folderName2;
//     const companyname =  req.params.folderName2
//     const experienceStart = req.body.experienceStart;

//     // Update the content of the text file
//     const key = `useFolder/${email}/${folderName1}/${folderName1}.txt`;
//     const content = {
//       fileName: `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`
//     };
//     registertextfile(key, content);

//     // Upload file to S3
//     const uploadParams = {
//       Bucket: process.env.bucketname,
//       Key: `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`,
//       Body: fileContent,
//       ContentType: contentType
//     };


//     const uploadResponse = await s3.putObject(uploadParams).promise();

//     const filename = fileName.split('.')[0];
//     const dynamicKey = `${filename}`;
//     const fieldValue = `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`;
    
//     const updateQuery = {
//       $set: {
//         [dynamicKey]: fieldValue
//       }
//     };
//     const userdetails = await User.findOne(
//         { nameOfCompany: companyname } );
      

//         userdetails.dynamicKey=`useFolder/${email}/${folderName1}/${folderName2}/${fileName}`


//  const updatedUser= await userdetails.save() 



//     if (!updatedUser) {
//       console.error('User not found');
//       return res.sendStatus(404);
//     }

//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Error uploading PDF file:', error);
//     res.sendStatus(500);  // Internal Server Error
//   }
// });




userRoutes.post("/uploadcompanydetails/:email/:fileName/:folderName1/:folderName2", upload.single('pdfFile'), async (req, res) => {
  try {
    const email = req.params.email;
    const fileName = req.params.fileName;
    const fileContent = req.file.buffer;
    const contentType = req.file.mimetype;
    const folderName1 = req.params.folderName1;
    const folderName2 = req.params.folderName2;
    const companyname = req.params.folderName2;
    const experienceStart = req.body.experienceStart;

    // Update the content of the text file
    const key = `useFolder/${email}/${folderName1}/${folderName1}.txt`;
    const content = {
      fileName: `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`
    };
    registertextfile(key, content);

    // Upload file to S3
    const uploadParams = {
      Bucket: process.env.bucketname,
      Key: `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`,
      Body: fileContent,
      ContentType: contentType
    };

    const uploadResponse = await s3.putObject(uploadParams).promise();

    const filename = fileName.split('.')[0];
    const dynamicKey = `${filename}`;
    const fieldValue = `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`;

    // Build the update object
    const updateObj = {};
    updateObj[dynamicKey] = fieldValue;

    // Find the company by nameOfCompany and update with new values
    const updatedCompany = await companySchema.findOneAndUpdate(
      { nameOfCompany: companyname },
      { $set: updateObj }, // Use $set to update specific fields
      { new: true } // Return the updated document
    );


    console.log("updated company",updatedCompany,updateObj)


    if (!updatedCompany) {
      console.error('Company not found');
      return res.sendStatus(404);
    }

    res.send(updatedCompany);
  } catch (error) {
    console.error('Error uploading PDF file:', error);
    res.sendStatus(500);  // Internal Server Error
  }
});















// upload project info.......................................................//...............................................................

userRoutes.post("/uploadprojectdetails/:email/:fileName/:folderName1/:folderName2", upload.single('pdfFile'), async (req, res) => {

    const timestamp = new Date().toISOString();

    try {
        const email = req.params.email;
        const fileName = req.params.fileName;
        const fileContent = req.file.buffer;
        const contentType = req.file.mimetype;
        const folderName1 = req.params.folderName1;
        const folderName2 = req.params.folderName2;


        const project = req.body.project;

        const experienceStart = req.body.experienceStart







        if (fileContent) {

            // uploading to s3 bucket..........................................................................


            const key = `useFolder/${email}/${folderName1}/${folderName1}.txt`;
            const content = {
                fileName: `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`
            };

            registertextfile(key, content);




            const uploadParams = {
                Bucket: process.env.bucketname,
                Key: `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`,
                Body: fileContent,
                ContentType: contentType
            };

            const uploadResponse = await s3.putObject(uploadParams).promise();
            // uploading to s3 bucket..........................................................................





            // update filepath in user mongodb database.............................................................

            const filename = fileName.split('.')[0]

            const dynamicKey = `${filename}`; // or any other dynamic key

            const updateQuery = {
                $set: {
                    [`projectInfo.$[elem].${dynamicKey}`]: `useFolder/${email}/${folderName1}/${folderName2}/${fileName}`,
                },
            };





            const options = {
                arrayFilters: [
                    // { 'elem.companyName': companyname },
                    { 'elem.project': project }
                ],

                new: true,
            };




            const updatedUser = await User.findOneAndUpdate(
                { email: email },
                updateQuery,
                options
            );

            if (!updatedUser) {
                console.error('User not found');
                return res.sendStatus(404);
            }


            res.sendStatus(200);
        }


        else {
            const filename = fileName.split('.')[0]

            const dynamicKey = `${filename}`; // or any other dynamic key

            const updateQuery = {
                $set: {
                    [`projectInfo.$[elem].${dynamicKey}`]: projectlink,
                },
            };





            const options = {
                arrayFilters: [
                    // { 'elem.companyName': companyname },
                    { 'elem.project': project }
                ],

                new: true,
            };






            const updatedUser = await User.findOneAndUpdate(
                { email: email },
                updateQuery,
                options
            );



        }




    } catch (error) {
        console.error('Error uploading PDF file:', error);
        res.sendStatus(400);
    }
});




















userRoutes.post("/profile/:email/:fileName/:folderName",  async (req, res) => {
    try {


        const email = req.params.email;
        const folderName = req.params.folderName;
        const fileName = req.params.fileName;


        const fileContent = req.file.buffer;
        const contentType = req.file.mimetype;

    
        const uploadParams = {
          Bucket: process.env.bucketname,
          Key: `useFolder/${email}/${folderName}/${fileName}`,
  
          Body:fileContent ,// Assuming you're using multer's memory storage

          ContentType:contentType
        };



        const key=`useFolder/${email}/${folderName}/${folderName}.txt`

        const content={
   
           fileName: `useFolder/${email}/${folderName}/${fileName}`
   
        }
   
   
         registertextfile(key,content)
   








    
        const uploadResponse = await s3.putObject(uploadParams).promise();
    
        const s3Url = uploadResponse.Location; // The URL of the uploaded object

        const update = {};

        const fieldName = fileName.split(".")[0];
        const fieldName2 = folderName;

        update[fieldName] = `useFolder/${email}/${folderName}/${fileName}`;
        update[fieldName2] = 'Uploaded Documents';
    
    
  
      const userUpdate = await User.findOneAndUpdate(
        { email: req.params.email },
        update,
        { new: true }
      );
  
      if (!userUpdate) {
        console.error('User not found');
        return res.sendStatus(404);
      }
  
      res.sendStatus(200);
    } catch (error) {
      console.error('Error uploading PDF file:', error);
      res.sendStatus(400);
    }
  });











// uploading files..............

userRoutes.post("/uploadProjectsCertificate/:email/:fileName/:lengthOfFile/:extension/:folderName",upload.single('pdfFile'),async (req, res) => {
    try {
        const email = req.params.email;
        const folderName = req.params.folderName;
        const fileName = req.params.fileName;

        const fileContent = req.file.buffer;
        
        const contentType = req.file.mimetype;


  if(fileContent){



// uploading to s3 bucket..........................................................................



    const uploadParams = {
        Bucket: process.env.bucketname,
        Key: `useFolder/${email}/${folderName}/${fileName}`,

        Body:fileContent ,// Assuming you're using multer's memory storage

        ContentType:contentType
      };

      const key=`useFolder/${email}/${folderName}/${folderName}.txt`

      const content={
 
         filePath: `useFolder/${email}/${folderName}/${fileName}`
 
      }
 
      registertextfile(key,content)

      const uploadResponse = await s3.putObject(uploadParams).promise();





      const userUpdate = await User.findOneAndUpdate(
        { email: req.params.email },
        update,
        { new: true }
    );

// uploading to s3 bucket..........................................................................










  }      
    
 



   
         
   








        const userVerificationChange = await Verification.findOneAndUpdate({ candidateId: userUpdate._id }, { fieldName: 'underVerification' }, { new: true })
        console.log(userVerificationChange);
        if (!userUpdate) {
            // Handle case when the user is not found
            console.error('User not found');
            return res.sendStatus(404);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error('Error uploading PDF file:', error);
        res.sendStatus(400);
    }
})

// uploading files..............




// (edit profile....................................................................................................)



// adding education........................

userRoutes.post("/education/:id", async (req, res) => {
    try {
        const everything = req.body.education;

        // Add the "verified" field with value "false" to the "everything" object
        everything.verified = false;

        console.log("Education", everything);

        const key = `useFolder/${req.body.email}/registration.txt`;

        const contentarray = {
            education: everything,
        };

        // Convert "contentarray" to a JSON string
        const content = JSON.stringify(contentarray);

        // Update the text file with the content
        registertextfile(key, [content]);

        const userUpdateAcc = await User.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: { education: everything } },
            { new: true }
        );

        res.status(200).json({
            status: "Successfully completed",
            details: userUpdateAcc,
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message,
        });
    }
});



// adding job experience.............



userRoutes.post("/jobexperience/:id", async (req, res) => {
    try {
        const everything = req.body.JobExperience;
        console.log("everything",everything);



        // Add the "verified" field with the value "false" to the "everything" object
        everything.verified = false;

        const key = `useFolder/${req.body.email}/registration.txt`;

        const contentarray = {
            JobExperience: everything,
        };

        const content = JSON.stringify(contentarray);

        registertextfile(key, [content]);

        const userUpdateAcc = await User.findByIdAndUpdate({ _id: req.params.id }, {
            $set: { JobExperience: everything }
        }, { new: true });

        res.status(200).json({
            status: "Successfully completed",
            details: userUpdateAcc
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        });
    }
});







userRoutes.patch("/projectInfo/:id", async (req, res) => {
    try {
        const everything = req.body.projectInfo
        
        console.log(everything);


        const key=`useFolder/${req.body.email}/registration.txt` 

        const contentarray={
            projectInfo: everything 
        }
        


    // function tom ad

    const content = JSON.stringify(contentarray);

        
        
    registertextfile(key,[content])




        const userUpdateAcc = await User.findByIdAndUpdate({ _id: req.params.id }, {
            $set: { projectInfo: everything }
        }, { new: true });
        res.status(200).json({
            status: "Successfully completed",
            details: userUpdateAcc
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        })
    }
})



userRoutes.post("/certificationInfo/:id", async (req, res) => {
    try {
        const everything = req.body.certificationINfo
        console.log(everything);


        const key=`useFolder/${req.body.email}/registration.txt` 

        const contentarray={
            certificationINfo: everything
        }
        
          // function tom ad

          const content = JSON.stringify(contentarray);

        
        
          registertextfile(key,[content])
  



        const userUpdateAcc = await User.findByIdAndUpdate({ _id: req.params.id }, {
            $set: { certificationINfo: everything }
        }, { new: true });
        res.status(200).json({
            status: "Successfully completed",
            details: userUpdateAcc
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        })
    }
})


userRoutes.post("/otherInfo/:id", async (req, res) => {
    try {
        const everything = req.body.otherDocument


        const key=`useFolder/${req.body.email}/registration.txt` 

        const contentarray={
            otherDocument: everything
        }
        
      // function tom ad

      const content = JSON.stringify(contentarray);

        
        
      registertextfile(key,[content])



        console.log(everything);
        const userUpdateAcc = await User.findByIdAndUpdate({ _id: req.params.id }, {
            $set: { otherDocument: everything }
        }, { new: true });
        res.status(200).json({
            status: "Successfully completed",
            details: userUpdateAcc
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        })
    }
})





userRoutes.post("/account/:id", async (req, res) => {
    try {
        console.log(req.body);


const key=`useFolder/${req.body.email}/registration.txt` 

const content= req.body

// function tom ad

     registertextfile(key,content)


        const userUpdateAcc = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json({
            status: "Successfully completed",
            details: userUpdateAcc
        });
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        })
    }
})


// (edit profile.....................................................................................................................)


// get state by location............................................




userRoutes.get("/getstatebylocation/:location", async (req, res) => {

    const location = req.params.location;

    let geocodeResult
  
    try {


if(location){
     geocodeResult = await geocoder.geocode(location);
}

if (geocodeResult && geocodeResult.length > 0) {
    const newState = geocodeResult[0].state || 'Unknown';

    res.status(200).json({state:newState});
}
  
     

    } catch (error) {
      res.status(400).json({
        status: "Failed",
        details: error.message,
      });
    }
  });







// registration part ........................................................

userRoutes.post("/signup", async (req, res) => {
    try {
      


        const timestamp = new Date().toISOString();


        const hashPass = await hashGenerate(req.body.password);

        const content = {
            name: req.body.name,
            email: req.body.email,
            mobilenumber: req.body.mobilenumber,
            location: req.body.location,
            state:req.body.state,
            password: hashPass,
      
            RegistrationDate: calculateDate()
        };

        
    // here initially rregister file is not there it is creating automatically..................

        const lines = [];


        for (const key in content) {
            if (content.hasOwnProperty(key)) {
                lines.push(`${key}: ${content[key]}`);
            }
        }
        
        const contentString = lines.join('\n');

   
        const addcontent=`[${timestamp}]:\n${contentString}\n`;
    



        await s3.putObject({ Bucket: process.env.bucketname, Key: `useFolder/${req.body.email}/registration.txt`, Body: addcontent }).promise();




        const user = await User.findOne({ email: req.body.email });
        const adminPhoneNumber = await User.findOne({ mobilenumber: req.body.mobilenumber });
        if (user === null || !user) {

            if (adminPhoneNumber === null || !adminPhoneNumber) {
                console.log('enter');
                const hashPass = await hashGenerate(req.body.password);
                const user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    mobilenumber: req.body.mobilenumber,
                    location: req.body.location,
                    password: hashPass,
                    role: req.body.role,
                    RegistrationDate: calculateDate()
                });
                console.log(user);
                const newVerification = await Verification.create({ candidateId: user._id });
                const token = tokenGenerator(req.body.email)
                res.json({
                    status: "success",
                    message: "Registration succesful",
                    token: token,
                    email: user.email,
                    id: user._id
                });
            } else {
                res.status(400).json({
                    status: "Failed",
                    message: "Phone Number already Exist",
                });
            }


        } else {
            res.status(400).json({
                status: "Failed",
                message: "Email already Exist",
            });
        }
    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            message: error.message
        })
    }
})




// login part ........................................................







userRoutes.post("/login", async (req, res) => {
    try {

        const adminReferalCheck = await User.findOne({ email: req.body.email });

        if (adminReferalCheck === null || !adminReferalCheck) {
            res.status(400).json({
                status: "Failed",
                message: "User Not Found, Kindly signup ",
            });
        } else {
            let passCheck = await hashValidator(
                req.body.password,
                adminReferalCheck.password
            );

            if (passCheck) {

                let token = await tokenGenerator(req.body.email, process.env.JWT_KEY);

                res.status(200).json({
                    status: "Successfully Login",
                    token: token,
                    email: adminReferalCheck.email,
                    id: adminReferalCheck._id,
                    name: adminReferalCheck.name,
                    fullName: adminReferalCheck.fullName,
                });
            } else {
                res.json({
                    status:"Failed",
                    message:"Enter valid Password",
                });
            }
        }

        
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: "Check your credentials",
        });
    }
})



// search ichp by email................................................


userRoutes.post("/getichpbyemail", async (req, res) => {

    const { email } = req.body;

    try {
        // Use try-catch to handle errors
        const ichpdetails = await User.findOne({ email });

        if (ichpdetails) {
            res.status(200).json({
                status: "Success",
                ichpdata: ichpdetails
            });
        } else {
            res.status(404).json({
                status: "Failed",
                message: "User not found"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "Server error"
        });
    }
});





// updating the messages read count............


userRoutes.post("/updatemessagecount", async (req, res) => {
    
    const { userId, messagecount } = req.body;
  
    try {
      const userdetails = await User.findById(userId);
  
      if (!userdetails) {
        return res.status(404).json({
          status: "Error",
          message: "User not found"
        });
      }
  
      userdetails.messagecount = messagecount;
  
      await userdetails.save();
  
      res.json({
        status: "Success",
        message: "Message count updated successfully."
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "Error",
        message: "Server error"
      });
    }
  });
  

// update unredmessages in data base while we subtracting the message count with alerts length 

userRoutes.post("/updateunreadmessagecount", async (req, res) => {
    const { userId } = req.body;
  
    try {
      const userdetails = await User.findById(userId);
  
      if (!userdetails) {
        return res.status(404).json({
          status: "Error",
          message: "User not found"
        });
      }
  
      // Convert messagecount and alerts length to numbers
      const messageCount = parseInt(userdetails.messagecount, 10) || 0;
      const alertsLength = userdetails.alerts ? userdetails.alerts.length : 0;
  

      

      // Calculate unread messages
      userdetails.unreadmessages = (Math.max(0, parseInt(alertsLength) - parseInt(messageCount))).toString();
  
      await userdetails.save();
  
      res.json({
        status: "Success",
        data: userdetails.unreadmessages
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "Error",
        message: "Server error"
      });
    }
  });
  











// invite ichp team members.......................to send alert to ichp  with email as query to find the user...............

const mongoose = require('mongoose');


userRoutes.post("/sendinginvitation", async (req, res) => {


    const { email, companyId } = req.body;


        const formattedDate = moment().format('DD/MM/YY');


    try {
        // Find the ICHP details based on email
        const ichpdetails = await User.findOne({ email });

        // Find the company details based on the provided companyId
        const companydetails = await companySchema.findById(companyId).select({
            nameOfCompany: 1,
            industry: 1,
            city: 1,
            state: 1,
            companylogo: 1 // Include companylogo
        });

        // Check if either company details or ICHP details is not found
        if (!companydetails || !ichpdetails) {
            return res.status(404).json({
                status: "Error",
                message: "Company details or ICHP details not found for the provided user ID or email"
            });
        }

        // Initialize alerts array if it's not already initialized
        ichpdetails.alerts = ichpdetails.alerts || [];

        // Push a new alert for the team invitation
        ichpdetails.alerts.push({
            subject: "Team invitation",
            content: `Team invitation from ${companydetails.nameOfCompany} company as a team member. Click on the link to accept the invitation.`,
            data:companydetails,
            date:formattedDate,
        });

        await ichpdetails.save();

        res.json({
            status: "Success",
            message: "Invitation sent successfully."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "Server error"
        });
    }
});










// accepting a company  with user id and email of accepting person.........................................................




userRoutes.post("/acceptingcompanyinvitation", async (req, res) => {

    const { userid, email } = req.body;

    try {
        // Convert the userid to a valid ObjectId
        const userIdObject = mongoose.Types.ObjectId(userid);

        const userData = await User.findOne({ email: email }).select({
            name: 1,
            email: 1,
            location: 1,
            role: 1,
            industry: 1,
            subscriptiondetails: 1,
            JobExperience: 1,
            profilepicture: { $cond: [{ $ifNull: ["$profilepicture", false] }, 1, 0] }
        });

        const companydetails = await companySchema.findOne({ user: userIdObject })




        if (!companydetails || !userData) {
            return res.status(404).json({
                status: "Error",
                message: "Company details or user details not found for the provided user ID or email"
            });
        }

        // Check if Teammembers array exists, if not, create an empty array
        companydetails.Teammembers = companydetails.Teammembers || [];

        // Check if the user is not already in the Teammembers array
        const isUserInTeammembers = companydetails.Teammembers.some(member => member.email === userData.email);

        if (!isUserInTeammembers) {
            // Add the user to the Teammembers array
            companydetails.Teammembers.push(userData);
            await companydetails.save(); // Save the companydetails
        }

        res.json({
            userData: userData,
            companydetails: companydetails
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "Server error"
        });
    }
});























// adding role...............

userRoutes.post("/role/:id", async (req, res) => {


    try {

        console.log(req.body)


        const addcontent=`role:${req.body.role}\n`;
    
    const registertext = await s3.getObject({ Bucket:  process.env.bucketname, Key: `useFolder/${req.body.email}/registration.txt` }).promise();

    const updatedSenderContent = registertext.Body.toString('utf-8') + addcontent;



  await s3.putObject({ Bucket: process.env.bucketname, Key: `useFolder/${req.body.email}/registration.txt`, Body: updatedSenderContent}).promise();



        console.log(req.params.id);
        console.log(req.body.role);
        const role = await User.findByIdAndUpdate({ _id: req.params.id }, { role: req.body.role }, { new: true })
        res.status(200).json({
            status: "Updated",
        })
    }
    
    catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
});



userRoutes.post("/referralcodeGenerate/:id", async (req, res) => {
   


    const person = await User.findByIdAndUpdate(req.params.id, {
        refferalCodeGenerated: req.body.refferalCodeGenerated
    }, { new: true });
    res.send(person);
});






userRoutes.post("/updateiu/:id", async (req, res) => {
    try {



        console.log(req.body);


        // adding files to register.rxt.......................................................

        const content = {

            preferredLocation: req.body.preferredLocation,
            designation: req.body.designation,
            preferredDesignation: req.body.preferredDesignation,
            industry: req.body.industry,
            preferredIndustry: req.body.preferredIndustry,
            email: req.body.email,
            skills: req.body.skills,
            WorkExperienceYear: req.body.WorkExperienceYear,
            WorkExperienceMonth: req.body.WorkExperienceMonth,
            uploadeddate: calculateDate()

        }




        const key = `useFolder/${req.body.email}/registration.txt`



        // this function is used to add text in register.txt

        registertextfile(key, content)







        // adding files to register.rxt.......................................................


        const updateUser = await User.findByIdAndUpdate({ _id: req.params.id },
            {
                preferredLocation: req.body.preferredLocation,
                designation: req.body.designation,
                preferredDesignation: req.body.preferredDesignation,
                industry: req.body.industry,
                preferredIndustry: req.body.preferredIndustry,
                email: req.body.email,
                skills: req.body.skills,
                WorkExperienceYear: req.body.WorkExperienceYear,
                WorkExperienceMonth: req.body.WorkExperienceMonth,
            }, {
            new: true
        });







        res.status(200).json({
            status: "Updated",
            data: updateUser
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
})





userRoutes.post("/updateichp/:id", async (req, res) => {
    try {
        console.log(req.body);
        const updateUser = await User.findByIdAndUpdate({ _id: req.params.id },
            {
                industry: req.body.industry,
                location: req.body.location,
                skills: req.body.skills,
                hrTitle: req.body.hrTitle,
                WorkExperienceYear: req.body.WorkExperienceYear,
                WorkExperienceMonth: req.body.WorkExperienceMonth
            }, {
            new: true
        });
        res.status(200).json({
            status: "Updated",
            data: updateUser
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message
        })
    }
})



userRoutes.patch("/withdraw/:id/:amount", async (req, res) => {
    const userId = req.params.id;
    const withdrawalAmount = req.params.amount;
    const user = await User.findById({ _id: userId });
    console.log(user);
    if (user.Balance >= withdrawalAmount) {
        const newBalance = user.Balance - withdrawalAmount;
        const newWithdrawn = user.Withdrawn ? user.Withdrawn + withdrawalAmount : withdrawalAmount;
        console.log(newBalance, newWithdrawn);
        user.Balance = newBalance;
        user.Withdrawn = newWithdrawn;
        user.save((err) => {


            res.send('User balance and withdrawn amounts updated successfully.');
        });

    } else {
        res.status(400).json({
            Status: "Failed",
            message: 'Unable to withdraw, Check the balance amount'
        })
    }
})



userRoutes.post("/addReferral", async (req, res) => {

    try {

        const reffererDetails = req.body.ReffererDetails;
        const result = req.body.paymentAmount * 0.2;

        console.log(reffererDetails.Earned);
        let EarnedMoney = reffererDetails.Earned === undefined ? result : reffererDetails.Earned + result;
        let balanaceMoney = reffererDetails.Balance === undefined ? result : reffererDetails.Balance + result;

        const newRefferal = await User.findByIdAndUpdate({ _id: req.body.id }, {
            refferalCodeTaken: req.body.refferalCodeTaken,
            refferedBy: reffererDetails.name
        }, { new: true });

    // adding text file to register fill

    const Key= `useFolder/${req.body.email}/registration.txt`

    const content={
        refferalCodeTaken: req.body.refferalCodeTaken,
            refferedBy: reffererDetails.name
    }

    registertextfile(Key,content)

    // adding text file to register fill


    const newRefferalId=newRefferal._id


    const refererUser = await User.findByIdAndUpdate(
        reffererDetails._id,
        { $addToSet: { RefferalCount: newRefferalId }, Earned: EarnedMoney, Balance: balanaceMoney },
        { new: true }
      );
  
      

        res.status(200).json({
            status: "Success",
            details: 'Details added',
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            details: error.message
        })
    }
})



userRoutes.get("/:id", async (req, res) => {
    try {
        console.log('enter new feed');
        const newRefferal = await User.findById({ _id: req.params.id });
        console.log(newRefferal);
        res.status(200).json({
            status: "Success",
            details: newRefferal,
        })
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            details: error.message
        })
    }
})







// api for applied jobs page.........................

async function getJobDetails(jobId) {
    const jobData = await Job.findById(jobId);
    return jobData;
  }
  
  userRoutes.get("/appliedjobs/:userId", async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const userData = await User.findById(userId);
      
      const userAppliedJobs = userData.appliedjobs;
  
      const dataToSend = await Promise.all(
        userAppliedJobs.map(async (appliedJob) => {
          const jobData = await getJobDetails(appliedJob.jobId);
          return {
            job: jobData,
            appliedDate: appliedJob.appliedDate,
          };
        })
      );
  
      res.status(200).json(dataToSend);

    } catch (error) {
      res.status(400).json({
        status: "Failed",
        details: error.message,
      });
    }
  });




// api to know who applied for job with job id.................


userRoutes.get("/whoapplied/:jobId", async (req, res) => {

    const jobId = req.params.jobId;
  
    try {
      const userData = await Job.findById({_id:jobId});
      
    if(userData){

        res.status(200).json(userData.applied );

    }
  
    

    } catch (error) {
      res.status(400).json({
        status: "Failed",
        details: error.message,
      });
    }
  });








// api for giving suggestions upto 8 it is either people company or 



  

userRoutes.get("/searchbarsuggestions/:keyword", async (req, res) => {

    const keyword = req.params.keyword
  
    try {
      // Use regex to search for users and companies with the provided keyword


      const userRegex = new RegExp(keyword, 'i'); // 'i' for case-insensitive search
      const companyRegex = new RegExp(keyword, 'i');
  
      const userResults = await User.find({
        $or: [{ name: userRegex },{location:userRegex },{designation:userRegex},{city:userRegex}],
      }).limit(4);
  
      const companyResults = await companySchema.find({
        nameOfCompany: companyRegex,
      }).limit(4);


   const jobresult=await Job.find({

    $or: [{ companyName: companyRegex },{title:companyRegex },{industry:companyRegex},{location:companyRegex}],

}).limit(4);
  



      // Combine the results from users and companies
      const combinedResults = [...userResults, ...companyResults,...jobresult];
  
      res.status(200).json({
        status: "Success",
        data: combinedResults,
      });
    } catch (error) {
      res.status(400).json({
        status: "Failed",
        details: error.message,
      });
    }
  });





// save tasks of consultant what he choosan...........






userRoutes.post("/addconsultantchoosentasks", async (req, res) => {
    try {
        const taskarray = req.body.choosentasks;
        const userId = req.body.userId;

        console.log(taskarray)

        if (!Array.isArray(taskarray)) {
            return res.status(400).json({ status: "Failed", details: "choosentasks should be an array" });
        }

        if (!userId) {
            return res.status(400).json({ status: "Failed", details: "userId is required" });
        }

        const userIddetails = await User.findById(userId);

        if (!userIddetails) {
            return res.status(404).json({ status: "Failed", details: "User not found" });
        }

        userIddetails.choosentasks = taskarray;
        await userIddetails.save();

        res.status(200).json({
            status: "Success",
            details: userIddetails,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            details: error.message
        });
    }
});


// payment for bcc compny page............................................................................



//payment status......................................................................


userRoutes.post('/companypaymentstatus/:Companyname', async (req, res) => {
  
    const Companyname = req.params.Companyname;
  
    try {
      if (req.body.transactionId && req.body.code === "PAYMENT_SUCCESS") {
        const formattedDate = moment().format('DD/MM/YY');
  
        // Parse the original date and add 1 year to calculate the expiry date
        const expiryDate = moment(formattedDate, "DD/MM/YY").add(1, 'years').subtract(1, 'day')

        const formattedExpiryDate = expiryDate.format('DD/MM/YY');
  
        // Find the company by company name

        const companydetails = await companySchema.findOne({nameOfCompany:Companyname});
  
        if (!companydetails) {
          return res.status(404).json({
            status: "Error",
            message: "company not found"
          });
        }
  
        // If 'subscriptiondetails' doesn't exist, create it
        if (!companydetails.subscriptiondetails) {
            companydetails.subscriptiondetails = {};
        }
  
        // Update the subscription details
        companydetails.subscriptiondetails.transactionId = req.body.transactionId;
        companydetails.subscriptiondetails.transactionDate = formattedDate;
        companydetails.subscriptiondetails.expiryDate = formattedExpiryDate;
  
        // Save the updated user
        await companydetails.save();
  
        // Redirect the user to a thank you page
        return res.redirect('https://karandszone.com/bccpaymentsucess');
      }
  
      // If payment is not successful, redirect the user to an error page
      return res.redirect('https://karandszone.com/bccpaymenterror');
    } catch (error) {
      console.error('Error processing payment success:', error);
      // Handle errors and redirect to an error page
      return res.redirect('https://karandszone.com/bccpaymenterror');
    }
  });
  













// for payment.....................

function generateUniqueId(prefix) {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    const uniqueId = (prefix ? prefix + '-' : '') + timestamp + '-' + random;
    return uniqueId;
  }
  
  
  const crypto = require('crypto');
  
  
  
  

userRoutes.post('/paymentforcompany', async (req, res) => {


const Companyname=req.body.Companyname



    try {
  
  
      const data = {
        merchantId: 'M18MKETAFZWW',
        merchantTransactionId: generateUniqueId('MT'),
        merchantUserId: generateUniqueId('MTU'),
        amount: 100,
        redirectUrl: `https://backend.karandszone.com/karands/users/companypaymentstatus/${Companyname}`, 
        redirectMode: 'POST',
        callbackUrl: 'https://karandszone.com/callbackPage', 
        mobileNumber: '9381264049',
        paymentInstrument: {
          type: 'PAY_PAGE',
        },
      };
  
  
      const encode = Buffer.from(JSON.stringify(data)).toString('base64');
  
      const saltKey = 'e9cad0d4-3f72-40dd-849d-2b4ee9d2a1e8';
      const saltIndex = 1;
  
      const string = `${encode}/pg/v1/pay${saltKey}`;
      const sha256 = crypto.createHash('sha256').update(string).digest('hex');
      const finalXHeader = `${sha256}###${saltIndex}`;
  
     
  
  
  
      const response = await axios.post('https://api.phonepe.com/apis/hermes/pg/v1/pay', {
          request: encode,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': finalXHeader,
            'accept': 'application/json',
          },
        });
        
  
  
  
      const responseData = response.data;
  
      // Redirect to the response URL
      const redirectURL = responseData.data.instrumentResponse.redirectInfo.url;
  
      
      // res.redirect(redirectURL); // Redirect the user to PhonePe's payment page
      
  
  res.json(responseData.data.instrumentResponse.redirectInfo.url)
  
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  






// add user bank account details in the database after verifying bank details from api............


































// fetch all alerts in auser with userid ..........................


userRoutes.post("/fetchalerts", async (req, res) => {

    const { userid } = req.body;

    try {
        const user = await User.findById(userid).select('alerts');

        if (!user) {
            return res.status(404).json({
                status: "Error",
                message: "User not found"
            });
        }

        res.json({
            status: "Success",
            alerts: user.alerts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "Server error"
        });
    }
});




// api to cjheck email exist or not.................................................





userRoutes.post("/checkemailexist", async (req, res) => {

    const { email } = req.body;

    try {
        const user = await User.findOne({email:email}).select("-AdditionalPortalAccesspassword -password -subscriptiondetails")

    
        res.json({
            status: "Success",
            user: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "Server error"
        });
    }
});




// here we are inviting admin and sub admins here,...........wit email and   and also we are sending notification to user......................


userRoutes.post("/inviteadminwithemail", async (req, res) => {
    const formattedDate = moment().format('DD/MM/YY');
    const { email, AdditionalPortalAccess,AdditionalPortalAccessPermissions} = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email }).select("name email AdditionalPortalAccess alerts AdditionalPortalAccessPermissions");
  
      if (!user) {
        return res.status(404).json({
          status: "Error",
          message: "User not found"
        });
      }
  
      // Generate a one-time password
      const password = generateOTP();
  
      // Set the user's AdditionalPortalAccess and password
      user.AdditionalPortalAccess = AdditionalPortalAccess;
      user.AdditionalPortalAccesspassword = password;

      user.AdditionalPortalAccessPermissions=AdditionalPortalAccessPermissions.map((data)=>{return data.value})

      user.oneTimePasswordChanges = "false";
  
      // Send a welcome email
      const emailContent = `Hi ${user.name}\n\nWe are delighted to welcome you to Karands Business Services. We appreciate your interest in joining our team and look forward to working together.\n\nHere are your company credentials:\nEmail ID: ${user.email}\nOne-Time Password (OTP): ${password}\nLink to Login: https://${process.env.IP_ADDRESS}/invite/login\n\nIf you have any questions or need assistance, please don't hesitate to reach out.\n\nOnce again, welcome aboard! We're thrilled to have you as part of our organization.\n\nBest regards,\nKarands Business Services`;
  
      await emailSender(emailContent, "Welcome to Karands!", user.email);
  
      // Send a notification to the user dashboard
      const message = {
        subject: "Team Invite",
        content: `Team Inite  clike here to login`,
        data: {
          userId: user._id, // Assuming the user ID is needed here
          profilepic: user.profilePicture,
        },
        date: formattedDate
      };

   console.log("userdata",user)

  
      user.alerts.push(message);
  
      // Save the updated user object to the database
      await user.save();
  
      res.json({
        status: "Success",
        adminemail: user.email
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: "Error",
        message: "Server error"
      });
    }
  });




//   here we are inviting Team members to.........................


userRoutes.post("/InviteTeamMember", async (req, res) => {

    const formattedDate = moment().format('DD/MM/YY');

    const { TeamMemberEmail, AdditionalPortalAccess, AdditionalPortalAccessPermissions,TeamLeadEmail } = req.body;

    try {
        // Find the team member user by email............
        const user = await User.findOne({ email: TeamMemberEmail }).select("name email AdditionalPortalAccess alerts AdditionalPortalAccessPermissions");

    // finding TeamLead details.......


    const TeamLeadDetails=await User.findOne({email:TeamLeadEmail}).select("_id name email state location ")

        if (!user||!TeamLeadDetails) {
            return res.status(404).json({
                status: "Error",
                message: "User not found"
            });
        }

        // Generate a one-time password
        const password = generateOTP();

 
        user.AdditionalPortalAccesspassword = password;


        // Create or update the user's AdditionalPortalAccess and password
        user.AdditionalPortalAccess = AdditionalPortalAccess || ""

        user.AdditionalPortalAccesspassword = password

        // Map the 'value' property from AdditionalPortalAccessPermissions if it exists
        user.AdditionalPortalAccessPermissions = AdditionalPortalAccessPermissions
            ? AdditionalPortalAccessPermissions.map((data) => data.value)
            : []

        //   user.AdditionalPortalAccessPermissions=AdditionalPortalAccessPermissions.map((data)=>{return data.value})

        user.oneTimePasswordChanges = "false";

        // Send a welcome email
        const emailContent = `Hi ${user.name}\n\nWe are delighted to welcome you to Karands Business Services. We appreciate your interest in joining our team and look forward to working together.\n\nHere are your company credentials:\nEmail ID: ${user.email}\nOne-Time Password (OTP): ${password}\nLink to Login: https://${process.env.IP_ADDRESS}/invite/login\n\nIf you have any questions or need assistance, please don't hesitate to reach out.\n\nOnce again, welcome aboard! We're thrilled to have you as part of our organization.\n\nBest regards,\nKarands Business Services`;

        await emailSender(emailContent, "Welcome to Karands!", user.email);

        // Send a notification to the user dashboard
        const message = {
            subject: "Team Invite",
            messagetype:"show accept button",
            content: `Team Inite  clike here to login to admin dashboard`,
            data: {
                TeamLeadDetails: TeamLeadDetails, // here in notification we are sending team lead details
               
            },
            date: formattedDate
        };

       


        user.alerts.push(message);

        // Save the updated user object to the database
        await user.save();

        res.json({
            status: "Success",
            TeamMemberEmail: user.email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "Server error"
        });
    }
})




// accepting  team  invitation.............................................


// working list are
// sending notifications  working && email also
// adding user into team members list of team lead

userRoutes.post("/AcceptingTeamInvite", async (req, res) => {
    const formattedDate = moment().format('DD/MM/YY');
    const { TeamMemberEmail, TeamLeadEmail, messageId } = req.body;

    try {
        // Find the team member user by email...excluding some details to send to frontend
        const user = await User.findOne({ email: TeamMemberEmail }).select("-password -subscriptiondetails");

        // Finding TeamLead details
        const TeamLeadDetails = await User.findOne({ email: TeamLeadEmail })
        .select("_id name email state location alerts AdditionalPortalAccessTeam")
        .select("-password -subscriptiondetails");
    
        if (!user || !TeamLeadDetails) {
            return res.status(404).json({
                status: "Error",
                message: "User not found"
            });
        }


 

        // Send a mail to Team lead about accepting status to the lead
        const emailContent = `Hi ${TeamLeadDetails.name}\n\n  ${user.name} has Accepted your Team invitation.`;
        await emailSender(emailContent, "Welcome to Karands!", user.email);

        // Send a notification to the Team lead user dashboard
        const message = {
            subject: "Invitation Accepted",
            messagetype: "Alert",
            content: `hi. ${user.name} Accepted Your Team Invitation`,
            data: {
                TeamMemberDetails: user, // here in notification, we are sending team lead details
            },
            date: formattedDate
        };




        // Push messages to alerts
        TeamLeadDetails.alerts.push(message);

        // Ensure that AdditionalPortalAccessTeam is defined as an array

        TeamLeadDetails.AdditionalPortalAccessTeam = TeamLeadDetails.AdditionalPortalAccessTeam || [];


        // Search for the user in AdditionalPortalAccessTeam by email

        // Ensure that AdditionalPortalAccessTeam is defined as an array
        TeamLeadDetails.AdditionalPortalAccessTeam = TeamLeadDetails.AdditionalPortalAccessTeam || [];

        // Search for the user in AdditionalPortalAccessTeam by email
        const existingUserIndex = TeamLeadDetails.AdditionalPortalAccessTeam.findIndex(existingUser => existingUser.email === user.email);





        // If the user is not found, push it to the AdditionalPortalAccessTeam
        if (existingUserIndex === -1) {
            TeamLeadDetails.AdditionalPortalAccessTeam.push(user);
        }



        // Delete message after accepting the invitation
        if (messageId) {
            // Filter messages with the given messageId
            user.alerts = user.alerts.filter((data) => data._id && data._id.toString() !== messageId);
        }





         





        // Save the updated TeamLeadDetails object to the database
        await TeamLeadDetails.save();


        // adding team lead details in user account../....



        user.AdditionalPortalAccessTeamLead=TeamLeadDetails

        // Save the updated user object to the database
        await user.save();




        res.json({
            status: "Success",
            TeamMemberEmail: user.email,
            AdditionalPortalAccessTea:TeamLeadDetails.AdditionalPortalAccessTeam
        });
    } catch (error) {
        console.error(error);
        res.json({
            status: "Error",
            message: "Server error"
        });
    }
});





































// list of verified and unverified userslist..............


userRoutes.post("/listofverifiedandunverified/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const userdetails = await User.findById(id);

        if (
            ["Admin", "Sub Admin", "Super Admin"].includes(userdetails.role) ||
            ["Admin", "Sub Admin", "Super Admin"].includes(userdetails.AdditionalPortalAccess)
        ) {
            // Define a query for unverified users
            const unverifiedQuery = {
                role: { $in: ["iu", "ichp"] },
                $or: [
                    { "aadharCardverified.status": "false" },
                    { "panCardverified.status": "false" },
                    { "aadharCardverified.status": null },
                    { "panCardverified.status": null }
                ]
            };

            // Define a query for verified users
            const verifiedQuery = {
                role: { $in: ["iu", "ichp"] },
                $and: [
                    { "aadharCardverified.status": "true" },
                    { "panCardverified.status": "true" }
                ]
            };

            // Query the database to get unverified and verified users
            const unverifiedUsers = await User.find(unverifiedQuery).select("-subscriptiondetails -password -emailotp -smsotp");
            const verifiedUsers = await User.find(verifiedQuery).select("-subscriptiondetails -password -emailotp -smsotp");
            

            res.json({
                status: "Success",
                unverifiedusers: unverifiedUsers,
                verifiedusers: verifiedUsers
            });
        } else {
            res.json({ message: "Not a valid user" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "Server error"
        });
    }
});








// consirm empin .............................


userRoutes.post("/verifyempinofuser/:id", async (req, res) => {
    const id = req.params.id;
    const { empin } = req.body;

    try {
        const userdetails = await User.findById(id);

        if (userdetails.empin) {
            if (userdetails.empin && userdetails.empin === empin) { // Use strict equality (===) for comparison
                return res.json({
                    status: "success",
                    empin: true
                });
            } else {
                return res.json({
                    message: "empin is not correct.",
                    empin: false
                });
            }
        } else {
            return res.json({ message: "User not found", empin: false });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Error",
            message: "Server error"
        });
    }
});


























module.exports = userRoutes