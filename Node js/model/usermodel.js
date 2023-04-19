const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userId: {
    type: String || Number,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model("userSchema", userSchema);


// const mongoose=require('mongoose');
// const userModel= mongoose.Schema({
//     name:{
//         type:String,
//         required:true
//     },
//     email:{
//         type:String,
//         required:true
//     }
// })

// module.exports=mongoose.model('UserModel',userModel)
