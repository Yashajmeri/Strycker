const jsonwebtoken = require("jsonwebtoken");
const HttpError = require("../../module/http-error");
const jwt  = require("jsonwebtoken");
module.exports =(req,res,next)=>{
   if(req.method==='OPTIONS') {
      return next();
   }
   try {
    const token = req.headers.authorization.split(' ')[1] // authorization : 'Bearer TOKEN'
if(!token) {
    throw new  Error("Authentication failed!",401);
}   
const decodedToken = jwt.verify(token,'secrete-dont-share')

req.userData = {userId:decodedToken.userId}
next ();
}catch(err) {
  return next (new HttpError("Authentication failed!",401));
   }

}