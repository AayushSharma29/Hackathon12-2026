const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

const handleResponse = async (res) => {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
};

// ─── Auth ────────────────────────────────────────────────────────────────────

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
};

export const registerUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
};

// ─── Recipes (Spoonacular via backend) ───────────────────────────────────────

export const searchRecipesByIngredients = async (ingredients) => {
  const query = ingredients.join(',');
  const res = await fetch(`${BASE_URL}/spoonacular/findByIngredients?ingredients=${encodeURIComponent(query)}`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
};

export const saveRecipe = async (recipe) => {
  const res = await fetch(`${BASE_URL}/spoonacular/save`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(recipe),
  });
  return handleResponse(res);
};

export const getCookingHistory = async () => {
  const res = await fetch(`${BASE_URL}/spoonacular/history`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
};

// ─── Pantry ──────────────────────────────────────────────────────────────────

export const getPantry = async () => {
  const res = await fetch(`${BASE_URL}/pantry`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
};

export const addPantryItem = async (item) => {
  const res = await fetch(`${BASE_URL}/pantry`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(item),
  });
  return handleResponse(res);
};

export const removePantryItem = async (itemId) => {
  const res = await fetch(`${BASE_URL}/pantry/${itemId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse(res);
};

// ─── Waste Tracking ──────────────────────────────────────────────────────────

export const getWasteStats = async () => {
  const res = await fetch(`${BASE_URL}/waste/stats`, {
    headers: authHeaders(),
  });
  return handleResponse(res);
};

export const logWasteEvent = async (itemId, wasWasted) => {
  const res = await fetch(`${BASE_URL}/waste/log`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ itemId, wasWasted }),
  });
  return handleResponse(res);
};