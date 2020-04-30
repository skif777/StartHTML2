<?php
  $name = trim(strip_tags($_POST["name"]));
  if($name != '') {
    echo "1";
  } else {
    echo '2';
  }