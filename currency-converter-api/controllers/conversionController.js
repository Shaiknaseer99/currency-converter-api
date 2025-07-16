const Conversion = require('../models/Conversion');
const User = require('../models/User')
const dotenv = require("dotenv");
const axios = require("axios");
dotenv.config();
exports.convertCurrency  = async(req,res)=>{
    try{
        
        const userId = req.user._id;
       
        const{from ,to,amount} = req.body;
        if(!from || !to || !amount) return res.status(400).json({message :"amount ,from and to are required for conversion"});
        if (isNaN(amount) || Number(amount) <= 0) {
        return res.status(400).json({ message: "Amount must be a positive number" });
       }
        const API_KEY = process.env.EXCHANGE_API_KEY;
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`);
        if (!response.data || response.data.result !== "success" || !response.data.conversion_rates) {
        return res.status(500).json({ message: "Failed to fetch currency data" });
        }
        const rate = response.data.conversion_rates[to];
        if(!rate) return res.status(400).json({message :"Invalid target Currency"});

      const converted = (parseFloat(amount) * rate).toFixed(2);

        if(userId){
          console.log("creating the conversion model")
          const conversion = await Conversion.create({
            user:userId,
            from ,
            to ,
            amount ,
            convertedAmount : converted,
            rate
          })
          await conversion.save();
          console.log("successfully created the conversion model")
          
        }
        return res.status(200).json({from  , to,amount, rate,converted})

    }catch(err){
        console.error(err);
        res.status(500).json({message :"internal server error"});
    }
}

exports.getHistory = async(req,res)=>{
    try{

        const userId  = req.user._id;
        console.log(userId);
        console.log("calling the history route ")
        const history = await Conversion.find({ user: userId }).sort({createdAt :-1});
        console.log(history)
        return res.status(200).json({history});

    }catch(err){
        console.error(err);
        return res.status(500).json({message :"Internal server error"})
    }
}
exports.saveFavoritePairs = async (req, res) => {
  try {
    const { from, to } = req.body;
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    const alreadyExists = user.favoritePairs.some(pair => pair.from === from && pair.to === to);
    if (alreadyExists) {
      return res.status(400).json({ message: "This pair is already saved as favorite." });
    }

    user.favoritePairs.push({ from, to });
    await user.save();

    return res.status(200).json({ message: "Favorite pair saved." });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};
exports.getFavoritePairs = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    return res.status(200).json({ favoritePairs: user.favoritePairs });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error." });
  }
};