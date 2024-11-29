const express = require('express');
const router = express.Router();
const helloController = require('./controling');  // Update this to the path of controling.js

router.get('/hello', helloController.sayHello);

router.get('/', (req, res) => {
  res.send('Welcome to Home Page!');
});

module.exports = router;
