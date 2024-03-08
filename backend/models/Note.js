const mongoose = require('mongoose');
const {Schema}=mongoose;
//we want each note to be associated to its user. THis can be done via including user as a foreign key(like in sql) in the notes schema
//Mongoose does this via the following
const NotesSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId, //signifies that the Id of that user will be here as a foreign key
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
  });
  module.exports=mongoose.model('notes',NotesSchema);