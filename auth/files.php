<?php  

session_start();
require_once("cors.php");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$email = strip_tags($request->email);

$connection = mysql_connect('localhost', 'root', '') or die ("Could not connect: " . mysql_error());
mysql_select_db('uwatchDB', $connection);

$query = 'SELECT *  from files WHERE user_fk ="' . $email . '"';
$queryResults = mysql_query($query);

if(mysql_num_rows($queryResults) < 0){
    echo "2"; //No files
}
else
{
    echo mysql_num_rows($queryResults); //files
}

?>
