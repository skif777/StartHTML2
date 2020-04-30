
// Кнопка на вверх
$(document).ready(function() {
  $(window).scroll(function() {
    if($(this).scrollTop() != 0) {
    $('#up-button').fadeIn();
} else {
    $('#up-button').fadeOut();
  }
  });
  $('#up-button').click(function() {
    $('body,html').animate({scrollTop:0},800);
  });
});
