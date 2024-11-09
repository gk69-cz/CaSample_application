const express = require('express');
const router = express.Router();
const helloController = require('../controller/hellowcontroler');

router.get('/hello', helloController.sayHello);

module.exports = router;
