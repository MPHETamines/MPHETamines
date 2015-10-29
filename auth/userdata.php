<?php  

session_start();
require_once('cors.php');

echo $_SESSION['fullname']."`".$_SESSION['email'];

?>