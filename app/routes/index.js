const express = require("express");
const router = express.Router();
const authRoute = require('./auth')
const bookRoute = require('./book')
const cartRoute = require('./cart')
const orderRoute = require('./order')

router.use('/test', (req, res, next) => {
    res.status(200).json({
        message: "Welcome"
    })
});

router.use('/auth', authRoute);
router.use('/books', bookRoute);
router.use('/cart', cartRoute);
router.use('/orders', orderRoute);
module.exports = router;