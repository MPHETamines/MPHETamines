<?php


require_once('cors.php');
require_once("class.phpmailer.php");


$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$verify = 'The OTP is: <b>'.$request->code.'</b>\n\rPlease use this code to validate your email address.';

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
  $mail->Subject = 'uWatch verification code'; //subject
  $mail->MsgHTML($verify); //verification code
  $mail->Send();
  echo "Message Sent OK</p>\n";
} catch (phpmailerException $e) {
  echo $e->errorMessage(); //Pretty error messages from PHPMailer
} catch (Exception $e) {
  echo $e->getMessage(); //Boring error messages from anything else!
}

?>