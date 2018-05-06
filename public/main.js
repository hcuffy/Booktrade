$(document).ready(function() {

  $('.btn-outline-primary').click( function () {

    $.ajax({
      url: '/book/trade/',
      type: 'POST',
      data: {id : this.id},
      success: function(result) {
        document.location.href = '/book/books/';
      },
      error: function() {
        alert('Cannot update book. Something went wrong.');
      }
    });
  })

  $('.btn-outline-secondary').click( function () {
    $.ajax({
      url: '/book/trading/',
      type: 'POST',
      data: {id:this.id},
      success: function(result) {
        document.location.href = '/book/myBooks/';
      },
      error: function() {
        alert('Cannot update book. Something went wrong.');
      }
    });
  })

  $('.fa-check-circle').click( function () {
    $.ajax({
      url: '/book/traded/',
      type: 'POST',
      data: {id:this.id},
      success: function(result) {
        document.location.href = '/book/myBooks/';
      },
      error: function() {
        alert('Cannot update book. Something went wrong.');
      }
    });
  })


});
