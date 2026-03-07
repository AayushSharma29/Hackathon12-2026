const mongoose = require('mongoose');

// Represents a single item in a user's pantry
const IngredientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: String, // e.g. "2 cups", "500g"
      default: '',
    },
    expiryDate: {
      type: Date,
      default: null,
    },
    wasWasted: {
      // TODO: used by waste tracker — true if item expired unused
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ingredient', IngredientSchema);