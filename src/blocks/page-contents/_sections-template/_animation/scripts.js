function click(btnLeftSel, btnRightSel, contentSel) {
  
  const btnShow = document.querySelector(btnLeftSel),
        btnClose= document.querySelector(btnRightSel),
        content = document.querySelector(contentSel);

  // Показ
  btnShow.addEventListener('click', function (e) {
    content.style.display = 'block';
    content.classList.add('text-enter');
    content.classList.remove('text-leave-active');
    content.classList.remove('text-leave');
    content.classList.remove('text-leave-to');
    
    raf(function () {
      content.classList.remove('text-enter');
      content.classList.add('text-enter-active');
      content.classList.add('text-enter-to');
    })

    const contentAddShow = function () {
      content.style.display = 'block';
    }

    content.addEventListener('transitionend', contentAddShow)

  })

  // Скрытие
  btnClose.addEventListener('click', function () {
    content.classList.add('text-leave');
    content.classList.remove('text-enter-active');
    content.classList.remove('text-enter-to');

    raf(function () {
      content.classList.remove('text-leave');
      content.classList.add('text-leave-active');
      content.classList.add('text-leave-to');
    })

    const contentAddNone = function () {
      content.style.display = 'none';
      content.removeEventListener('transitionend', contentAddNone)
    }
    content.addEventListener('transitionend', contentAddNone)
  })

  function raf(fn) {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        fn();
      })
    })
  }

  

}
click('.btn-left', '.btn-right', '.text');
