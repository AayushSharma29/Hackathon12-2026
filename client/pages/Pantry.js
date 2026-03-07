import React, { useState, useEffect } from 'react';
import { getPantry, addPantryItem, removePantryItem } from '../services/api';

// Manage the user's saved pantry ingredients + food waste tracker
const Pantry = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', expiryDate: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: call fetchPantry() on component mount
  }, []);

  const fetchPantry = async () => {
    // TODO: call getPantry() from api service
    // TODO: setPantryItems(data)
    // TODO: handle errors
    // TODO: setLoading(false)
  };

  const handleAddItem = async () => {
    // TODO: validate newItem fields
    // TODO: call addPantryItem(newItem)
    // TODO: refresh pantry list
    // TODO: reset newItem form
  };

  const handleRemoveItem = async (itemId) => {
    // TODO: call removePantryItem(itemId)
    // TODO: update pantryItems state by filtering out removed item
  };

  const getExpiryStatus = (expiryDate) => {
    // TODO: return 'expired', 'expiring-soon' (within 3 days), or 'fresh'
    // Used to color-code items in the UI for food waste awareness
  };

  return (
    <div className="pantry">
      <h1>🧺 My Pantry</h1>

      {/* Food Waste Tracker — hackathon extra feature */}
      <div className="waste-tracker">
        <h2>♻️ Food Waste Tracker</h2>
        {/* TODO: show count of expired vs used items */}
        {/* TODO: show "items saved from waste" counter */}
      </div>

      {/* Add new item form */}
      <div className="add-item-form">
        <h2>Add Ingredient</h2>
        <input
          placeholder="Ingredient name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          placeholder="Quantity (e.g. 2 cups)"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
        />
        <input
          type="date"
          value={newItem.expiryDate}
          onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
        />
        <button onClick={handleAddItem}>Add to Pantry</button>
      </div>

      {error && <p className="error">{error}</p>}

      {/* Pantry list */}
      <div className="pantry-list">
        {loading ? (
          <p>Loading pantry...</p>
        ) : pantryItems.length === 0 ? (
          <p>Your pantry is empty. Add some ingredients!</p>
        ) : (
          pantryItems.map((item) => (
            <div key={item._id} className={`pantry-item ${getExpiryStatus(item.expiryDate)}`}>
              <span>{item.name}</span>
              <span>{item.quantity}</span>
              <span>Expires: {item.expiryDate}</span>
              <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Pantry;