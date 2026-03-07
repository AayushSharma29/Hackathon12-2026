// Central service for all HTTP requests to the backend
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper: get JWT token from localStorage
const getToken = () => localStorage.getItem('token');

// Helper: build auth headers
const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// ─── Auth ────────────────────────────────────────────────────────────────────

export const loginUser = async (email, password) => {
  // TODO: POST /api/auth/login with { email, password }
  // TODO: return { token, user } on success
};

export const registerUser = async (name, email, password) => {
  // TODO: POST /api/auth/register with { name, email, password }
  // TODO: return { token, user } on success
};

// ─── Recipes (Spoonacular via backend) ───────────────────────────────────────

export const searchRecipesByIngredients = async (ingredients) => {
  // TODO: GET /api/spoonacular/findByIngredients?ingredients=egg,milk,...
  // TODO: return array of recipe objects
};

export const saveRecipe = async (recipe) => {
  // TODO: POST /api/spoonacular/save with recipe data
  // TODO: requires auth headers
};

export const getCookingHistory = async () => {
  // TODO: GET /api/spoonacular/history
  // TODO: requires auth headers
  // TODO: return array of previously cooked/saved recipes
};

// ─── Pantry ──────────────────────────────────────────────────────────────────

export const getPantry = async () => {
  // TODO: GET /api/pantry
  // TODO: requires auth headers
  // TODO: return array of pantry items
};

export const addPantryItem = async (item) => {
  // TODO: POST /api/pantry with { name, quantity, expiryDate }
  // TODO: requires auth headers
};

export const removePantryItem = async (itemId) => {
  // TODO: DELETE /api/pantry/:itemId
  // TODO: requires auth headers
};

// ─── Waste Tracking ──────────────────────────────────────────────────────────

export const getWasteStats = async () => {
  // TODO: GET /api/waste/stats
  // TODO: requires auth headers
  // TODO: return { itemsWasted, itemsSaved, wasteReduced }
};

export const logWasteEvent = async (itemId, wasWasted) => {
  // TODO: POST /api/waste/log with { itemId, wasWasted }
  // TODO: requires auth headers
};