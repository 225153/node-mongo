const mongoose = require('mongoose');

// Create the model directly
const Product = mongoose.model('Product', {
  title: { type: String},
  description: { type: String },
  price: { type: Number },   // integer/number
  image: { type: String }    // image URL or path
});

module.exports = Product;
// Export the model