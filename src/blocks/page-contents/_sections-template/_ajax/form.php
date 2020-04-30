<?php
  $name = trim(strip_tags($_POST["name"]));
  $email = trim(strip_tags($_POST["email"]));
  $country = trim(strip_tags($_POST["country"]));
  $subject = "Регистрация на сайте url_вашего_сайта";
  $msg = "Ваши данные формы регистрации:\n" ."Имя: $name\n" ."Ваш email: $email\n" ."Страна: $country";
  $headers = "Content-type: text/plain; charset=UTF-8" . "\r\n";
  $headers .= "From: Ваше_имя <ваш_email>" . "\r\n";
  $headers .= "Bcc: ваш_email". "\r\n";
  if(!empty($name) && !empty($email) && !empty($country) && filter_var($email, FILTER_VALIDATE_EMAIL)){
    mail($email, $subject, $msg, $headers);
    echo "Мое имя: $name, Мой e-mail: $email, Моя страна: $country";
    }