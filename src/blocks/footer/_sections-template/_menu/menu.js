// Hamburger and menu
$(document).ready(function() {
  var hamburger = $(".hamburger");
  var menu = $(".menu");
    hamburger.on("click", function(e) {
    hamburger.toggleClass("is-active")
    menu.toggleClass("js-menu-open");
  });
});