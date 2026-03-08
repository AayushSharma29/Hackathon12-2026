import React, { useState } from 'react';
import IngredientInput from '../components/IngredientInput';
import RecipeCard from '../components/RecipeCard';
import { searchRecipesByIngredients, saveRecipe } from '../services/api';

const Dashboard = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleIngredientsChange = (updatedIngredients) => {
    setIngredients(updatedIngredients);
  };

  const handleSearch = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const results = await searchRecipesByIngredients(ingredients);
      setRecipes(results);
    } catch (err) {
      setError(err.message || 'Failed to fetch recipes.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRecipe = async (recipe) => {
    try {
      await saveRecipe({
        spoonacularId: recipe.id,
        title: recipe.title,
        image: recipe.image,
        usedIngredients: (recipe.usedIngredients || []).map((i) => i.name),
        missedIngredients: (recipe.missedIngredients || []).map((i) => i.name),
      });
      setSuccessMsg(`"${recipe.title}" saved!`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setError(err.message || 'Failed to save recipe.');
    }
  };

  return (
    <div className="dashboard">
      <h1>Find Recipes</h1>
      <p>Enter ingredients you have and we'll find recipes for you!</p>

      <IngredientInput onIngredientsChange={handleIngredientsChange} />

      <button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : '🔍 Find Recipes'}
      </button>

      {error && <p className="error">{error}</p>}
      {successMsg && <p className="success">{successMsg}</p>}

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} onSave={handleSaveRecipe} />
        ))}
      </div>

      {recipes.length === 0 && !loading && (
        <p className="empty-state">No recipes yet. Add ingredients and search!</p>
      )}
    </div>
  );
};

export default Dashboard;