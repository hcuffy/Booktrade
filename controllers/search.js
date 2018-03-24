const axios = require('axios');
const Book = require('../models/book')

exports.getAllBooks = (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err)
      return next(err)
    res.render('books', {books})
  });
}

exports.getSearch = (req, res, next) => {

  let url = 'http://openlibrary.org/search.json?q='+ encodeURIComponent(req.query.search);

  axios.get(url).then(function (response) {
    let cover = 'http://covers.openlibrary.org/b/id/'+ response.data.docs[0].cover_i +'-M.jpg';
    let title = response.data.docs[0].title_suggest;

    const newBook = new Book({title, cover})
      newBook.save(err => {
        if (err)
        return next(err)
      });
    res.send('Good');
  }).catch(function (error) {
    console.log(error);
  });
}
