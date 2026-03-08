import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/api';

const Home = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError(null);
    const { name, email, password } = formData;

    if (!email || !password || (isRegistering && !name)) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const data = isRegistering
        ? await registerUser(name, email, password)
        : await loginUser(email, password);

      localStorage.setItem('token', data.token);
      onLogin(data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication failed.');
    }
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