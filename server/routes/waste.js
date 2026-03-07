const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');
const Recipe = require('../models/Recipe');
const { protect } = require('../middleware/auth');

// GET /api/waste/stats — summary of user's food waste stats
router.get('/stats', protect, async (req, res) => {
  try {
    const itemsWasted = await Ingredient.countDocuments({ user: req.user._id, wasWasted: true });
    const cookedRecipes = await Recipe.find({ user: req.user._id, cooked: true });
    const recipesMade = cookedRecipes.length;
    const ingredientsSaved = cookedRecipes.reduce(
      (sum, r) => sum + (r.usedIngredients ? r.usedIngredients.length : 0),
      0
    );

    res.json({ itemsWasted, recipesMade, ingredientsSaved });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/waste/log — mark an ingredient as wasted or saved
router.post('/log', protect, async (req, res) => {
  try {
    const { itemId, wasWasted } = req.body;
    const item = await Ingredient.findById(itemId);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    item.wasWasted = wasWasted;
    const updated = await item.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;