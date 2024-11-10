const express = require('express');
const router = express.Router();
const helloController = require('./helloController');

router.get('/hello', helloController.sayHello);

module.exports = router;
