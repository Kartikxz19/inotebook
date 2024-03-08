const connectToMongo=require("./db");
const express = require('express')
var cors =require('cors')
connectToMongo();
const app = express()
const port = 5000 //port 3000 will run the react frontend
app.use(cors());
/* Express provides you with middleware to deal with the (incoming) data (object) in the body of the request.

a. express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app.use(express.json());
b. express.urlencoded() is a method inbuilt in express to recognize the incoming Request Object as strings or arrays. This method is called as a middleware in your application using the code: app.use(express.urlencoded());
So the difference is express.json() is a body parser for post request( except html post form) and express.urlencoded({extended: false}) is a body parser for html post form. 
*/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.get('/',(req,res)=>{
    console.log(req.body);
    res.send("Hello!");
});
//now we use routes which have been defined in separate .js files using app.use() so that we have better code management
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})