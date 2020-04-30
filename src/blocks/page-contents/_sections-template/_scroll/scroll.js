function scrollNavigationPage() {

  let content = document.querySelector('.content'),
      blocks = document.querySelectorAll('.block'),
      range = document.querySelector('.navigation__block_range'),
      naviNumberBefore = document.querySelector('.navigation__block_before'),
      naviNumberAfter = document.querySelector('.navigation__block_after');

  // Получение высоты страницы
  let scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );

  // Установка арибутов input range
  function setNavigationValue() {
    let sizePage = scrollHeight - window.innerHeight;
    range.setAttribute('max', sizePage);
    range.value = window.pageYOffset;
  }
  setNavigationValue();

  function setNavigationValueScroll() {

    range.addEventListener('input', function() {
      window.scrollTo(0, range.value);
    });

    window.addEventListener('scroll', function() {
      range.value = window.pageYOffset;

      for(let i = 0; i < blocks.length; i++) {
  
        if(window.pageYOffset >= (blocks[i].offsetTop -450) && window.pageYOffset <= (blocks[i].offsetTop + blocks[i].clientHeight) ) {
          naviNumberBefore.innerHTML = Number(blocks[i].dataset.number);

          if(Number(blocks[i].dataset.number) < blocks.length) {
            naviNumberAfter.innerHTML = Number(blocks[i].dataset.number) +1;

          }
        }
  
      }

    });

  }
  setNavigationValueScroll();

  function setAtrBLock() {
    
    num = 1;
    for(let i = 0; i < blocks.length; i++) {

      blocks[i].dataset.number = num++;

      if(window.pageYOffset >= (blocks[i].offsetTop -350) && window.pageYOffset <= (blocks[i].offsetTop + blocks[i].clientHeight) ) {
        naviNumberBefore.innerHTML = blocks[i].dataset.number;
      }

    }
  }
  setAtrBLock();

  function showIndicatorLoad() {
    let indicator = document.querySelector('.indicator-wrap'),
        indicatorLine = document.querySelector('.indindicator__line');
    // Находим процентое соотношение двух чисел
    let indicatorProcent = Math.ceil( (window.pageYOffset) / scrollHeight * 100);

    console.log(indicatorProcent)

    
    indicator.style.display = 'block';
    indicator.style.top = window.innerHeight - 18 + 'px';
    indicatorLine.style.width = indicatorProcent + '%';
    
    window.addEventListener('scroll', function () {
      // Находим процентое соотношение двух чисел
      let indicatorProcent = Math.ceil( (window.pageYOffset) / (scrollHeight - 870) * 100);

      indicator.style.top = (window.innerHeight + window.pageYOffset) - 18 + 'px';

      indicatorLine.style.width = indicatorProcent + '%';

      if(indicatorProcent > 99) {
        indicatorLine.style.width = 100 + '%';
      }
    })

  }
  showIndicatorLoad();
  
}
scrollNavigationPage();