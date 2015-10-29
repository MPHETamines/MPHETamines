<?php  
session_start();

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


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);


$filetype = $request->filetype;
$link = $request->filename;
$location = $request->location;
$hash =$request->hash;// hash('256', 'uploads/'.$link);
$category = $request->category;

if(isset($_SESSION['email'])){
    $user_id = $_SESSION['email'];
    $date = date('Y-m-d');
    $time = date('H:i:s');

    $connection = mysql_connect('localhost', 'root', '') or die ("Could not connect: " . mysql_error());;
    mysql_select_db('uwatchDB', $connection);

    $query = 'select count(*) as cnt from users where email ="' . $user_id. '"';

    $queryResults = mysql_query($query);
    $res = mysql_fetch_assoc($queryResults);

    if($res['cnt'] != 0){
        //$qry = "insert into files (date, timestamp,filetype,hash,link,tags,user_fk) values ('$filetype','$hash','$link','$tags','$user_fk')";
        $qry = "INSERT INTO files (file_id,filetype,hash,link,location,category,date,time,user_fk) values ('', '$filetype', '$hash','$link', '$location', '$category','$date','$time','$user_id')";
        $qres = mysql_query($qry);
        if ($qres) {
            echo "1";
        } else {
            echo "2";
        }
    }
    else
    {
        echo "999";
    }

}
else{
    echo "404";
}

?>
