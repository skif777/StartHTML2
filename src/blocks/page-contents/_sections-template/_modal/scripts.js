function modalActive() {

  let modal = document.querySelector('.modal-wrap'),
      close = document.querySelector('.modal__content_close-icon'),
      modalContent = document.querySelector('.modal');

  modal.style.display = 'flex';

  close.onclick = function() {
    modal.style.display = 'none';
  }

  modal.addEventListener('click', function() {
    modal.style.display = 'none';
  }, false);

  modalContent.addEventListener('click', function(e) {
    e.stopPropagation();
  });

}
modalActive();