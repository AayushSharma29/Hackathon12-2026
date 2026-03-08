// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors({ origin: '*' }));
app.use(express.json());

// Make prisma available to routes
app.set('prisma', prisma);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/pantry', require('./routes/pantry'));
app.use('/api/spoonacular', require('./routes/spoonacular'));
app.use('/api/waste', require('./routes/waste'));

app.get('/', (req, res) => res.send('Food Finder API running'));

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await prisma.$connect();
    console.log('PostgreSQL Connected via Prisma');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

start();