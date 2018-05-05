$(document).ready(function() {

  $('.btn-outline-primary').click( function () {

    $.ajax({
      url: '/book/trade/',
      type: 'POST',
      data: {id:this.id},
      success: function(result) {
        document.location.href = '/book/books/';
      },
      error: function() {
        alert('Cannot update book. Something went wrong.');
      }
    });
  })
});
