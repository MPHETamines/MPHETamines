<?php  

session_start();
require_once('cors.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$password = strip_tags($request->password);
$email = strip_tags($request->email);

$connection = mysql_connect('localhost', 'root', '') or die ("Could not connect: " . mysql_error());
mysql_select_db('uwatchDB', $connection);

$query = 'select count(*) as cnt from users where email ="' . $email . '"';
$queryResults = mysql_query($query);
$res = mysql_fetch_assoc($queryResults);

$qry = 'select fullname,email,password from users where email ="' . $email . '"';
$results = mysql_query($qry);
$row = mysql_fetch_assoc($results);

if($res['cnt']==0){
	echo "2"; //not registered
}
else{
    if ($row && $row['email'] == $email && $row['password'] == $password){
	    $_SESSION['fullname'] = $row['fullname'];
	    $_SESSION['email'] = $row['email'];
	    $_SESSION['password'] = $row['password'];
		echo "0";  //sucess
    }
     else {
        echo "1"; //failed to select
    }
}
?>
