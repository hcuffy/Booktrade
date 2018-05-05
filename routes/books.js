const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');


router.get('/books', searchController.getAllBooks);
router.get('/mybooks', searchController.getMyBooks);
router.get('/search', searchController.getSearch);

module.exports = router;
