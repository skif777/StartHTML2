
function tabs(tabsWrapSel, tabSel, contentSel) {

  const tabBtn = document.querySelectorAll(tabSel),
        tabContent = document.querySelectorAll(contentSel),
        tabs = document.querySelector(tabsWrapSel);

  function tabClose() {
    for (let content of tabContent) {
      content.style.display = 'none';
    }

    tabBtn.forEach( (item) => {
      item.classList.remove('tab-active')
    })
  }

  function tabShow(i = 0) {
    tabBtn[i].classList.add('tab-active');
    tabContent[i].style.display = 'block';
  }

  tabs.addEventListener('click', (e) => {
    for (let i = 0; i < tabBtn.length; i++) {
      if (e.target == tabBtn[i]) {
        tabClose()
        tabShow(i)
      }
    }
  })


}
tabs('.tabs', '.tab', '.tab-content')