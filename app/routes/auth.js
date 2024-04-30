const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const authController = require('../controllers/auth.controller')

const router = express.Router()

router.route('/register').post(authController.register)

router.route('/login').post(authController.login)

router.route('/getMe').get(authMiddleware, authController.getMe)

module.exports = router
