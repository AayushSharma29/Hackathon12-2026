import React, { useState } from 'react';
import IngredientInput from '../components/IngredientInput';
import RecipeCard from '../components/RecipeCard';
import { searchRecipesByIngredients, saveRecipe } from '../services/api';

// Main recipe search page
const Dashboard = () => {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleIngredientsChange = (updatedIngredients) => {
    // TODO: update ingredients state
  };

  const handleSearch = async () => {
    // TODO: validate at least one ingredient is entered
    // TODO: setLoading(true)
    // TODO: call searchRecipesByIngredients(ingredients)
    // TODO: setRecipes(results)
    // TODO: handle errors with setError
    // TODO: setLoading(false)
  };

  const handleSaveRecipe = async (recipe) => {
    // TODO: call saveRecipe(recipe) from api service
    // TODO: show success/error feedback to user
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