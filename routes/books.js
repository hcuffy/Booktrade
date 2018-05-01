const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');


router.get('/books', searchController.getAllBooks);
router.get('/mybooks', searchController.getMyBooks);


module.exports = router;