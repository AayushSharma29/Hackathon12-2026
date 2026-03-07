import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';

// Landing page with login / register
const Home = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    // TODO: update formData field by e.target.name
  };

  const handleSubmit = async () => {
    // TODO: validate form fields are filled
    // TODO: call loginUser or registerUser based on isRegistering
    // TODO: on success, store JWT token in localStorage
    // TODO: call onLogin(user) to update app state
    // TODO: navigate to /dashboard
    // TODO: handle errors with setError
  };

  return (
    <div className="home">
      <div className="hero">
        <h1>🍽️ Food Finder</h1>
        <p>Turn your ingredients into delicious meals. Reduce food waste.</p>
      </div>

      <div className="auth-form">
        <h2>{isRegistering ? 'Create Account' : 'Login'}</h2>

        {isRegistering && (
          <input name="name" placeholder="Your name" onChange={handleChange} />
        )}
        <input name="email" type="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />

        {error && <p className="error">{error}</p>}

        <button onClick={handleSubmit}>
          {isRegistering ? 'Sign Up' : 'Login'}
        </button>

        <p>
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <button onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Home;