const express = require("express")
const booksController = require("../controllers/books.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const isAdminMiddleware = require("../middlewares/isAdmin.middleware")

const router = express.Router()

router
  .route("/")
    .get(booksController.getAllPaginate)

router
  .route("/:id")
    .get(booksController.getOne)

router.use(authMiddleware)
router.use(isAdminMiddleware)

router
  .route("/")
    .post(booksController.createOne)

router
  .route("/:id")
    .put(booksController.updateOne)
    .delete(booksController.deleteOne)

module.exports = router
