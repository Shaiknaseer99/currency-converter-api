const mongoose = require("mongoose");
const conversionSchema = new mongoose.Schema({
   user:{
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User'
   },
   from: String,
   to: String,
   amount: Number,
   convertedAmount: Number,
   rate: Number,
   timestamp: {
    type: Date,
    default: Date.now
  }
      
});
const Conversion = mongoose.model('Conversion',conversionSchema);
module.exports = Conversion;

//in the conversion schema we want the user to giv
//we are creating this to store the history
//we also want to retrieve the records of the user