const mongoose = require('mongoose');

// Saved/cooked recipes for a user — cooking history
const RecipeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    spoonacularId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    usedIngredients: [
      {
        // TODO: store ingredient names used when this recipe was saved
        type: String,
      },
    ],
    missedIngredients: [
      {
        // TODO: store ingredient names the user was missing
        type: String,
      },
    ],
    cooked: {
      // TODO: true if user marked this as cooked (helps waste tracking)
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', RecipeSchema);