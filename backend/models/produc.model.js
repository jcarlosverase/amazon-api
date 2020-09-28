const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PositionSchema = new Schema({
  page: { type: Number, required: true },
  position: { type: Number, required: true },
  global_position: { type: Number, required: true },
});
const PriceSchema = new Schema({
  discounted: { type: Boolean, required: true },
  current_price: { type: Number, required: true },
  currency: { type: String, required: true },
  before_price: { type: Number, required: true },
  savings_amount: { type: Number, required: true },
  savings_percent: { type: Number, required: true },
});
const ReviewsSchema = new Schema({
  total_reviews: { type: Number, required: true },
  rating: { type: Number, required: true },
});
const ProductSchema = new Schema({
  _id: { type: String, required: true },
  position: { type: PositionSchema, required: true },
  asin: { type: String, required: true },
  price: { type: PriceSchema, required: true },
  reviews: { type: ReviewsSchema, required: true },
  url: { type: String, required: true },
  score: { type: String, required: true },
  sponsored: { type: Boolean, required: true },
  amazonChoice: { type: Boolean, required: true },
  bestSeller: { type: Boolean, required: true },
  amazonPrime: { type: Boolean, required: true },
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

const Product = mongoose.model('Products', ProductSchema);

module.exports = Product;