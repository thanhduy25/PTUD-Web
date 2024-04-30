const config = require('../config')
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const baseController = require('./base.controller')

exports.getAllPaginate = baseController.getAllPaginate(Order)

exports.myOrders = async function (req, res, next) {
  const orders = await Order.find({ user: req.user._id }).populate(['details.book'])

  res.status(200).json({
    status: 'success',
    data: {
      docs: orders,
    },
  })
}

exports.getAll = baseController.getAll(Order)

exports.getOne = baseController.getOne(Order)

exports.createOne = baseController.createOne(Order)

exports.updateOne = baseController.updateOne(Order)

exports.deleteOne = baseController.deleteOne(Order)

exports.buyFromCart = async function (req, res, next) {
  const cart = await Cart.findOne({ user: req?.user?._id }).populate('details.book')
  const order = new Order({
    user: req.user._id,
    details: cart.details,
  })
  await order.save()

  cart.details = []
  await cart.save()

  res.status(200).json({
    status: 'success',
    data: {
      doc: order,
    },
  })
}
