const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');
const Recipe = require('../models/Recipe');
// const { protect } = require('../middleware/auth'); // TODO: create auth middleware

// GET /api/waste/stats — summary of user's food waste stats
router.get('/stats', /* protect, */ async (req, res) => {
  // TODO: count Ingredient docs where user === req.user._id && wasWasted === true
  // TODO: count Recipe docs where user === req.user._id && cooked === true
  // TODO: calculate "items saved" = cooked recipes' usedIngredients total
  // TODO: return { itemsWasted, recipesMade, ingredientsSaved }
});

// POST /api/waste/log — mark an ingredient as wasted or saved
router.post('/log', /* protect, */ async (req, res) => {
  // TODO: destructure { itemId, wasWasted } from req.body
  // TODO: find Ingredient by itemId, verify ownership
  // TODO: update wasWasted field
  // TODO: return updated item
});

module.exports = router;