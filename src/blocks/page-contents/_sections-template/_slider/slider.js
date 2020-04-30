
function slidersSite() {

  let sliders = document.querySelectorAll('.img'),
    index = sliders.length,
    value = 2;
    if(value > sliders.length) {
      console.error(`Переменная value не может быть длинее количества слайдеров ${sliders.length}`);
    }

  function sliderShow() {

    for(let i = value; i < sliders.length; i++) {
      sliders[i].style.display = 'none';
    };

    document.querySelector('.nav-right').onclick = function() {

      sliderClose();

      if(index == sliders.length) {
        index = 0;
      }
      if(value == 1 && index == sliders.length -1) {
        index = -1;
      }
      if(value == 2 && index == sliders.length -2) {
        index = -1;
      }
      if(value == 3 && index == sliders.length -3) {
        index = -1;
      }
      if(value == 4 && index == sliders.length -4) {
        index = -1;
      }
      if(value == 5 && index == sliders.length -5) {
        index = -1;
      }
      if(value == 6 && index == sliders.length -6) {
        index = -1;
      }
      if(value == 7 && index == sliders.length -7) {
        index = -1;
      }
      if(value == 8 && index == sliders.length -8) {
        index = -1;
      }
      if(value == 9 && index == sliders.length -9) {
        index = -1;
      }

      index++;
      console.log(`Клик в право индеск - ${index}`)
      
      sliderNav();

     

    };

    document.querySelector('.nav-left').onclick = function() {

      sliderClose();

      if(index == 0) {
        index = sliders.length;
      }
      if(value == 2 && index == sliders.length) {
        index = sliders.length -1;
      }
      if(value == 3 && index == sliders.length) {
        index = sliders.length -2;
      }
      if(value == 4 && index == sliders.length) {
        index = sliders.length -3;
      }
      if(value == 5 && index == sliders.length) {
        index = sliders.length -4;
      }
      if(value == 6 && index == sliders.length) {
        index = sliders.length -5;
      }
      if(value == 7 && index == sliders.length) {
        index = sliders.length -6;
      }
      if(value == 8 && index == sliders.length) {
        index = sliders.length -7;
      }
      if(value == 9 && index == sliders.length) {
        index = sliders.length -8;
      }

      index--;
      console.log(`Клик в лево индекс - ${index}`)
    
      sliderNav();

    };
    
  };
  sliderShow();

  function sliderNav() {

    for(let i = 0; i < value; i++) {
      sliders[index + i].style.display = 'flex';
    }

  };

  function sliderClose() {
    for(let i = 0; i < sliders.length; i++) {
      sliders[i].style.display = 'none';
    };
  };

  function dots() {
    let dots = document.querySelector('.slider-dots');

    for(let i = 1; i <= sliders.length; i++) {
      dots.innerHTML += `<div class="dot">${i}</div>`;
    }

    function dotsAcive() {
      let dot = document.querySelectorAll('.dot');

      for(let i = 0; i < sliders.length; i++) {
        
        dot[i].onclick = function () {

          sliderClose();
          

          for(let k = 0; k < dot.length; k++) {
            dot[k].style.fontSize = '16px';
          }
          for(let c = 0; c < value; c++) {
            sliders[i + c].style.display = 'flex';
          }
          this.style.fontSize = '20px';
        }

        if(value > 1 && i == sliders.length -1) {
          for(let b = sliders.length; b > (sliders.length - value +1); b--) {
            dot[b - 1].style.display = 'none';
          }
        }

      }

    }
    dotsAcive();

  }
  //dots();

  function timer() {

    let indexSld = value;
   
    function timerSliderTick() {
      indexSld--;
      if(indexSld == 0) {
        if(value == sliders.length) {
          value = sliders.length -1;
        }
        for(let m = 0; m < value; m++) {
          sliders[m].style.display = 'flex';
          indexSld = value;
        }
      }
      console.log(indexSld)
      sliders[indexSld].style.display = 'none';
    }
    // let timeId = setInterval(() => timerSliderTick(), 5000);
    // setTimeout(() => { clearInterval(timeId); console.log('Useee'); }, 10000);
    setInterval(() => timerSliderTick(), 2000);
  }
  //timer();
  


  /*function newSliderShow() {

    for(let i = value; i < sliders.length; i++) {
      sliders[i].style.display = 'none';
    };

    let iter = generator();
    let next = iter.next();

    function* generator() {
      yield index;
      while(index > 0) {
        yield index--;
        if(index == 0) {
          yield index = sliders.length -1;
        };
      };
      
    };
    
    document.querySelector('.nav-left').onclick = function () {

      sliderClose();
      console.log(iter.next());
      sliderNav();
    };

    document.querySelector('.nav-right').onclick = function () {

      sliderClose();
      console.log(iter.next());
      sliderNav();
    };

    function sliderNav() {

      for(let i = 0; i < value; i++) {
        sliders[index + i].style.display = 'flex';
      }
  
    };

    function sliderClose() {
      for(let slider of sliders) {
        slider.style.display = 'none';
      };
    };

  };
  newSliderShow();
  */

}
slidersSite();
