const mongoose = require("mongoose");
const ichpPost = new mongoose.Schema({
    userObectId:{type:String},
    name:{type:String},
    designation:{type:String},
    email:{type:String},
    Title:{type:String},
    content:{type:String},
    file:{type:String},
    whomToShow:{type:Array},

    likes: [
        {
          userId: {
            type:String,
            ref: 'User'
            // unique: true, // Ensure uniqueness of userId within the likes array
            // required: true,
          },
          name: {
            type: String,
            required: true,
          },
          email:{
            type:String
          },
          Designation:{
            type:String
          }
        },
      ],

    comments:[{
        userId: {
          type:String,
          ref: 'User',
         
        //   required: true,
        },
        name: {
          type: String,
          required: true,
        },
        email:{
            type:String
          },
        comment:{
            type: String,
         
        }, likes: [
          {
            userId: {
              type:String,
              ref: 'User',
              unique: true, // Ensure uniqueness of userId within the likes array
              // required: true,
            },
            name: {
              type: String,
              required: true,
            },
            email:{
              type:String
            }
          },
        ],

        nestedComments:[{
            userId: {
                type:String,
                ref: 'User',
               
                required: true,
              },
              name: {
                type: String,
                required: true,
              },
              email:{
                  type:String
                },
              comment:{
                  type: String,
               
              }, likes: [
                {
                  userId: {
                    type:String,
                    ref: 'User',
                    unique: true, // Ensure uniqueness of userId within the likes array
                    // required: true,
                  },
                  name: {
                    type: String,
                    required: true,
                  },
                  email:{
                    type:String
                  }
                },
              ]
             


        }]


      },]
},
{ timestamps: true });
module.exports = mongoose.model("ichpPost", ichpPost);

