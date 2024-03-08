const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/inotebook";
const handleError=(error)=>{

        console.log(error);

    
}
async function connectToMongo() {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected!");//this will be executed only after the await line successfuly executes, otherwise it will go into catch()
      } catch (error) {
        handleError(error);
      }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports=connectToMongo;