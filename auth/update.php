<?php  

session_start();
require_once('cors.php');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$hash = $request->password;
$email = $_SESSION['email'];

$connection = mysql_connect('localhost', 'root', '') or die ("Could not connect: " . mysql_error());
mysql_select_db('uwatchDB', $connection);

$qry = 'UPDATE users SET  password="' . $hash . '" WHERE email="' . $email . '"';
$Qres = mysql_query($qry);

if(!$Qres){
    echo "2";
}
$_SESSION['password'] = $hash;
echo "1";


?>
