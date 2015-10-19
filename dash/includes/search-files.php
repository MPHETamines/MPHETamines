<?php
session_start(); 
if( !empty($_POST['search']) && !empty($_POST['location'])){
	$_SESSION['location'] = strip_tags( $_POST['location']);
	$_SESSION['search'] = strip_tags( $_POST['search'] );
}

else if(!empty($_POST['search']) && !empty($_POST['filetype'])){
	$_SESSION['search'] = strip_tags($_POST['search']);
	$_SESSION['filetype'] = strip_tags($_POST['filetype']);
}

?>