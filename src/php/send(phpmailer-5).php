<?php
require 'get_oauth_token.php';


// Настройки
$mail = new PHPMailer;
$mail->isSMTP();
$mail->SMTPDebug = 2;
$mail->Host = 'smtp.yandex.ru'; 
$mail->SMTPAuth = true; 
$mail->Username = 'SKIF9476'; // Ваш логин в Яндексе. Именно логин, без @yandex.ru
$mail->Password = 'Пароль'; // Ваш пароль
$mail->SMTPSecure = 'ssl'; 
$mail->Port = 465;
$mail->CharSet = 'UTF-8'; 
$mail->setFrom('SKIF9476@yandex.ru'); // Ваш Email
$mail->addAddress('SKIF9476@yandex.ru'); // Email получателя
$mail->addAddress('kononov-genii@mail.ru'); // Еще один email, если нужно.

// Письмо
$mail->isHTML(true); 
$mail->Subject = "Заголовок"; // Заголовок письма
$mail->Body = "HEllo world!"; // Текст письма

// Результат
$mail->send();
?>