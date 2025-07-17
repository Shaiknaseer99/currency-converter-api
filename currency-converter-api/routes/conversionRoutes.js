const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware")
const {convertCurrency,getHistory,saveFavoritePairs,getFavoritePairs,getHistoricalRates} = require('../controllers/conversionController')

router.get('/convert',protect,convertCurrency);
router.get('/history',protect,getHistory);
router.post('/favorites',protect,saveFavoritePairs);
router.get('/favorites',protect,getFavoritePairs);
router.get('/history/rates',protect,getHistoricalRates);
module.exports = router;