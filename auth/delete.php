<?php  

session_start();
require_once('cors.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$email = $_SESSION['email'];
$password = $_SESSION['password'];
$fullname = $_SESSION['fullname'];

$connection = mysql_connect('localhost', 'root', '') or die ("Could not connect: " . mysql_error());
mysql_select_db('uwatchDB', $connection);

$query = 'select count(*) as cnt from users where email ="' . $email . '"';
$queryResults = mysql_query($query);
$res = mysql_fetch_assoc($queryResults);

if($res['cnt']==0){
	echo "2"; //not registered
}else{
	$q = "DELETE from users WHERE email='$email' AND password='$password'";
	if(mysql_query($q)){
		echo "1";
	}else{
		echo "0";
	}
}

?>
