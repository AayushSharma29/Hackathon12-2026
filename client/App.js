import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Pantry from './pages/Pantry';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // TODO: check localStorage for existing JWT token on app load
    // TODO: if token exists, decode it and setUser(decoded)
    // TODO: if token is expired, clear it and leave user as null
  }, []);

  const handleLogin = (userData) => {
    // TODO: setUser(userData)
  };

  const handleLogout = () => {
    // TODO: remove token from localStorage
    // TODO: setUser(null)
  };

  // Wrapper to protect routes that require login
  const PrivateRoute = ({ children }) => {
    // TODO: return children if user is logged in, else <Navigate to="/" />
    return user ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home onLogin={handleLogin} />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute><Dashboard /></PrivateRoute>}
          />
          <Route
            path="/pantry"
            element={<PrivateRoute><Pantry /></PrivateRoute>}
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;