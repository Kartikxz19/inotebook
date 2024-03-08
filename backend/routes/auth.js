const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');//jSON web token help generate a secret token(passkey) for each authorized user depending on the data we
// send to the token generator. It also uses a secret key(which we store in .env file) to sign the token(for maintain integrity). 
//When user  logs in to the application it does not send username, password etc directly to the backend as this is very unsafe and
// the hacker might steal information while it was being transferred from frontend to backend. So JWT token are similar to AES, RSA encryption 
//where we encrypt the data sent by user, sign it using a speacial key(like we did with SHA-256 in AES) and then send that token to backend which
// hacker will not be able to interpret.
const JWT_SECRET="dglbgisdhbgissiduh@1234";
const fetchuser=require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');//we have used body because we are sending data in a post format with a json body..if you had data in URL(like parameters), you can use query

//ALLauthentication related endpoints will be written here.
//Create a user using POST "/api/auth". Doesn't require auth
//but many a times a new user might not add his name or adds phone number in email.SO we,need some sort of validation mechanism to help our our program figure out such scenarios. 
//For this ,we use express validator(it is a collection of middlewares specially used for validation).

//every validator has= body.(<atrribute to check>,<msg if that attrbute is not valid>).validationfunction()
router.post('/createuser', [body('email', "Enter valid email").isEmail(), body('name', 'enter valid name').isLength({ min: 3 }), body('password').isLength({ min: 5 })], async (req, res) => {
    //If errors, return BAD request and the errors
    const result = validationResult(req);
    let success=false;
    if (!result.isEmpty()) {//errors
        //if errors
        return res.status(400).send({success, errors: result.array() });
    }
    //try -catch for any unknown errors that might occur
    try {
        //check whether the user with the email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            //user already exists. 
            return res.status(400).json({success, error: "User with email already exists" });
        }
        const salt=await bcrypt.genSalt(10);//we use await because genSalt() returns a promise and it needs to be rsolved before moving to further statements. Asynchronous function need await if they return any promise

        
        const securedPassword=await bcrypt.hash(req.body.password,salt);/* Asynchronously generates a hash for the given string. */
        //craete() returns a promise ie., the document made for the given details. WE can store that document in a variable and use for further needs
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword
        });
        const data={
            user:{
                id:user.id
            }
        }
        //instead of returning the userdata to client we send the JWT token
        const authToken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success, authToken});//whenever user logs in(via the login route), he will send a auth token and we will decrypt it,get his email and password and then check whether such person is in  our database or not.
        //res.json({ user});

    } catch (error) {
        console.log(error.message);
        //500 will tell there some unknown error
        res.status(500).send("Some error Occurred");
    }

    /* .then(user=>res.json(user))
    .catch(err=>{console.log(err)
        res.json({error:"PLease don't try to insert duplicate values",msg:err.message})}); */

    /* const user=User(req.body);
    user.save();
    res.send(req.body); */
})
//Authenticate a user using "/api/auth/login"
//just keep email validator this time and password should not be empty
router.post('/login', [body('email', "Enter valid email").isEmail(),body('password','Password Cannot be empty').exists()], async (req, res) => {
    //If errors, return BAD request and the errors
    const result = validationResult(req);
    let success=false;
    if (!result.isEmpty()) {//errors
        //if errors
        return res.status(400).send({ errors: result.array() });
    }
    
    try{
        //try finding the email in database
        let user=await User.findOne({email:req.body.email});//returns a query so use await to wait for that query other wise it will move to bcrypt .compare() without even getting the data from database and hence give errors
        if(!user)
        {
            return res.status(400).json({success,error:"Please login with correct credentials"});
        }

        //now we know user exists but password is hashed value. So we hash the password in our database using bcrypt and compare it with received hash. All this can be done in one step using brcypt's compare function.
        const passwordCompare=await bcrypt.compare(req.body.password,user.password);//returns boolean Promise. compare() is asynchronous so you need to use await and wait till it returns its promise.
        if(!passwordCompare)
        {
            return res.status(400).json({success,error:"Please login with correct credentials"});
        }
        //if user authenticates then we send user's data to client . BUT, not directly!!! It may be hacked! WE use jwT tokens to send data in encrypted form.
        const data={
            user:{
                id:user.id
            }
        }
        //instead of returning the userdata to client we send the JWT token
        const authToken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authToken});
        
    } catch(error){
        console.log(error.message);
        //500 will tell there some unknown error
        res.status(500).send("Internal Server Error");
    }

    
})
//If you see above we have been sending userId as authtoken after loging in. So if you have userId and you want to display all the details of user then below route is for that.
//RoUTE 3: get LoggedIN user details using: POST: "/api/auth/getuser":LOGIN REQUIRED
router.post('/getuser',fetchuser,async (req, res) => {
    //now suppose we write the code for taking out the id of user from token here. THen we have to right this everywhere there is requirement of decrypting the token. 
    //So instead we create a middleware that runs before our async function. And that middleware can be used at any route you want. THis makes our project more scalable in the future.
    try{
        const userId=req.user.id;
        //after we get userId, we find to fetch that document from database and select all fields other than password
        const user=await User.findById(userId).select("-password");
        res.json(user);
    } catch(error){
        console.log(error.message);
        //500 will tell there some unknown error
        res.status(500).send("Internal Server Error");
    }

    
})

module.exports = router;