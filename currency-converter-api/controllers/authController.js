const User = require('../models/User');
const bcrypt = require("bcryptjs");
const generateToken = require('../utils/generateToken');

exports.signup  = async(req,res)=>{
    
    try{
      const{username ,email ,password} = req.body;
      if(!username || !email || !password) return res.status(400).json({message:"username ,email and password are requires"});
      if(password.length<5 || password.length>10) return res.status(400).json({message:"password length should be between 5 and 10"});
    
      const hashedPassword = await bcrypt.hash(password,10);
      const user = await User.create({username , email,password:hashedPassword});
      return res.status(200).json({message:"user created successfully",
        _id : user._id,
        username : user.username,
        email : user.email,
        password : user.password,
        token : generateToken(user._id)
      })

    }
    catch(err){
        console.error(err);
        res.status(500).json({message :"internal server error"})
    }
}
exports.login= async(req,res)=>{
    try{
      const{email,password} = req.body;
      if(!email || !password) return res.status(400).json({message : 'email and password is required'});
      const user = await User.findOne({email});
      if(!user) return res.status(400).json({ message: "User is not registered. Please sign up." });
      const checkPassword = await bcrypt.compare(password, user.password);
      if(!checkPassword) return res.status(400).json({message :"password is incorrect"});
      return res.status(200).json({
        _id : user._id,
        username : user.username,
        emial : user.email,
        token : generateToken(user._id)
      })
    }catch(err){
        console.error(err);
        res.status(500).json({message : "internal server error"});
    }
}
exports.getProfile = async(req,res)=>{
    try{
      const user  = req.user;
      return res.status(200).json({
        _id : user._id,
        username : user.username,
        email : user.email
      })
    }catch(err){
        console.error(err);
        return res.status(500).json({message : "internal server error"});
    }
}
exports.updateProfile = async(req,res)=>{
    try{
     const user =req.user;
     user.username = req.body.username || user.username;
     const updatedUser = await user.save();
     return res.status(200).json({
        _id  : updatedUser._id,
        username : updatedUser.username
     })
    }catch(err){
        console.error(err);
        return res.status(500).json({message : "internal server error"});
    }
}
