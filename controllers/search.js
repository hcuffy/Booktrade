const axios = require('axios');
const Book = require('../models/book')



exports.getAllBooks = (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err)
      return next(err)
 let myReq  = books.filter( book => book.trader.includes(req.user.id));

    res.render('books', {books, myReq })
  });
}

exports.getSearch = (req, res, next) => {

  let url = 'http://openlibrary.org/search.json?q='+ encodeURIComponent(req.query.search);
  let userId = req.user.id;
 axios.get(url).then(function (response) {
    let cover = 'http://covers.openlibrary.org/b/id/'+ response.data.docs[0].cover_i +'-M.jpg';
    let title = response.data.docs[0].title_suggest;

// Book.find({title : title}, (err, book) => {
//       if (err)
//         return next(err)
//       if (book.length > 0){
//        res.redirect('/book/mybooks');
//         return;
//       }
//
// });
    const newBook = new Book({title, cover , owner : [req.user.id], trader :[]})
      newBook.save(err => {
        if (err)
        return next(err)
      });
  //   res.redirect('/book/mybooks');

  }).catch(function (error) {
    console.log(error);
  });
}

exports.getMyBooks = (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err){
      return next(err)
    }
    let myBooks  = books.filter( book => book.owner.includes(req.user.id));
    let reqBooks  = myBooks.filter( book => book.trader.length > 0);
    res.render('mybooks', {myBooks , reqBooks })
  });

}

exports.tradeRequest = (req, res, next) => {
const { id}=req.body;

Book.update({_id : id}, { $push: { trader: req.user.id } },  function (err, book) {
  if (err) return check(err);

  res.send(['OK'])
});

}
