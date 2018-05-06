const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');


router.get('/books', searchController.getAllBooks);
router.get('/mybooks', searchController.getMyBooks);
router.get('/search', searchController.getSearch);
router.post('/trade', searchController.tradeRequest);
router.post('/trading', searchController.acceptRequest);
router.post('/traded', searchController.tradeComplete);


module.exports = router;
