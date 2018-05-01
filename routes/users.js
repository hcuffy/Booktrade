const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');


router.get('/profile', userController.getProfile);


module.exports = router;
