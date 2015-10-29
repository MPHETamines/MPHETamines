<?php  

session_start();
require_once("cors.php");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$email = strip_tags($request->email);
$password = strip_tags($request->password);
$username = strip_tags($request->username);

$date = date('Y-m-d');
$time = date('H:i:s');  

$connection = mysql_connect('localhost', 'root', '') or die ("Could not connect: " . mysql_error());
mysql_select_db('uwatchDB', $connection);

$query = 'select count(*) as cnt from users where email ="' . $email . '"';
$queryResults = mysql_query($query);
$res = mysql_fetch_assoc($queryResults);

if($res['cnt']==0){
    $_SESSION['fullname'] = $username;
    $_SESSION['email'] = $email;
    $_SESSION['password'] = $password;
    $qry = 'INSERT INTO users values ("","' . $username . '","' . $email . '","' . $password . '","' . $date . '","' . $time . '")';
    $queryResults = mysql_query($qry);
    if ($queryResults) {
        echo "1";  //sucess
    } else {
        echo "2"; //failed to insert
    }
}
else
{
    echo "0"; //user already exists
}

?>
