// localStorage
localStorage.setItem("key", "value");

// localStorage Jquery функция
$(function() {
  var ff = localStorage.getItem('fonts2');
  var fonts2 = $('.fonts2');
  if (ff = !null) {
    fonts2.css("font-family", "'Risque'")
  }
});

// localStorage JS функция
window.onload = function() {
  if (localStorage.getItem('key')!==null) {
    var ff = (localStorage.getItem('key'));
    document.getElementsByTagName('body')[0].style.background = 'green';
  }
  console.log(localStorage.getItem('key2'));
}