const express = require('express')
const cartController = require("../controllers/cart.controller")
const authMiddleware = require('../middlewares/auth.middleware')


const router = express.Router()

router.use(authMiddleware)

router
  .route('/')
  .get(cartController.get)
  .delete(cartController.delete)
  .put(cartController.updateBookInCart)

router
  .route('/:bookId')
  .post(cartController.addBookToCart)
  .delete(cartController.deleteBookFromCart)

module.exports = router
