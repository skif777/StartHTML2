$(document).ready(function () {

  function handler( event ) {

      var target = $( event.target );
      
      if ( target.is( ".header" ) ) {
        target.siblings().toggle();
      }
      
    }
    
    $( ".header" ).click( handler );
    
});