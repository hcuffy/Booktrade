const axios = require('axios');
const Book = require('../models/book')



exports.getAllBooks = (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err)
      return next(err)
 let myReq  = books.filter( book => book.trader.includes(req.user.username));

 function checkAcc(theBooks) {
 let checkedBooks  = [];
   theBooks.forEach(function (a) {
     a.accepted.forEach(function (b) {

       if (b.requestor == req.user.username) {
         checkedBooks.push(a);
       }
     });
   });

   return checkedBooks;

 }

 let accBooks  = checkAcc(books);
 console.log(myReq);

    res.render('books', {books, myReq, accBooks })
  });
}

exports.getSearch = (req, res, next) => {

  let url = 'http://openlibrary.org/search.json?q='+ encodeURIComponent(req.query.search);

 axios.get(url).then(function (response) {

if(response.data.num_found == 0){

res.redirect('/book/myBooks')

}
    let cover = 'http://covers.openlibrary.org/b/id/'+ response.data.docs[0].cover_i +'-M.jpg';
    let title = response.data.docs[0].title_suggest;
    let user = req.user.username;
Book.findOne({title : title}, (err, book) => {
      if (err)
        return next(err)
    console.log( "This is blank " + book);
      if (book == null ){
        console.log("test1");
        const newBook = new Book({title, cover , owner : [user], trader :[]})
          newBook.save(err => {
            if (err)
            return next(err)
          });

      }else if(book.owner.includes(user)){

        res.send();

      }else if(!book.owner.includes(user)){
        console.log("test3");
        Book.update({title : title}, { $push: { owner: user} }, function (err, book) {
          if (err) return next(err);
         res.send();
        });
      }

});
     res.redirect('/book/mybooks');

  }).catch(function (error) {
    console.log(error);
  });
}

exports.getMyBooks = (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err){
      return next(err)
    }
    let myBooks  = books.filter( book => book.owner.includes(req.user.username));
    let reqBooks  = myBooks.filter( book => book.trader.length > 0);

    function checkAcc(theBooks) {
    let checkedBooks  = [];
      theBooks.forEach(function (a) {
        a.accepted.forEach(function (b) {

          if (b.acceptor == req.user.username) {
            checkedBooks.push(a);
          }
        });
      });

      return checkedBooks;

    }

    let accBooks  = checkAcc(myBooks);


    res.render('mybooks', {myBooks , reqBooks, accBooks})
  });

}

exports.tradeRequest = (req, res, next) => {
const { id }=req.body;

Book.update({_id : id}, { $push: { trader: req.user.username} },  function (err, book) {
  if (err) return next(err);

  res.send()
});

}

exports.acceptRequest = (req, res, next) => {
const { id } = req.body;


Book.findById({_id : id}, (err, book) => {
  if (err)
    return next(err)

let accepted = { acceptor: req.user.username, requestor: book.trader[0] }

console.log(accepted);
Book.update({_id : id}, { $push: { accepted: accepted } }, function (err, book) {
  if (err) return next(err);

});

Book.update({_id : id}, { $pull: { trader : book.trader[0] } },  function (err, book) {
  if (err) return next(err);

  res.send(['OK'])
});

});

}

exports.tradeComplete = (req, res, next) => {
const { id } = req.body;

Book.findById({_id : id}, (err, book) => {
  if (err)
    return next(err)


Book.update({_id : id}, { $pull: { owner: req.user.username } }, function (err, book) {
  if (err) return next(err);

});

Book.update({_id : id}, { $set: { accepted : []  } },  function (err, book) {
  if (err) return next(err);

  res.send(['OK'])
});

});

}
