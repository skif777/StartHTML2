<?php
	// Кому отправить
	$to = "SKIF9476@yandex.ru, kononov-genii@mail.ru";

    // Тема письма
    $pagetitle = "Новая заявка с сайта";

    // Сообщение
    $message = "<h2>Hello world!</h2>";

	// Для отправки HTML-письма должен быть установлен заголовок Content-type
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	// Дополнительные заголовки
	$headers = 'To: Mary <cm96985_skif@cm96985.tmweb.ru>, Kelly <cm96985_skif@cm96985.tmweb.ru>';
	$headers = "From: cm96985_skif@cm96985.tmweb.ru \r\n";
	$headers = 'Cc: cm96985_skif@cm96985.tmweb.ru';
	$headers = 'Bcc: cm96985_skif@cm96985.tmweb.ru';
	
	// Input
  	$fio = $_POST['fio']; // input="name"
  	$fio = htmlspecialchars($fio);
	$fio = urldecode($fio);
	$fio = trim($fio);
	
	// Input
	$email = $_POST['email']; // input="name"
	$email = htmlspecialchars($email);
	$email = urldecode($email);
	$email = trim($email);
  	
    mail($to, $pagetitle, $message, implode("\r\n", $headers));



