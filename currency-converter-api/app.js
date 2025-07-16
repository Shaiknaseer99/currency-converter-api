const express = require("express");
const app  = express();
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes")
const conversionRoutes  = require('./routes/conversionRoutes')
//parsing the json 
app.use(express.json());


//connect to the database
connectDB();

//authentication routes
app.use('/api/auth',authRoutes);
app.use('/api',conversionRoutes);

//home page 
app.get('/',(req,res)=>{
    res.send('in the home page');
})

module.exports = app;