<?php
    include "libmail.php"; // подключаем файл

    // Input name 
    $fio = $_POST['fio']; 
    $fio = htmlspecialchars($fio);
    $fio = urldecode($fio);
    $fio = trim($fio);
    
    // Input name
    $email = $_POST['email']; 
    $email = htmlspecialchars($email);
    $email = urldecode($email);
    $email = trim($email);

    $m= new Mail; // начинаем 
    $m->From( "skif;skif@cm96985.tmweb.ru" ); // от кого отправляется почта 
    $m->To( "SKIF9476@yandex.ru" ); // кому адресованно
    $m->To( "kononov-genii@mail.ru" ); // кому адресованно2
    $m->Subject( "Тема сообщения" ); // тема сообщения
    $m->Body( "Имя: $fio \nТелефон: $email <br> <h2>hello world</h2>",  "html" );  // "html" для преобразование в html  
    // $m->Cc( "kononov-genii@mail.ru"); // копия письма отправится по этому адресу
    // $m->Bcc( "kononov-genii@mail.ru"); // скрытая копия отправится по этому адресу
    $m->Priority(3) ;    // приоритет письма
    // $mail->autoCheck( false ); // проверка на валидность
    // $mail->Organization( "Моя фирма" ); // название организации
    // $mail->ReplyTo( "kononov-genii@mail.ru" ); // email для ответа
    // $mail->Receipt(); // подтверждение о прочтении.
    // $m->Attach( "asd.gif","", "image/gif" ) ; // прикрепленный файл  
    // $m->smtp_on("ssl://SKIF9476@yandex.ru","SKIF9476","Пароль", 465) ; // если указана эта команда, отправка пойдет через SMTP 
    $m->Send(); // отправка
    
    // echo "Показывает исходный текст письма:<br><pre>", $m->Get(), "</pre>";
?>

