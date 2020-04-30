function ajaxGet() {
  
  let btn = document.querySelector('.btn'),
      text = document.querySelector('.text'),
      url = 'https://jsonplaceholder.typicode.com/users';

  btn.addEventListener('click', function (data) {
    ajaxGetPush();
  })

  function ajaxGetPush(data) {
  
    // 1. Создать XMLHttpRequest
    let xhr = new XMLHttpRequest();
    //xhr.withCredentials = true; // - Запросы на другой источник

    // 2. Инициализировать его
    // 2.1 Указать параметры: method, URL, [async, user, password]
    // 2.2 Парам 1 - метод: POST или GET, Парам 2 - URL, куда отправляется запрос, Парам 3 - если указать false, тогда запрос будет выполнен синхронно, user, password – логин и пароль для базовой HTTP-авторизации (если требуется)
    xhr.open('GET', url);

    // Устанавливаем заголовки после событие 'open' (xhr.open)
     //xhr.setRequestHeader('Content-Type', 'application/json');

    // Указать ожидаемый тип ответа
    xhr.responseType = 'json'; // - json, document, text, blob, arraybuffer

    // 3. Послать запрос
    xhr.send()
    
    // 4. Обработать события файла load/error/progress взамен 'onreadystatechange'
    // Load происходит, когда получен какой-либо ответ, включая ответы с HTTP-ошибкой
    xhr.addEventListener('load', function () {
      if(xhr.status >= 400) {
        console.error(xhr.response)
      } else {
        text.value = xhr.response[0].name;
      }
    })

    // Error происходит, только когда запрос совсем не получилось выполнить
    xhr.addEventListener('error', function () {
      console.log(`Ошибка соединения`);
    })

    // Progress происходит периодически во время загрузки ответа, сообщает о прогрессе.
    xhr.addEventListener('progress', function (params) {
      // event.loaded - количество загруженных байт
      // event.lengthComputable = равно true, если сервер присылает заголовок Content-Length
      // event.total - количество байт всего (только если lengthComputable равно true)
      //console.log(`Загружено ${event.loaded} из ${event.total}`);
    })

    // Если мы передумали делать запрос, можно отменить его вызовом
    //xhr.abort();

    // Если же нам нужно следить именно за процессом отправки данных на сервер - xhr.upload
    //console.log(xhr.upload)
  }

}
ajaxGet();

// Работаем только на сервере (локальном тоже)
function ajaxPost() {

  let form = document.querySelector('.form'),
      btn = document.querySelector('.button'),
      resp = document.querySelector('.response'),
      inp_name = document.querySelector('input[name=name]'),
      inp_email = document.querySelector('input[name=email]'),
      sel_country = document.querySelector('select[name=country]');
    

  btn.addEventListener('click', function() {
    
    // Для передачи данных берем значения из формы с помощью встроенного объекта FormData
    let formData = new FormData(form);

    // Добавление полей в форму пар 'name' и 'value' input (если необходимо)
    //formData.append('name', 'kononov');
    //formData.append('email', 'kononov-genii@mail.ru');

    ajaxPostPush(formData, function(res) {
      resp.innerHTML = res;
    });
  })

  function ajaxPostPush(data, cb) {
    let xhr = new XMLHttpRequest();

    xhr.open('POST', 'form.php');

    // переводим данные формы в формат JSON если необходимо
    //let jsonData = JSON.stringify(data);

    xhr.send(data);

    // установка заголовка для обработки в PHP
    //xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    xhr.addEventListener('load', function () {
      
      console.log(`Ответ: ${xhr.response}, Статус: ${xhr.status}`);

      // Отправляем ответ в callback
      cb(xhr.response)
      
    })

    xhr.addEventListener('error', function () {
      console.error(`Ошибка соединения`);
    })
    
    // промежуток времени, который мы готовы ждать ответ
    xhr.timeout = 10000;
  }
  
}
ajaxPost();

