const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.ObjectId;

const productSchema = Schema({
  product: ObjectId,
  nombre: String,
  ingredientes: String,
  precio: Number,
  cantidad: Number,
  tiempo: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = {
  Product
};
