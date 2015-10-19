<?php 
if( !empty($_POST['fullname']) && !empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['role'])){
	$username = strip_tags( $_POST['username'] );
	$password = hash("sha256",strip_tags( $_POST['password'] ));
	$fullname = strip_tags( $_POST['fullname'] );
	$role = strip_tags( $_POST['role'] );
	$date = date('Y-m-d');
	$time = date('H:i:s');

	require("connect.php");

	$q = "SELECT * from officers WHERE username='$username'";
	$res = mysql_query($q);

	if(mysql_fetch_assoc($res)){
		die();
	}else{
		mysql_query("INSERT INTO officers VALUES ('', '$fullname', '$username','$password','$role','$date', '$time')");
		$query = mysql_query("SELECT * FROM officers WHERE username='$username' and date='$date' and time='$time'");
		while( $row = mysql_fetch_assoc($query) ){
			$officer_id = $row['id'];
			$officer_username = $row['username'];
			$officer_password = $row['password'];
			$officer_fullname = $row['fullname'];
			$officer_role = $row['role'];
		}

		mysql_close();
		
		echo '<tr>
		    <td>'.$officer_fullname.'</td>
		    <td>'.$officer_username.'</td>
		    <td>'.$officer_role.'</td>
		    <td class="delete" id="'.$officer_id.'" >
		    <img id="'.$officer_id.'" class="delete-button" width="10px" src="../images/close.svg" alt="delete"/></td>
		<tr>';
	}
}
?>