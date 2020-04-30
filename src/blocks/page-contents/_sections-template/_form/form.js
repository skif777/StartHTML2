
// ajax form
function formProcessing() {

  const forms = document.querySelectorAll('form'),
        input = document.querySelectorAll('form > label > input');

  let message = {
    loading: 'Загрузка....',
    success: 'Спасибо! Форма отправленна!',
    fail: 'Ошибка!'
  }

  const postData = function (url, data) {
    document.querySelector('.status').textContent = message.loading;
    let response = fetch(url, {
      method: 'POST',
      body: data
    })
    return response;
  }

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      form.appendChild(statusMessage);

      const formDate = new FormData(form);

      postData('form.php', formDate)
        .then(res => {
          console.log(`Ответ с сервера ${res}`)
        })
        .catch((rej) => {
          console.log(rej)
        })
        .finally(() => {
          console.log('Завершенно')
        })
    })
  })


}
formProcessing()