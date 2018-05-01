const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');
const userController = require('../controllers/user');

router.use('/book', require('./books'));
router.use('/user', require('./users'));

router.get('/search', searchController.getSearch);
router.get('/register', userController.getRegistration);
router.get('/', (req, res) => {
  res.render('index');
});


module.exports = router;
