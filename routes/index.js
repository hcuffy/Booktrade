const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');


router.use('/book', require('./books'));
router.use('/user', require('./users'));

router.get('/search', searchController.getSearch);
router.get('/', (req, res) => {
  res.render('index');
});


module.exports = router;
