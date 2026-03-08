const express = require('express');
const router = express.Router();
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const { protect } = require('../middleware/auth');
const prisma = new PrismaClient();

const SPOONACULAR_BASE = 'https://api.spoonacular.com';
const API_KEY = process.env.SPOONACULAR_API_KEY;

// GET /api/spoonacular/findByIngredients
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

// GET /api/spoonacular/recipe/:id
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

// POST /api/spoonacular/save
router.post('/save', protect, async (req, res) => {
  try {
    const { spoonacularId, title, image, usedIngredients, missedIngredients } = req.body;

    const existing = await prisma.recipe.findFirst({
      where: { userId: req.user.id, spoonacularId },
    });
    if (existing) return res.status(400).json({ message: 'Recipe already saved' });

    const recipe = await prisma.recipe.create({
      data: {
        userId: req.user.id,
        spoonacularId,
        title,
        image: image || '',
        usedIngredients: usedIngredients || [],
        missedIngredients: missedIngredients || [],
      },
    });
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/spoonacular/history
router.get('/history', protect, async (req, res) => {
  try {
    const recipes = await prisma.recipe.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/spoonacular/recipe/:id/cooked
router.patch('/recipe/:id/cooked', protect, async (req, res) => {
  try {
    const recipe = await prisma.recipe.findUnique({ where: { id: req.params.id } });
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    if (recipe.userId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    const updated = await prisma.recipe.update({
      where: { id: req.params.id },
      data: { cooked: true },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;