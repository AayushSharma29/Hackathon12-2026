import React, { useState, useEffect } from 'react';
import { getPantry, addPantryItem, removePantryItem, getWasteStats } from '../services/api';

const Pantry = () => {
  const [pantryItems, setPantryItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '', expiryDate: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wasteStats, setWasteStats] = useState(null);

  useEffect(() => {
    fetchPantry();
    fetchWasteStats();
  }, []);

  const fetchPantry = async () => {
    try {
      const data = await getPantry();
      setPantryItems(data);
    } catch (err) {
      setError(err.message || 'Failed to load pantry.');
    } finally {
      setLoading(false);
    }
  };

  const fetchWasteStats = async () => {
    try {
      const stats = await getWasteStats();
      setWasteStats(stats);
    } catch {
      // non-critical, ignore
    }
  };

  const handleAddItem = async () => {
    if (!newItem.name) {
      setError('Ingredient name is required.');
      return;
    }
    setError(null);
    try {
      await addPantryItem(newItem);
      setNewItem({ name: '', quantity: '', expiryDate: '' });
      await fetchPantry();
    } catch (err) {
      setError(err.message || 'Failed to add item.');
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removePantryItem(itemId);
      setPantryItems((prev) => prev.filter((i) => i._id !== itemId));
    } catch (err) {
      setError(err.message || 'Failed to remove item.');
    }
  };

  const getExpiryStatus = (expiryDate) => {
    if (!expiryDate) return 'fresh';
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffDays = (expiry - now) / (1000 * 60 * 60 * 24);
    if (diffDays < 0) return 'expired';
    if (diffDays <= 3) return 'expiring-soon';
    return 'fresh';
  };

  return (
    <div className="pantry">
      <h1>🧺 My Pantry</h1>

      {/* Food Waste Tracker */}
      <div className="waste-tracker">
        <h2>♻️ Food Waste Tracker</h2>
        {wasteStats ? (
          <div className="waste-stats">
            <span>🗑️ Items wasted: {wasteStats.itemsWasted}</span>
            <span>🍳 Recipes made: {wasteStats.recipesMade}</span>
            <span>✅ Ingredients saved from waste: {wasteStats.ingredientsSaved}</span>
          </div>
        ) : (
          <p>Loading stats...</p>
        )}
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
              <span>Expires: {item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}</span>
              <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Pantry;