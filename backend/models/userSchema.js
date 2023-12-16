const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
  email: {unique: true, type: String },
  name: {  type: String },

  profilepicture:{ type: String},
  
  empin:{type:String},
  
  mobilenumber: {  unique: true, type: Number },
  location: {  type: String },
  state:{type:String},
  Professionalstate:{type:String},
  password: { type: String },
  role: { type: String },

  AdditionalPortalAccess:{type:String},

  AdditionalPortalAccessPermissions:[],

  AdditionalPortalAccesspassword:{type:String},
  AdditionalPortalAccessTeam:[],

  AdditionalPortalAccessTeamLead: {
    type:Object,
    ref: 'User',  // Reference to the User model
},


  designation: String,
  WorkExperienceYear: { type: String },
  WorkExperienceMonth: { type: String },
  industry: String,
  resume: String,
  fullName: String,
  gender: String,
  DOB: String,
  MartialStatus: String,
  flatNum: String,
  streetName: String,
  city: String,
  State: String,
  pincode: Number,
  language: Array,
  about: String,
  faceBookLink: String,
  twitterLinks: String,
  linkedInLink: String,
  instagramLink: String,
  gitHubLink: String,
  otherLinks: String,
  education: [{
    qualification:{type:String},
    course:{type:String},
    specialization:{type:String},
    college:{type:String},
    courseType:{type:String},
    passingYear:{type:String},
    verified:{type:Boolean,default:false},

    Convocation:{type:String},
    ConsolidatedMarksheets:{type:String},
    IndividualMarksheet:{type:String},
    othersEducation:{type:String},
    whoaccepted:{
      accepteduserId:{type:String},

      accepteduseremail:{type:String},
      status:{type:String},
      
      date: { type: String }

    },
    assignedto:{

      AssigneduserIds:[],
      
      Assigneduseremails:[],

      accepteduseremail:{type:String},
      status:{type:String},
      
      date: { type: String }
    },
    note:[],
    status:{type:String}
  }],

  educationstatus:{type:String},

  JobExperience: [{
    

    designation: { type: String },
    companyName: { type: String },
    locationOfCompany: { type: String },
    experienceStart: { type: String },
    experienceEnd: { type: String },
    salarySymbol: { type: String },
    annualSalaryInLakhs: { type: String },
    annualSalaryInThousands: { type: String },
    industry: { type: String },
    functionalArea: { type: String },
    description: { type: String },
    skills: [],
    experienceLevel: { type: String },
    verified: { type: Boolean, default: false },

    OfferLetter: { type: String },
    AppointmentLetter: { type: String },
    AppraisalLetter: { type: String },
    SalarySlips: { type: String },
    Rewards: { type: String },

    othersProfessional: { type: String },



    whoaccepted: {
      accepteduserId: { type: String },

      accepteduseremail: { type: String },
      status: { type: String },

      date: { type: String }

    },
    assignedto:{

      AssigneduserIds:[],
      
      Assigneduseremails:[],

      accepteduseremail:{type:String},
      status:{type:String},
      
      date: { type: String }
    },
    note:[],
    status:{type:String},
    
    mailsended:{type:Boolean}, 
    formviewed:{type:Boolean},
    hrform:{type:Object}

  }],
  jobexperiencestatus:{type:String},
  usercompanies:[],
  projectInfo: [],
  certificationINfo: [],
  otherDocument: [],
  refferalCodeGenerated: String,
  refferalCodeTaken: String,
  refferedBy: String,
  preferredIndustry: Array,
  preferredLocation: Array,
  preferredDesignation: Array,
  skills: Array,
  hrTitle: String,
  RefferalCount:[],
  Balance: Number,
  Earned: Number,
  Withdrawn: Number,
  SubscriptionsDate: String,
  expiryDate: String,
  RegistrationDate: {  type: String },
  aadharCard: String,
  panCard: String,
  passport: String,
  license: String,
  voterId: String,
  othersPersonal: String,
  Convocation: String,
  ConsolidatedMarksheets: String,
  IndividualMarksheet: String,
  othersEducation: String,
  OfferLetter: String,
  AppointmentLetter: String,
  AppraisalLetter: String,
  SalarySlips: String,
  Rewards: String,
  othersProfessional: String,
  projectDetails: String,
  certificationDetails: String,
  educationalDetails: String,
  professionalDetails: String,
  personalDetails: String,
  othersProject: [],
  othersCertificate: [],
  emailotp: String,
  smsotp:String,
  choosentasks:[],
  expirationOtp: Date,
  emailVerified: String,
  phoneVerified: String,
  bankdetails:[],
  permission:String,
  featureRole:[],
  verified:{type:String,default:false},
  oneTimePasswordChanges:{type:String,default:false},
  profilePicture:{type:String},
  appliedjobs: [
    {
      jobId: {
        type:String,
       
      },
      appliedDate: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
      }
    },
  ],
  hrform: [
  
    {
      CompanyName:{
        type:String

      },
      Attendance_and_Punctuality: {
        type: Number, // Assuming you want to store numeric values
        min: 1,
        max: 5,

      },
      Communication_Skills: {
        type: Number,
        min: 1,
        max: 5,
   
      },
      Respectfulness: {
        type: Number,
        min: 1,
        max: 5,
     
      },
      Teamwork_and_Communication_Skills: {
        type: Number,
        min: 1,
        max: 5,
      
      },
      achievements: String,
      areas_improvement: {
        type: Number,
        min: 1,
        max: 5,
   
      },
      attitude_fit: {
        type: Number,
        min: 1,
        max: 5,
      
      },
      company_policies: {
        type: Number,
        min: 1,
        max: 5,
     
      },
      conduct: {
        type: Number,
        min: 1,
        max: 5,
      
      },
      disciplinary_actions: {
        type: String,
        enum: ['yes', 'no'],
   
      },
      performance: {
        type: Number,
        min: 1,
        max: 5,

      },
      professionalism: {
        type: Number,
        min: 1,
        max: 5,
  
      },
      reason_for_leaving: String,
      reasonable_accommodations: {
        type: String,
        enum: ['yes', 'no'],
     
      },
      rehire_eligibility: {
        type: String,
        enum: ['yes', 'no'],
    
      },
      strengths: {
        type: Number,
        min: 1,
        max: 5,
      
      },
      work_ethic: {
        type: Number,
        min: 1,
        max: 5,
     
      },
  }


  ],

alerts:[{
  subject:{type:String},
  messagetype:{type:String},
  content:{type:String},
  data:{type:Object},
  date:{type:String}
}],
subscriptiondetails: {
  transactionId: { type: String, default: 'FAKE12345' },
  transactionDate: { type: String, default: '11/11/2023' },
  expiryDate: { type: String, default: '11/11/2025' }
},

  aadharCardverified:{
    status: {
      type: String,default:"false"
    },
    data: {
      type: Object, // Define data as an object type
      default: {} // You can set a default value if needed
    }
  },  
  
  panCardverified: {

    status: {
      type: String
    },


    data: {
      type: Object, // Define data as an object type
      default: {} // You can set a default value if needed
    }
  },


  acceptededucationtask:[
    {
      userid: { type: String },
      assignedby:{type:String},
      collegename: { type: String },
      qualification:{type:String},
      date: { type: String },
      status:{type:String}

    }
  ]
,

  acceptedjobtask:[
    {
      userid: { type: String },
      assignedby:{type:String},
      companyname: { type: String },
      experienceStart:{type:String},
      date: { type: String },
      status:{type:String}

    }
  ]
,


  acceptedcompanytask: [{
    companyname: { type: String },
    date: { type: String }

  }

  ],
Declinededucationtask:[],
Declinedjobtask:[],
Declinedcompanytask:[],

completededucationtask:[],

completedjobtask:[],
  
  assignededucationtask:[{
    userid:{type:String},
    userdetails: {
      name: { type: String },
      email: { type: String },
      mobilenumber: { type: String }
    },
    college:{type:String},
    qualification:{type:String},
    date:{type:String},
  
    assignedto: [],
    Assigneduseremails:[],
   
    Accepteddate:{type:String},
    status:{type:String},
  
    Accepteduser:{
      id:{type:String},
      email:{type:String}
    },
   
  
  }],
  assignedjobtask:[{
    userid: { type: String },
    userdetails: {
      name: { type: String },
      email: { type: String },
      mobilenumber: { type: String }
    },
    companyname: { type: String },
    experienceStart:{type:String},
    date: { type: String },
    assignedto: [],
    Assigneduseremails:[],
   
    Accepteddate:{type:String},
    status:{type:String},
  
  
    Accepteduser:{
      id:{type:String},
      email:{type:String}
    },
   
  
  
  }],
  assignedcompanytask: [
    {
      companyname: { type: String },
      date: { type: String },
      assignedto: [],
      Accepteduser:{type:String},
      Accepteddate:{type:String},
      status:{type:String}
    }


  ],



educationtask:[{
  userdetails: { type: Object },
  collegename: { type: String },
  qualification:{type:String},
  date: { type: String },
  assignedby:{type:String}

}],

jobtask:[{
  userdetails: { type: Object },
  companyname: { type: String },
  experienceStart:{type:String},
  date: { type: String },
  assignedby:{type:String}

}],


companytask:[
  {
    companyname: { type: String },
    date: { type: String },
    assignedby:{type:String}

  }

],
completedcompanytask:[

  {
    companyname: { type: String },
    date: { type: String }

  }

]

,
messagecount:{type:String},

unreadmessages:{type:String}


})


const User = mongoose.model("User", userSchema);
module.exports = User;





