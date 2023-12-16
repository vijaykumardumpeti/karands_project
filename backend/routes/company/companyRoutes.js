const companyRoutes = require('express').Router();
// const multer = require('multer');
const fs = require('fs')
const Company = require('../../models/company/companySchema');
const path = require('path');


const User=require('../../models/userSchema')


// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         // Get the email from the URL
//         const email = req.params.email;

//         // Check if the email folder exists, if not, create it

//         const emailFolderPath = `useFolder/${req.params.email}/`;

//         if (!fs.existsSync(emailFolderPath)) {
//             fs.mkdirSync(emailFolderPath);
//         }


//         const companyFolderPath = path.join(emailFolderPath, req.params.folderName);
//         if (!fs.existsSync(companyFolderPath)) {
//             fs.mkdirSync(companyFolderPath);
//         }
//         const companySubFolderPath = path.join(companyFolderPath, req.params.subfolder);
//         if (!fs.existsSync(companySubFolderPath)) {
//             fs.mkdirSync(companySubFolderPath);
//         }
//         console.log(companyFolderPath)
//         cb(null, companySubFolderPath);
//     },
//     filename: (req, file, cb) => {
//         const fileName = req.params.fileName;
//         const fileExtension = req.params.fileExtension;
//         cb(null, `${fileName}`);
//     },
// });


// const upload = multer({ storage });







// get about company........................................................


companyRoutes.get("/aboutcompany/:id", async (req, res) => {
    try {
        const aboutCompany = await Company.findById({ _id: req.params.id })
        res.send(aboutCompany)
    } catch (error) {

    }
})





// companyRoutes.put("/upload/:email/:fileName/:folderName/:subfolder/:id", upload.single('pdfFile'), async (req, res) => {
//     try {
//         console.log('enter');
//         const folderPath = `useFolder/${req.params.email}/`;
//         const subFolder = `useFolder/${req.params.email}/${req.params.folderName}`
//         const subFolderInside = `useFolder/${req.params.email}/${req.params.folderName}/${req.params.subfolder}`;
//         let pathFromSave = path.join(`C:\\KARANDS\\BACKEND\\`, subFolder, req.params.fileName);
//         const fieldName = req.params.fileName.split(".")[0];
//         const update = {};
//         update[fieldName] = pathFromSave;

//         const userUpdate = await Company.findByIdAndUpdate(
//             { _id: req.params.id },
//             update,
//             { new: true }
//         );
//         res.sendStatus(200);
//     } catch (error) {
//         console.error('Error uploading PDF file:', error);
//         res.sendStatus(400);
//     }
// });




// companyRoutes.patch("/updation", async (req, res) => {
//     const newUpdate = await Company.updateMany({}, { $set: { postedJob: 0 } })
//     res.send(newUpdate)
// })






// companyRoutes.patch("/subscription/:id", async (req, res) => {
//     try {
//         var currentDate = new Date();
//         const filteringDate = `${currentDate.getFullYear()}/${currentDate.getMonth()}/${currentDate.getDate()}`
//         var nextYearDate = `${currentDate.getFullYear() + 1}/${currentDate.getMonth()}/${currentDate.getDate()}`
//         const newUpdate = await Company.findByIdAndUpdate({ _id: req.params.id }, {
//             SubscriptionsDate: filteringDate,
//             expiryDate: nextYearDate,
//         }, { new: true })
//         const newUpdateInAdmin = await

//             res.status(200).json({
//                 status: "Sucess",
//                 details: newUpdate
//             })
//     } catch (error) {
//         res.status(400).json({
//             Status: 'Failed',
//             message: error.message
//         })
//     }
// })


//   adding company..............................................................................in use in  editcompany page..........


companyRoutes.post("/addcompany",async (req, res) => {


    try {

        let addCompany;

        // Ensure userdetails is defined before using it
        const userdetails = await User.findById(req.body.user);




        if (!userdetails) {
            return res.status(404).json({
                status: "Failed",
                message: "User not found",
            });
        }



        // Check if company with the same name already exists

        const existingCompany = await Company.findOne({
            nameOfCompany: req.body.nameOfCompany,
        });

        if (existingCompany) {
            // Company already present, send alert to frontend
            return res.status(400).json({
                status: "Failed",
                message: "Company already present",
            });
        }


       



   if(req.body.gstNo){

     addCompany = await Company.create({
        nameOfCompany: req.body.nameOfCompany,
        concernPerson: req.body.concernPerson,
        dateOfRegistration: req.body.dateOfRegistration,
        noOfEmployee: req.body.noOfEmployee,
        primaryAddress: req.body.primaryAddress,
        secondaryAddress: req.body.secondaryAddress,
        city: req.body.city,
        state: req.body.state,
        industry: req.body.industry,
        skills: req.body.skills,
        mobileNumber: req.body.mobileNumber,
        domainEmail: req.body.domainEmail,
        website: req.body.website,
        gstNo: req.body.gstNo,
        aboutCompany: req.body.aboutCompany,
        user: req.body.user,
    })



    const userdetails=await User.findById(req.body.user)



    const data={
        nameOfCompany: req.body.nameOfCompany,
        concernPerson: req.body.concernPerson,
        dateOfRegistration: req.body.dateOfRegistration,
        noOfEmployee: req.body.noOfEmployee,
        primaryAddress: req.body.primaryAddress,
        secondaryAddress: req.body.secondaryAddress,
        city: req.body.city,
        state: req.body.state,
        industry: req.body.industry,
        skills: req.body.skills,
        mobileNumber: req.body.mobileNumber,
        domainEmail: req.body.domainEmail,
        website: req.body.website,
        gstNo: req.body.gstNo,
        aboutCompany: req.body.aboutCompany,

    }




    userdetails.usercompanies.push(data)



    await userdetails.save()



}

else {
    addCompany = await Company.create({
        nameOfCompany: req.body.nameOfCompany,
        concernPerson: req.body.concernPerson,
        dateOfRegistration: req.body.dateOfRegistration,
        noOfEmployee: req.body.noOfEmployee,
        primaryAddress: req.body.primaryAddress,
        secondaryAddress: req.body.secondaryAddress,
        city: req.body.city,
        state: req.body.state,
        industry: req.body.industry,
        skills: req.body.skills,
        mobileNumber: req.body.mobileNumber,
        domainEmail: req.body.domainEmail,
        website: req.body.website,
        aboutCompany: req.body.aboutCompany,
        user: req.body.user,
    })


    const data={
        nameOfCompany: req.body.nameOfCompany,
        concernPerson: req.body.concernPerson,
        dateOfRegistration: req.body.dateOfRegistration,
        noOfEmployee: req.body.noOfEmployee,
        primaryAddress: req.body.primaryAddress,
        secondaryAddress: req.body.secondaryAddress,
        city: req.body.city,
        state: req.body.state,
        industry: req.body.industry,
        skills: req.body.skills,
        mobileNumber: req.body.mobileNumber,
        domainEmail: req.body.domainEmail,
        website: req.body.website,
        aboutCompany: req.body.aboutCompany,

    }




    userdetails.usercompanies.push(data)



    await userdetails.save()






}



        res.status(200).json({
            status: "Success",
            details: addCompany._id
        })
    } catch (error) {
        res.send(error.message)
    }
});



// edit company...................................................................................


companyRoutes.post("/editcompany/:id", async (req, res) => {
    try {
        const companyEdit = await Company.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.send(companyEdit)
    } catch (error) {
        res.send(error)
    }
})




// delete compnay......................................................................................


companyRoutes.delete("/deletecompany/:id", async (req, res) => {
    try {
        console.log('enterdelete');
        const deleteCompany = await Company.findByIdAndDelete({ _id: req.params.id })
        res.send(deleteCompany)
    } catch (error) {
        res.send(error)
    }
})


// get compnay accoring to userid.............................................................................


companyRoutes.get("/getcompany/:id", async (req, res) => {


   const id=req.params.id


    const allCompany = await Company.find({user:id});




    res.send(allCompany)



})


// get compnay  by company id....................................................

companyRoutes.get("/getcompanybyid/:id", async (req, res) => {


    const id=req.params.id
 
 
     const allCompany = await Company.find({_id:id});
 
 
 
 
     res.send(allCompany)
 
 
 
 })
 

// get all companies......with name...........and statr and end index....



companyRoutes.post("/getcompanies/:skip/:limit", async (req, res) => {
    try {
      const name = req.body.name;
      const skipCount = parseInt(req.params.skip) || 0;
      const limitCount = parseInt(req.params.limit) || 4;
  
      let allCompany;
  
      if (name) {
        allCompany = await Company.find({ nameOfCompany: new RegExp(name, 'i') })
                                  
      } else {
        allCompany = await Company.find({})
                                  .skip(skipCount)
                                  .limit(limitCount);
      }
  
      res.json(allCompany); // Use res.json to send JSON response
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  




module.exports = companyRoutes;