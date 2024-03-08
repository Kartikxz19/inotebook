const jwt = require('jsonwebtoken');
const JWT_SECRET="dglbgisdhbgissiduh@1234";
//middleware always takes three parameters: req,res,next. Next signifies the next middleware to run after this(in our case the async(req,res) of auth/getuser endpoint)
const fetchuser=(req,res,next)=>{
//get the user from jwt token and add the id to req
//Where will the token come from? From the header(we will send the auth token in header after loging in)
//HTTP headers are a list of strings that are sent and received by both the client and the server on every HTTP request and response. 
//They let the client and the server pass additional information with an HTTP message, such as the encoding, 
//the authentication, the caching, or the content type
const token=req.header("auth-token");
if(!token)
{
    res.status(401).send({error:"Please authenticate via a valid token"});
}
try {
    const data=jwt.verify(token,JWT_SECRET);//verify and decrypt the token via the secret key
    //add the user part(remeber when we made that token, it had a user component) to req.user
    req.user=data.user;
    next();
} catch (error) {
    res.status(401).send({error:"Please authenticate via a valid token"});
    console.log(error);
}
}
module.exports=fetchuser;