// Cookie 
$(document).ready(function(){
	// cookie open при первом посещении
	$(function() {
	  var visited_site = localStorage.getItem('visited_site');
	  if (visited_site != 'yes') {
	    $('.cookie').css('display', 'block');
	  }
	});
	// Cookie close при повторном посещении
	$('.cookie__content_close').click(function(){
	   // Посещение сайта
	   localStorage.setItem("visited_site", "yes");
	   $('.cookie').css('display', 'none');
	});
});