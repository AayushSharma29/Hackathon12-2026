import React from 'react';

// Displays a single recipe returned from Spoonacular
const RecipeCard = ({ recipe, onSave }) => {
  const handleSave = () => {
    // TODO: call onSave(recipe) to save to user's history/saved list
  };

  const handleViewDetails = () => {
    // TODO: navigate to recipe detail page or open modal
    // Recipe fields from Spoonacular: recipe.id, recipe.title, recipe.image
    // recipe.usedIngredientCount, recipe.missedIngredientCount, recipe.likes
  };

  return (
    <div className="recipe-card">
      <img src={recipe?.image} alt={recipe?.title} />

      <div className="recipe-card-body">
        <h3>{recipe?.title}</h3>

        <div className="recipe-meta">
          <span>✅ Used: {recipe?.usedIngredientCount} ingredients</span>
          <span>❌ Missing: {recipe?.missedIngredientCount} ingredients</span>
        </div>

        <div className="recipe-actions">
          <button onClick={handleViewDetails}>View Recipe</button>
          <button onClick={handleSave}>💾 Save</button>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;