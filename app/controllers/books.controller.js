const Book = require('../models/Book')
const baseController = require('./base.controller')

exports.getAllPaginate = baseController.getAllPaginate(Book)

exports.getOne = baseController.getOne(Book)

exports.createOne = baseController.createOne(Book)

exports.updateOne = baseController.updateOne(Book)

exports.deleteOne = baseController.deleteOne(Book)
