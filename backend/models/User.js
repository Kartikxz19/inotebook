const mongoose = require('mongoose');
const {Schema}=mongoose;
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    date:{
        type:Date,
        default:Date.now
    },
  });
  const user=mongoose.model('user',UserSchema);
  /* user.createIndexes(); *///helps make sure duplicate values are not inserted inside the collection(gives error instead )
  //will work only if you have declared some attribute as unique in your schema(like here -email)
  //But we are using custom checker so we don't need this
  module.exports=user;