<?php 
session_start();
	$id = strip_tags( $_POST['officer_id'] );
	$password = hash("sha256",strip_tags( $_POST['password'] ));
	$date = date('Y-m-d');
	$time = date('H:i:s');

	require("connect.php");
	mysql_query("UPDATE officers SET password='$password' WHERE id='$id'");
	$query = mysql_query("SELECT * FROM officers WHERE id='$id'");
	while( $row = mysql_fetch_assoc($query) ){
		$officer_id = $row['id'];
		$officer_username = $row['username'];
		$officer_password = $row['password'];
		$officer_fullname = $row['fullname'];
		$officer_role = $row['role'];
		
	}

	mysql_close();

		$_SESSION['username'] = $officer_username;
		$_SESSION['password'] = $officer_password;
		$_SESSION['fullname'] = $officer_fullname;
		$_SESSION['role'] = $officer_role;
			
echo '<tr>
        <td>'.$officer_fullname.'</td>
        <td>'.$officer_username.'</td>
        <td>'.$officer_role.'</td>
        <td id="'.$officer_id.'" >
         <img id="'.$officer_id.'" class="delete-button" width="10px" src="../images/close.svg" alt="delete"/></td>
    <tr>';
?>