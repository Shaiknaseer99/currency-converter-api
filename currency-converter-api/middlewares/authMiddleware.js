const jwt = require("jsonwebtoken");
const User =require("../models/User");

const protect = async(req,res,next)=>{
    try{
      const token = req.headers.authorization?.split(' ')[1];
      if(!token) return res.status(401).json({message : "No token,authorization denied"});
      const decode = jwt.verify(token,process.env.JWT_SECRET);
      req.user = await User.findById(decode.id).select('-password');
      if(!req.user){
        return res.status(401).json({message :"User not found"});
      }
      next();


    }catch(error){
         console.error("Auth error:", error.message);
         return res.status(401).json({ message: "Not authorized, token failed" });
     
        
    }
}
module.exports = protect;