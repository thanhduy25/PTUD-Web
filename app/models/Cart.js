const { Schema, model } = require("mongoose");

const cartDetailSchema = new Schema({
  book: {
    type: Schema.ObjectId,
    ref: "Book",
  },
  quantity: Number,
});

const cartSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  details: [cartDetailSchema],
});

module.exports = model("Cart", cartSchema);
