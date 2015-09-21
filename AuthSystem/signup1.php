<?php
if(isset($_POST['signup']))
{
$fullname=mysql_real_escape_string(htmlspecialchars(trim($_POST['fullname'])));
$email=mysql_real_escape_string(htmlspecialchars(trim($_POST['email'])));
$password=mysql_real_escape_string(htmlspecialchars(trim($_POST['password'])));
$login=mysql_num_rows(mysql_query("select * from `phonegap_login` where `email`='$email'"));
if($login!=0)
{
echo "exist";
}
else
{
$date=date("d-m-y h:i:s");
$q=mysql_query("insert into `phonegap_login` (`reg_date`,`fullname`,`email`,`password`) values ('$date','$fullname','$email','$password')");
if($q)
{
echo "success";
}
else
{
echo "failed";
}
}
echo mysql_error();
}

?>