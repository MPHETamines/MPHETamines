<?php 
session_start();

$connection = mysqli_connect('localhost', 'root', '','uwatchDB') or die ("Could not connect: " . mysqli_error());
$error = "";
$success = "";
if(isset($_POST['submit'])){
    if( !empty($_POST['fullname']) && !empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['role'])){
        $role = mysqli_real_escape_string($connection, trim($_POST['role']));
        $fullname = mysqli_real_escape_string($connection, trim($_POST['fullname']));
        $username = mysqli_real_escape_string($connection, trim($_POST['username']));
        $password = hash("sha256",mysqli_real_escape_string($connection, trim($_POST['password'])));
        $date = date('Y-m-d');
        $time = date('H:i:s');
        $query = 'select * from officers where username ="' . $username . '"';

        $data = mysqli_query($connection, $query);

        if (mysqli_num_rows($data) == 0) {
            $query = 'INSERT INTO officers (fullname,username,password,role,date,time) values ("' . $fullname . '","' . $username . '","' . $password . '","' . $role . '","' . $date . '","' . $time . '")';
            mysqli_query($connection, $query);
            mysqli_close($connection);
            $success = "Account created succesfully. Please login";
               
            $_SESSION['role'] = $role;
            $_SESSION['username'] = $username;
         //   $_SESSSION['password'] = $password;
            $_SESSION['fullname'] = $fullname;

            header("Location:dashboard.php");
            exit();
        }else{
            $error = "User already exists";
            //header("Location: images.php");
        }
    }else{
        $error = "Please fill in all input fields";
    }
}

?>
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Register | uwatch</title>

    <!-- Bootstrap Core CSS -->
    <link href="../bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="../bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

   
</head>

<body>

    <div class="container">
        <div class="row">
            <div class="col-md-4 col-md-offset-4">
                <div class="login-panel panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Please register</h3>
                    </div>
                    <div class="panel-body">
                        <form role="form" method="post" action="<?php echo $_SERVER['PHP_SELF']?>">
                            <?php 
                                if(isset($error) && $error !== ""){
                                    echo "<div style='color:red'><p>".$error."</p></div>";
                                }else if($success != ''){
                                    echo "<div style='color:green'><p>".$success."</p></div>";
                                }
                                else{
                                    echo "";
                                }
                            ?>
                            <fieldset>
                                  <div class="form-group">
                                    <input class="form-control" id="fullname" placeholder="Fullname" name="fullname" type="text" >
                                </div>
                                <div class="form-group">
                                    <input class="form-control" id="username" placeholder="E-mail" name="username" type="email" autofocus>
                                </div>
                                <div class="form-group">
                                    <input class="form-control" id="password" placeholder="Password" name="password" type="password" >
                                </div>
                                <div class="form-group">
                                    <input class="form-control" id="role" placeholder="role" name="role" type="text">
                                </div>
                                <div class="checkbox">
                                    <label>
                                        <input name="remember" type="checkbox" value="Remember Me">Remember Me
                                    </label>
                                </div>
                                <!-- Change this to a button or input when using this as a form -->
                                <button class="btn btn-lg btn-primary btn-block" name="submit" type="submit">Register</button>   
                                <a href="index.php" class="btn btn-block">Already registered</a>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- jQuery -->
    <script src="../bower_components/jquery/dist/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="../bower_components/metisMenu/dist/metisMenu.min.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="../dist/js/sb-admin-2.js"></script>

</body>

</html>
