const Genre = require('../models/Genre')
const baseController = require('./base.controller')

exports.getAll = baseController.getAll(Genre)

exports.getOne = baseController.getOne(Genre)

exports.createOne = baseController.createOne(Genre)

exports.updateOne = baseController.updateOne(Genre)

exports.deleteOne = baseController.deleteOne(Genre)
