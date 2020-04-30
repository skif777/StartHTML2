var html = document.documentElement;
// Если первое посещение выполняем загрузку шрифтов через fontfaceobserver, при повторно добавляем класс к html
if (sessionStorage.fontsLoaded) {
  html.classList.add("webfont-loaded");
} else {
  var script = document.createElement("script");
  script.src = "./js/fontfaceobserver.js"; // Изменить папку темы
  script.async = true;
  // Загрузка подключенных шрифтов (необходимо внести названия шрифтов в переменные)
  script.onload = function () {
    var myFont1 = new FontFaceObserver("font-name-1");
    var Myfont2 = new FontFaceObserver("font-name-2", {
      weight: "bold"
    });
    // Загрузка из переменных
    Promise.all([
      myFont1.load(),
      Myfont2.load()
    ]).then(function () {
      html.classList.add("webfont-loaded");
      sessionStorage.fontsLoaded = true;
      console.log('Шрифты загруженны. Сессия установленна.');
    });
  };
  document.head.appendChild(script);
}
