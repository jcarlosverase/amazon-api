const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
});

const Products = mongoose.model('products', productSchema);

module.exports = Products;