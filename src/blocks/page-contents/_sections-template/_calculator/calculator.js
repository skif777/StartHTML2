function calculator(params) {
  
  let sym = document.querySelectorAll('.sym');
  let display = document.querySelector('.disp');


  for(let i = 0; i < sym.length; i++) {
    sym[i].onclick = function () {
      input(this.innerHTML)
    }

    function input(value) {
      display.value = display.value + value;
    }

    document.querySelector('.sym-plus').onclick = function () {
      if(eval(display.value) != '+') {
        display.value = display.value + this.innerHTML;
      }
    }

    document.querySelector('.sym-result').onclick = function () {
      if(eval(display.value) == undefined) {
        display.value = 0;
      }
      if(eval(display.value) == Infinity) {
        display.value = 'На ноль делить нельзя';
      }
      display.value = eval(display.value);

    }

    document.querySelector('.sym-ce').onclick = function () {
      display.value = display.value.substring(0, display.value.length-1)
    }

  }

}
calculator();