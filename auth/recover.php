<?php  
require_once('cors.php');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$email = $request->email;

$connection = mysql_connect('localhost', 'root', '') or die ("Could not connect: " . mysql_error());;
mysql_select_db('uwatchDB', $connection);

$query = 'select count(*) as cnt from users where email ="' . $email . '"';
$queryResults = mysql_query($query);
$res = mysql_fetch_assoc($queryResults);


$qry = 'select * from users where email ="' . $email . '"';
$queryResults = mysql_query($qry);
//$row = mysql_fetch_array($queryResults);

$result = mysql_query("SELECT email,fullname,password FROM users WHERE email = '$email'");
$val = mysql_fetch_array($result);
if($res['cnt']==0){  //error
    echo "0"; //user not registered
}
else{
  if ($queryResults && $val['email'] == $email)  {
    echo "1";
  } 
  else{
    echo "2"; //username and password does not match
  }
}

?>
