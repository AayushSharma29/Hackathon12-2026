import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🍽️ Food Finder</Link>
      </div>

      <div className="navbar-links">
        <Link to="/dashboard">Find Recipes</Link>
        <Link to="/pantry">My Pantry</Link>
      </div>

      <div className="navbar-auth">
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;