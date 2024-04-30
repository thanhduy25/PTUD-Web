const config = require('../config')
const Cart = require('../models/Cart')
const User = require('../models/User')

exports.get = async function (req, res, next) {
  const cart = await Cart.findOne({ user: req?.user?._id }).populate('details.book')
  const cartDetails = cart?.details || []

  return res.status(200).json({
    status: 'success',
    result: cartDetails.length,
    data: {
      cart: cartDetails,
      test: cart,
    },
  })
}
exports.addBookToCart = async function (req, res, next) {
  let cart = await Cart.findOne({ user: req.user._id }).populate('details.book')
  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      details: [],
    })
  }
  const index = cart.details.findIndex((item) => {
    return item?.book?.equals(req?.params?.bookId)
  })
  if (index != -1) {
    cart.details[index].quantity++
  } else {
    cart.details.push({
      book: req?.params?.bookId,
      quantity: 1,
    })
  }
  await cart.save()

  return res.status(200).json({
    status: 'success',
    result: cart.details.length,
    data: {},
  })
}

exports.updateBookInCart = async function (req, res, next) {
  let cart = await Cart.findOne({ user: req.user._id }).populate('details.book')
  if (!cart) {
    throw new AppError('No document found!', 404)
  }
  const index = cart.details.findIndex((item) => item.book._id == req.body.cartItem.book)
  if (index == -1) {
    throw new AppError('No item found!', 404)
  }

  cart.details[index].quantity = req.body.cartItem.quantity
  await cart.save()

  return res.status(200).json({
    status: 'success',
    result: cart.details.length,
    data: {},
  })
}

exports.deleteBookFromCart = async function (req, res, next) {
  let cart = await Cart.findOne({ user: req.user._id }).populate('details.book')
  if (!cart) {
    throw new AppError('No document found!', 404)
  }
  const index = cart.findIndex((item) => item.book._id === req.body.bookId)

  if (index == -1) {
    throw new AppError('No item found!', 404)
  }

  cart.splice(index, 1)
  await cart.save()

  return res.status(200).json({
    status: 'success',
    result: cart.details.length,
    data: {},
  })
}

exports.delete = async function (req, res, next) {
  await Cart.findOneAndUpdate({ user: req.user._id }, { details: [] })
  return res.status(204).send()
}
