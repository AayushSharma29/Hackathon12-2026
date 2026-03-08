const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect } = require('../middleware/auth');
const prisma = new PrismaClient();

// GET /api/waste/stats
router.get('/stats', protect, async (req, res) => {
  try {
    const itemsWasted = await prisma.ingredient.count({
      where: { userId: req.user.id, wasWasted: true },
    });

    const cookedRecipes = await prisma.recipe.findMany({
      where: { userId: req.user.id, cooked: true },
    });

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

// POST /api/waste/log
router.post('/log', protect, async (req, res) => {
  try {
    const { itemId, wasWasted } = req.body;
    const item = await prisma.ingredient.findUnique({ where: { id: itemId } });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.userId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    const updated = await prisma.ingredient.update({
      where: { id: itemId },
      data: { wasWasted },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;