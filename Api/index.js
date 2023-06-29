const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

app.use(express.urlencoded({extended:true}))

app.use(express.json())

// ------------------------------------------------------------------------------------------------------------

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });


//-------------------------------------------------------------------------------------------------------------

app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/register', (req, res) => {
  const { email, password } = req.body;
  res.json();
});

app.listen(4040, () => {
  console.log('Server started listening on port 4040');
});
