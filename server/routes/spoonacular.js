const express = require('express');
const router = express.Router();
const axios = require('axios');
const Recipe = require('../models/Recipe');
const { protect } = require('../middleware/auth');

const SPOONACULAR_BASE = 'https://api.spoonacular.com';
const API_KEY = process.env.SPOONACULAR_API_KEY;

// GET /api/spoonacular/findByIngredients?ingredients=egg,milk,butter
router.get('/findByIngredients', async (req, res) => {
  try {
    const { ingredients } = req.query;
    if (!ingredients) return res.status(400).json({ message: 'ingredients query param required' });

    const response = await axios.get(`${SPOONACULAR_BASE}/recipes/findByIngredients`, {
      params: { ingredients, number: 10, ranking: 1, apiKey: API_KEY },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/spoonacular/recipe/:id — get full recipe details
router.get('/recipe/:id', async (req, res) => {
  try {
    const response = await axios.get(
      `${SPOONACULAR_BASE}/recipes/${req.params.id}/information`,
      { params: { apiKey: API_KEY } }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/spoonacular/save — save a recipe to user's history
router.post('/save', protect, async (req, res) => {
  try {
    const { spoonacularId, title, image, usedIngredients, missedIngredients } = req.body;

    const existing = await Recipe.findOne({ user: req.user._id, spoonacularId });
    if (existing) return res.status(400).json({ message: 'Recipe already saved' });

    const recipe = await Recipe.create({
      user: req.user._id,
      spoonacularId,
      title,
      image: image || '',
      usedIngredients: usedIngredients || [],
      missedIngredients: missedIngredients || [],
    });
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/spoonacular/history — get user's saved/cooked recipes
router.get('/history', protect, async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/spoonacular/recipe/:id/cooked — mark recipe as cooked
router.patch('/recipe/:id/cooked', protect, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (recipe.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    recipe.cooked = true;
    const updated = await recipe.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;