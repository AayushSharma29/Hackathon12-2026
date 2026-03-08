import React, { useState } from 'react';

const IngredientInput = ({ onIngredientsChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleAddIngredient = () => {
    const trimmed = inputValue.trim();
    if (!trimmed || ingredients.includes(trimmed)) return;
    const updated = [...ingredients, trimmed];
    setIngredients(updated);
    setInputValue('');
    onIngredientsChange(updated);
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    const updated = ingredients.filter((i) => i !== ingredientToRemove);
    setIngredients(updated);
    onIngredientsChange(updated);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddIngredient();
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