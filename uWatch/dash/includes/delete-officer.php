<?php 
	$officer_id = strip_tags( $_POST['officer_id'] );

	require("connect.php");

	mysql_query("DELETE FROM officers WHERE id='$officer_id'");
?>