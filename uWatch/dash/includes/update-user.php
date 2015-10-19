<?php 
	$id = strip_tags( $_POST['user_id'] );
	$password = strip_tags( $_POST['password'] );
	$date = date('Y-m-d');
	$time = date('H:i:s');

	require("connect.php");
	mysql_query("UPDATE users SET password='$password' WHERE id='$id'");
	$query = mysql_query("SELECT * FROM users WHERE id='$id'");
	while( $row = mysql_fetch_assoc($query) ){
		$user_id = $row['id'];
		$user_username = $row['username'];
		$user_password = $row['password'];
		$user_fullname = $row['fullname'];
	}

	mysql_close();

echo '<tr>
        <td>'.$user_fullname.'</td>
        <td>'.$user_username.'</td>
        <td>'.$user_password.'</td>
        <td id="'.$user_id.'" >
         <img id="'.$user_id.'" class="delete-button" width="10px" src="../images/close.svg" alt="delete"/></td>
    <tr>';
?>