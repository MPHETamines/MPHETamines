<?php
session_start();
if(isset($_SESSION['username']) && isset($_SESSION['password']) && isset($_SESSION['fullname'])){
    $connection = mysql_connect('localhost', 'root', '') or die ("Could not connect: " . mysql_error());;
    mysql_select_db('uwatchDB', $connection);
}
else{

    header('Location: index.php');
}


function logout(){
    session_destroy();
    header("Location: index.php");
}
?>