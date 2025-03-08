const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1
    }
  }],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate total price
cartSchema.pre('save', async function(next) {
  try {
    let total = 0;
    await this.populate('products.product');
    
    for (const item of this.products) {
      if (item.product && item.product.price) {
        total += item.product.price * item.quantity;
      }
    }
    
    this.totalPrice = total;
    next();
  } catch (error) {
    next(error);
  }
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
module.exports = Cart;
