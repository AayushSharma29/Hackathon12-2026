const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// ─── Database ────────────────────────────────────────────────────────────────
// TODO: call connectDB()

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/pantry', require('./routes/pantry'));
app.use('/api/spoonacular', require('./routes/spoonacular'));
app.use('/api/waste', require('./routes/waste'));

// TODO: add /api/auth route for login/register (using User model + JWT)

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/', (req, res) => res.send('Food Finder API running ✅'));

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));