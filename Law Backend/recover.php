<?php  
//CORS
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day

  header('Access-Control-Allow-Headers: X-ACCESS_TOKEN, Access-Control-Allow-Origin, Authorization, Origin, x-requested-with, Content-Type, Content-Range, Content-Disposition, Content-Description');
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
  header('Access-Control-Allow-Origin: *');
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

session_start();



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
else //success
{
  if ($queryResults && $val['email'] == $email)  {
    echo $email.'`'.$val['password'];
  } 
  else{
    echo "2"; //username and password does not match
  }
}


?>
