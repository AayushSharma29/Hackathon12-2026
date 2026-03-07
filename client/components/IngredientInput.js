import React, { useState } from 'react';

// Component for adding/removing ingredients to search with
const IngredientInput = ({ onIngredientsChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleAddIngredient = () => {
    // TODO: validate inputValue is not empty/duplicate
    // TODO: update ingredients list
    // TODO: call onIngredientsChange(updatedIngredients)
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    // TODO: filter out ingredientToRemove from ingredients
    // TODO: call onIngredientsChange(updatedIngredients)
  };

  const handleKeyDown = (e) => {
    // TODO: if Enter key, call handleAddIngredient
  };

  return (
    <div className="ingredient-input">
      <div className="input-row">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter an ingredient..."
        />
        <button onClick={handleAddIngredient}>Add</button>
      </div>

      <ul className="ingredient-list">
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            <span>{ingredient}</span>
            <button onClick={() => handleRemoveIngredient(ingredient)}>✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientInput;