<?php  

session_start();
require_once('cors.php');


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$password = $request->password;
$email = $request->email;
$hash = $request->hashPassword;

$connection = mysql_connect('localhost', 'root', '') or die ("Could not connect: " . mysql_error());
mysql_select_db('uwatchDB', $connection);

$qry = "UPDATE users SET password='$hash' WHERE email='$email'";
$Qres = mysql_query($qry);
$res = mysql_fetch_assoc($Qres);

if(!$Qres){
    echo "2";
}else{

    sendMail($email,$password,$hash); //ech0 "1" success or echo "0 " error

   //echo $password.$email.$passwordHash;
}


function sendMail($email, $pass, $hash){
  require_once('cors.php');
  require_once("class.phpmailer.php");
  $msg = $pass; 
  $mail = new PHPMailer(true); // the true param means it will throw exceptions on errors, which we need to catch
  $mail->IsSMTP(); // telling the class to use SMTP
  try {
    $mail->Host       = "mail.gmail.com"; // SMTP server
    $mail->SMTPDebug  = 2;                     // enables SMTP debug information (for testing)
    $mail->SMTPAuth   = true;                  // enable SMTP authentication
    $mail->SMTPSecure = "ssl";                 // sets the prefix to the servier
    $mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
    $mail->Port       = 465;                   // set the SMTP port for the GMAIL server
    $mail->Username   = "harry0developer@gmail.com";  // GMAIL username
    $mail->Password   = "Cychedelic1";            // GMAIL password
    $mail->AddAddress($email, 'User');//TO mail
    $mail->SetFrom('harry0developer@gmail.com', 'uWatch');//From mail
    $mail->AddReplyTo('cos330practical@gmail.com', 'uWatch');//CC mail
    $mail->Subject = 'New uWatch password'; //subject
    $mail->MsgHTML($msg); //verification code
    $mail->Send();
    echo "1";
    //echo "Message Sent OK</p>\n";
  } catch (phpmailerException $e) {
    echo "0";
    //echo $e->errorMessage(); //Pretty error messages from PHPMailer
  } catch (Exception $e) {
    echo "0";
    //echo $e->getMessage(); //Boring error messages from anything else!
  }

}
?>
