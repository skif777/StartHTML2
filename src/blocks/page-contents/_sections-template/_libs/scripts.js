function $(selector) {
  return new Libs(selector);
}

class Libs {
  constructor(selector) {
    if (!selector) {
      return this;
    }
    if (selector.tagName) {
      this.elems = {0: selector};
      this.length = 1;
      return this;
    }
    this.elems = document.querySelectorAll(selector);
    this.length = document.querySelectorAll(selector).length;
  }
  show() {
    for (let i = 0; i < this.length; i++) {
      this.elems[i].style.display = '';
    }
    return this;
  }
  hide() {
    for (let i = 0; i < this.length; i++) {
      this.elems[i].style.display = 'none';
    }
    return this;
  }
  addClass(...classNames) {
    for (let i = 0; i < this.length; i++) {
      this.elems[i].classList.add(...classNames);
    }
    return this;
  }
  removeClass(...classNames) {
    for (let i = 0; i < this.length; i++) {
      this.elems[i].classList.remove(...classNames);
    }
    return this;
  }
  toggleClass(className) {
    for (let i = 0; i < this.length; i++) {
      this.elems[i].classList.toggle(className);
    }
    return this;
  }
  on(event, callback) {
    if (!event || !callback) {
      return this;
    }
    for (let i = 0; i < this.length; i++) {
      this.elems[i].addEventListener(event, callback);
    }
    return this;
  }
  off(event, callback) {
    if (!event || !callback) {
      return this;
    }
    for (let i = 0; i < this.length; i++) {
      this.elems[i].removeEventListener(event, callback);
    }
    return this;
  }
  click(hadler) {
    for (let i = 0; i < this.length; i++) {
      if (hadler) {
        this.elems[i].addEventListener('click', hadler);
      } else {
        this.elems[i].click();
      }
    }
    return this;
  }
  eq(i) {
    if ( i === undefined) {
      return this;
    }
    const arrayElems = [...this.elems];
    let elemIndex;

    arrayElems.find(function(item, index) {
      if (index == i) {
        elemIndex = {0: item};
      }
    })

    this.elems = elemIndex;
    this.length = 1;
    return this;
  }
  index() {
    const arrayElems = [...this.elems];
    let elemIndex;
   
    arrayElems.find(function(item, index) {
      if (index == 0) {
        elemIndex = index;
      }
    })

    return elemIndex;

  }
  find(selector) {
    let arrElems = document.querySelectorAll(selector);
    let elem = new Map();
    arrElems = [...arrElems];

    for (let i = 0; i < arrElems.length; i++) {
      elem.set(i, arrElems[i]);
    }
    
    this.elems = Object.fromEntries(elem.entries());
    this.length = elem.size;
    return this;
  }
  closest(selector) {
    let arrElems = [...this.elems];
    let elem = new Map();

    for (let i = 0; i < arrElems.length; i++) {
      elem.set(i, arrElems[i].closest(selector));
    }

    this.elems = Object.fromEntries(elem.entries());
    this.length = elem.size;
    return this;
  }
  siblings() {
    const elems = this.elems[0];
    let arrElems;

    for (let i = 0; i < this.length; i++) {
      arrElems = [...this.elems[i].parentNode.children];
    }

    arrElems.find(function(item, index, arr) {
      if (item === elems) {
        arr.splice(index, 1)
      }
    })

    this.elems = Object.fromEntries(arrElems.entries());
    this.length = arrElems.length;
    return this;
  }
  animateOverTime(dur, cb, fin) {
    let timestart;
 
    function _animateOverTime(time) {
      if (!timestart) {
        timestart = time;
      }

      let timeElapsed = time - timestart;
      let complection = Math.min(timeElapsed / dur, 1);



      cb(complection);

      if (timeElapsed < dur) {
        window.requestAnimationFrame(_animateOverTime);
      }
      if (timeElapsed > dur && fin) {
        fin();
      }
    }

    return _animateOverTime;
  }
  fadeIn(dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
      this.elems[i].style.display = display || 'block';

      const _fadeIn = (complection) => {
        this.elems[i].style.opacity = complection; 
      }

      const ani = this.animateOverTime(dur, _fadeIn, fin);
      requestAnimationFrame(ani);
    }

    return this;
  }
  fadeOut(dur, fin) {
    for (let i = 0; i < this.length; i++) {

      const _fadeOut = (complection) => {
        this.elems[i].style.opacity = 1 - complection;
        if (complection === 1) {
          this.elems[i].style.display = 'none';
        } 
      }

      const ani = this.animateOverTime(dur, _fadeOut, fin);
      requestAnimationFrame(ani);
    }

    return this;
  }
  fadeToggle(dur, display, fin) {
    for (let i = 0; i < this.length; i++) {
      if (window.getComputedStyle(this.elems[i]).display === 'none') {
        this.fadeIn(dur);
        return this;
      } else {
        this.fadeOut(dur);
        return this;
      }
    }
  }
  modal() {
    for (let i = 0; i < this.length; i++) {
      const target = this.elems[i].getAttribute('data-target');
      console.log(target);
      document.querySelector('.btn-modal').addEventListener('click', function(e) {
        e.preventDefault();
        $(target).fadeIn(500, 'flex');
        document.body.style.overflow = 'hidden';
      })
      document.querySelector('.modal-wrap').addEventListener('click', function(e) {
        if (e.target.matches('.modal-wrap') || e.target.matches('.modal__content_close-icon')) {
          $(this).fadeOut(500);
          document.body.style.overflow = '';
        }
      })
    }
  }

}
//console.log($('.more').fadeToggle(3000));
$('[data-toggle="active-modal"]').modal()