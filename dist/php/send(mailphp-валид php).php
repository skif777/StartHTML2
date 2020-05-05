<?php
session_start ();
if(isset($_POST["send"])) { // Проверяем нажата ли кнопка send
	$to = "SKIF9476@yandex.ru"; // Кому отправить
  	$from = "Content-type: text/html; charset=utf-8 \r\n"; // От кого
  	$from = "cm96985_skif@cm96985.tmweb.ru";
  	$pagetitle = "Новая заявка с сайта"; // Тема письма
  	$message = "<h2>hello</> 1\r\nLine 2\r\nLine 3"; // Сообщение

  	$fio = $_POST['fio']; // input="name"
  	$fio = htmlspecialchars($fio);
	$fio = urldecode($fio);
	$fio = trim($fio);

	$email = $_POST['email']; // input="name"
	$email = htmlspecialchars($email);
	$email = urldecode($email);
	$email = trim($email);
  	
  	if($fio == "")	{
  		echo "Имя не заполнено!<br>";
	}
  	if($email == "" || !preg_match ("/@/", $email))	{
  		echo "E-mail введен некорректно!<br>";
	} else {
      	echo "Сообщение отправленно!";
      	mail($to, $pagetitle, $message, $from);
    }
}



