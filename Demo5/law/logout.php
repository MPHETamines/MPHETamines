<?php
    
    session_start();
    if(isset($_SESSION['username']) && isset($_SESSION['password']) && isset($_SESSION['fullname'])){
  		session_destroy();
        header('Location: index.php');
    }

?>