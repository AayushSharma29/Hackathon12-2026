const express = require('express');
const router = express.Router();
const Ingredient = require('../models/Ingredient');
// const { protect } = require('../middleware/auth'); // TODO: create auth middleware

// GET /api/pantry — get all pantry items for logged-in user
router.get('/', /* protect, */ async (req, res) => {
  // TODO: find all Ingredient docs where user === req.user._id
  // TODO: return as JSON array
});

// POST /api/pantry — add a new item to the pantry
router.post('/', /* protect, */ async (req, res) => {
  // TODO: destructure { name, quantity, expiryDate } from req.body
  // TODO: create new Ingredient with user: req.user._id
  // TODO: save and return the new item
});

// DELETE /api/pantry/:id — remove an item from the pantry
router.delete('/:id', /* protect, */ async (req, res) => {
  // TODO: find Ingredient by req.params.id
  // TODO: verify item belongs to req.user._id (authorization check)
  // TODO: delete and return success message
});

// PATCH /api/pantry/:id — update quantity or expiry
router.patch('/:id', /* protect, */ async (req, res) => {
  // TODO: find and update Ingredient by req.params.id
  // TODO: only allow updating quantity and expiryDate fields
  // TODO: verify ownership before updating
});

module.exports = router;