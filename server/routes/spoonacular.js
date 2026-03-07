const express = require('express');
const router = express.Router();
const axios = require('axios');
const Recipe = require('../models/Recipe');
// const { protect } = require('../middleware/auth'); // TODO: create auth middleware

const SPOONACULAR_BASE = 'https://api.spoonacular.com';
const API_KEY = process.env.SPOONACULAR_API_KEY;

// GET /api/spoonacular/findByIngredients?ingredients=egg,milk,butter
router.get('/findByIngredients', async (req, res) => {
  // TODO: get ingredients query param from req.query.ingredients
  // TODO: call Spoonacular: GET /recipes/findByIngredients
  //   params: { ingredients, number: 10, ranking: 1, apiKey: API_KEY }
  // TODO: return results array
  // Docs: https://spoonacular.com/food-api/docs#Search-Recipes-by-Ingredients
});

// GET /api/spoonacular/recipe/:id — get full recipe details
router.get('/recipe/:id', async (req, res) => {
  // TODO: call Spoonacular: GET /recipes/:id/information
  //   params: { apiKey: API_KEY }
  // TODO: return recipe details
});

// POST /api/spoonacular/save — save a recipe to user's history
router.post('/save', /* protect, */ async (req, res) => {
  // TODO: destructure recipe fields from req.body
  // TODO: check if recipe already saved by this user (avoid duplicates)
  // TODO: create and save new Recipe doc
  // TODO: return saved recipe
});

// GET /api/spoonacular/history — get user's saved/cooked recipes
router.get('/history', /* protect, */ async (req, res) => {
  // TODO: find all Recipe docs where user === req.user._id
  // TODO: sort by createdAt descending
  // TODO: return array
});

// PATCH /api/spoonacular/recipe/:id/cooked — mark recipe as cooked
router.patch('/recipe/:id/cooked', /* protect, */ async (req, res) => {
  // TODO: find Recipe by req.params.id
  // TODO: set cooked = true
  // TODO: this feeds into waste tracking (used ingredients = not wasted)
});

module.exports = router;