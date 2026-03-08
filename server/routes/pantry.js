const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { protect } = require('../middleware/auth');
const prisma = new PrismaClient();

// GET /api/pantry
router.get('/', protect, async (req, res) => {
  try {
    const items = await prisma.ingredient.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/pantry
router.post('/', protect, async (req, res) => {
  try {
    const { name, quantity, expiryDate } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const item = await prisma.ingredient.create({
      data: {
        userId: req.user.id,
        name,
        quantity: quantity || '',
        expiryDate: expiryDate ? new Date(expiryDate) : null,
      },
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/pantry/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    const item = await prisma.ingredient.findUnique({ where: { id: req.params.id } });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.userId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await prisma.ingredient.delete({ where: { id: req.params.id } });
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/pantry/:id
router.patch('/:id', protect, async (req, res) => {
  try {
    const item = await prisma.ingredient.findUnique({ where: { id: req.params.id } });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.userId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    const { quantity, expiryDate } = req.body;
    const updated = await prisma.ingredient.update({
      where: { id: req.params.id },
      data: {
        ...(quantity !== undefined && { quantity }),
        ...(expiryDate !== undefined && { expiryDate: new Date(expiryDate) }),
      },
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;