 exports.getOne = function (model) {
    return async function (req, res, next) {
      const doc = await model.findById(req.params.id)
  
      if (!doc) throw new AppError('No document found!', 404)
  
      return res.status(200).json({
        status: 'success',
        data: {
          doc,
        },
      })
    }
  }
  
  exports.getAll = function (model) {
    return async function (req, res, next) {
      const docs = await model.find()
  
      if (!docs) throw new AppError('No document found!', 404)
  
      return res.status(200).json({
        status: 'success',
        result: docs.length,
        data: {
          docs,
        },
      })
    }
  }
  
  exports.getAllPaginate = function (model) {
    return async function (req, res, next) {
      const { page = 1, perPage = 12, q = '' } = req.query
      let skip = (page - 1) * perPage
  
      const docs = await model
        .find({ title: { $regex: q, $options: 'i' } })
        .skip(skip)
        .limit(perPage)
  
      if (!docs) throw new AppError('No document found!', 404)
  
      const count = await model.find({ title: { $regex: q, $options: 'i' } }).countDocuments()
      const noPage = Math.ceil(count / perPage)
  
      return res.status(200).json({
        status: 'success',
        result: docs.length,
        data: {
          docs,
          noPage,
        },
      })
    }
  }
  
  exports.createOne = function (model) {
    return async function (req, res, next) {
      const doc = await model.create(req.body)
  
      res.status(201).json({
        status: 'success',
        data: {
          doc,
        },
      })
    }
  }
  
  exports.updateOne = function (model) {
    return async function (req, res, next) {
      const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      })
      console.log(req.body)
  
      if (!doc) throw new AppError('No document found!', 404)
  
      return res.status(200).json({
        status: 'success',
        result: doc.length,
        data: {
          doc,
        },
      })
    }
  }
  
  exports.deleteOne = function (model) {
    return async function (req, res, next) {
      const rs = await model.deleteOne({ _id: req.params.id })
  
      if (!rs.deletedCount) throw new AppError('No document found!', 404)
  
      return res.status(204).send()
    }
  }
  