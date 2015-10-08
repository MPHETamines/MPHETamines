<?php 

session_start();
$connection = mysqli_connect('localhost', 'root', '','uwatchDB') or die ("Could not connect: " . mysqli_error());
//mysql_select_db('uwatchDB', $connection);
$error = "";
if(isset($_POST['submit'])){
    if( !empty($_POST['fullname']) && !empty($_POST['username']) && !empty($_POST['password']) && !empty($_POST['role'])){
        $role = mysqli_real_escape_string($connection, trim($_POST['role']));
        $fullname = mysqli_real_escape_string($connection, trim($_POST['fullname']));
        $username = mysqli_real_escape_string($connection, trim($_POST['username']));
        $password = mysqli_real_escape_string($connection, trim($_POST['password']));

        $query = 'select * from officers where username ="' . $username . '"';

        $data = mysqli_query($connection, $query);

        if (mysqli_num_rows($data) == 0) {
            $query = 'INSERT INTO officers (fullname,username,password,role) values ("' . $fullname . '","' . $username . '","' . $password . '","' . $role . '")';
            mysqli_query($connection, $query);
            mysqli_close($connection);
            $_SESSION['msg'] = "Account created succesfully. Please login";
            header("Location:index.php");
            exit();
        }else{
            $error = "User already exists";
            //header("Location: images.php");
        }
    }else{
        $error = "Please fill-in all inputs field";
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

    <title>Law enforcement back-end</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/thumbnail-gallery.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    
</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Law enforcement</a>
            </div>
            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                   
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Start form -->
    <div class="wrapper">
        <form class="form-signin" method="post" action="<?php echo $_SERVER['PHP_SELF']?>">        
            <?php 
                if(isset($error) && $error !== ""){
                    echo "<div class='error'><p>".$error."</p></div>";
                }else{
                    echo "";
                    $error = "";
                }
            ?>
            <h2 class="form-signin-heading">Add new user</h2>
            <input type="text" class="form-control" name="fullname" placeholder="Full name: John Doe" required="" autofocus="" />
            <input type="text" class="form-control" name="username" placeholder="Username" required=""/>
            <input type="password" class="form-control" name="password" placeholder="Password" required=""/> 
            <input type="password" class="form-control" name="cpassword" placeholder="Confirm password" required=""/>  
           
           <div class="form-group">
                <label >Assign a role:</label>
                <div class="radio">
                    <label>
                        <input type="radio" name="role" value="Chief-judge">Chief Judge
                    </label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="role" value="Judge">Judge
                    </label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="role" value="Police">Police
                    </label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="role" value="Magistrate">Magistrate
                    </label>
                </div>
           </div>

            <input class="btn btn-lg btn-primary btn-block" name="submit" value="Register Officer" type="submit">   
            <br/>
            <a href="index.php" class="add">Already have account</a>
        </form>
    </div>
    <!-- end form -->

       <hr>

        <!-- Footer -->
        <footer>
            <div class="row">
                <div class="col-lg-12">
                    <p>Copyright &copy; Law enforcement Website 2015</p>
                </div>
            </div>
        </footer>

    </div>
    <!-- /.container -->

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

</body>

</html>
