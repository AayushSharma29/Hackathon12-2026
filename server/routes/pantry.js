const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');
const { protect } = require('../middleware/auth');

// GET /api/pantry — get all pantry items for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const items = await Ingredient.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/pantry — add a new item to the pantry
router.post('/', protect, async (req, res) => {
  try {
    const { name, quantity, expiryDate } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const item = await Ingredient.create({
      user: req.user._id,
      name,
      quantity: quantity || '',
      expiryDate: expiryDate || null,
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/pantry/:id — remove an item from the pantry
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await Ingredient.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await item.deleteOne();
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/pantry/:id — update quantity or expiry
router.patch('/:id', protect, async (req, res) => {
  try {
    const item = await Ingredient.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    const { quantity, expiryDate } = req.body;
    if (quantity !== undefined) item.quantity = quantity;
    if (expiryDate !== undefined) item.expiryDate = expiryDate;

    const updated = await item.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;