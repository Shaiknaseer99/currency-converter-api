const app = require('./app');
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 6000;
app.listen(PORT,()=>{
    console.log(`app is listening on PORT:${PORT}`)
})