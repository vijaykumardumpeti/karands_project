const mongoose = require('mongoose');
const companySchema = new mongoose.Schema({
  nameOfCompany: { type: String, required: true },
  concernPerson: { type: String, required: true },
  dateOfRegistration: { type: String, required: true },
  logo: { type: String },
  noOfEmployee: { type: Number, required: true },
  primaryAddress: { type: String, required: true },
  secondaryAddress: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  industry: { type: String, required: true },
  skills: { type: Array, required: true },
  mobileNumber: { type: String, required: true },
  domainEmail: { type: String, required: true },
  website: { type: String, required: true },
  gstNo: { type: String },
  aboutCompany: { type: String, required: true },
  companyDocument: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  registeredUserName: { type: String },
  SubscriptionsDate: { type: String },
  expiryDate: { type: String },
  postedJob: { type: Number, default: 0 },
  gstdoc:{type: String },
  registerdoc:{type: String },
  companylogo: { type: String },
  verified: { type: Boolean, default: false },
  whoaccepted: [{
    accepteduserid: { type: String },
    date:{type:String},
    status:{type:String}

  }
  ],
  assignedto: [{
    assigneduserid: { type: String },

    assignedby: { type: String },
    date:{type:String},
    status:{type:String}
  }],

  subscriptiondetails:{

    transactionId:{type:String},
    transactionDate:{type:String},
    expiryDate:{type:String}
  
  
  
  },

  Teammembers:[]
  

});
module.exports = mongoose.model("companies", companySchema);