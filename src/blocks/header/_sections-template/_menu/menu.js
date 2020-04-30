// Hamburger and menu
$(document).ready(function() {

  $('.hamburger').on('click', function () {
    $(this).toggleClass('is-active');
    $('nav').toggleClass('menu-active');
  });
  
});