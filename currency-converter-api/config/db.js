const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async ()=>{
   try{
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("MONGODB connected");
   }catch(err){
     console.error(`error in connecting to DB : ${err}`)
     process.exit(1);
    
   }
}
module.exports = connectDB;