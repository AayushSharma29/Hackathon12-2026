import React from 'react';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe, onSave }) => {
  const navigate = useNavigate();

  const handleSave = () => {
    onSave(recipe);
  };

  const handleViewDetails = () => {
    navigate(`/recipe/${recipe.id}`);
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