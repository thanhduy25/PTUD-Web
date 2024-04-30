const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware')
const ordersController = require('../controllers/order.controller')

const router = express.Router()

router.use(authMiddleware)

router
  .route('/')
  .get(ordersController.getAll)
  .post(ordersController.createOne)
  .delete(ordersController.deleteOne)

router.route('/myOrders').get(ordersController.myOrders)

router.route('/buyFromCart').get(ordersController.buyFromCart)

router.route('/:id').get(ordersController.getOne).put(ordersController.updateOne)

module.exports = router
