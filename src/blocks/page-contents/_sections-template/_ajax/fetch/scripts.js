// Получение через Async
async function getResp() {

  let response = await fetch('https://jsonplaceholder.typicode.com/users');
  let content = await response.json();
  console.log(`Способ 1 - ${content[0].name}`)

}
getResp();

// Получение через promise
function fetchPromise() {
  
  let response = fetch('https://jsonplaceholder.typicode.com/users');

  response
    .then(function(resp) {
      //console.log(resp)
      let content = resp.json();
      return content;
    })
    .then(function(content) {
      console.log(`Способ 2 - ${content[0].name}`)
    })
}

fetchPromise();

// Отправка через promise
function fetchPost(params) {

  document.querySelector('.btn').addEventListener('click', function() {
    ajax()
    .then(function(res) {
      let serverResponse = res.json();
      return serverResponse;
    })
    .then(function(serverResponse) {
      if(serverResponse == 1) {
        console.log('Данные отправленны!')
      }
      if(serverResponse == 2) {
        console.log('Данные НЕ отправленны!')
      }
    })
    .catch(function(rej) {
      console.log(rej)
    })
  })

  function ajax() {
    let data = new FormData(document.forms.myform);
    let response = fetch('form.php', {
      method: 'POST',
      body: data
    });
    return response;
  } 
}
fetchPost();


