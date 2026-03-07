const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
connectDB();
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/pantry', require('./routes/pantry'));
app.use('/api/spoonacular', require('./routes/spoonacular'));
app.use('/api/waste', require('./routes/waste'));
app.get('/', (req, res) => res.send('Food Finder API running'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));