const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');

const app = express();

const User = require('./model/User');

require('dotenv').config();



const CookieParser = require('cookie-parser')

const jwtSecret = process.env.JWT_SECRET;

const jwt = require('jsonwebtoken');

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};

app.use(cors(corsOptions));


app.use(CookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// ---------------------------------------

// Register a new user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const createdUser = await User.create({ username, password });
    jwt.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
      if (err) {
        console.error('Failed to create JWT token:', err);
        res.status(500).json('Internal server error');
      } else {
        res.cookie('token', token).status(201).json({
          _id:CreatedUser._id
        });
      }
    });
  } catch (err) {
    console.error('Failed to register user:', err);
    res.status(500).json('Internal server error');
  }
});

app.listen(4040, () => {
  console.log('Server started listening on port 4040');
});
