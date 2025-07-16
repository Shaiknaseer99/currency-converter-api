const mongoose = require("mongoose");
const userSchema  = new mongoose.Schema({
    username :{
        type : String,
        required :true
    },
    email:{
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
        min : 5,
        max : 10
    },
    favoritePairs: [
    {
    from: String,
    to: String
    }
    ]
},{timestamps:true})

const User = mongoose.model('User',userSchema);
module.exports = User;