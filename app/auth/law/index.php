

<?php 

session_start();
$connection = mysqli_connect('localhost', 'root', '','uwatchDB') or die ("Could not connect: " . mysqli_error());
//mysql_select_db('uwatchDB', $connection);
$error = "";
if(isset($_POST['submit'])){
    if( !empty($_POST['username']) && !empty($_POST['password']) ){
        $username = mysqli_real_escape_string($connection, trim($_POST['username']));
        $password = mysqli_real_escape_string($connection, trim($_POST['password']));

        $query = 'select * from officers where username ="' . $username . '" and password ="' . $password . '"';

        $data = mysqli_query($connection, $query);
        if (mysqli_num_rows($data) == 0) {
            $error = "Invalid username or password";
        }else{
            $row = mysqli_fetch_assoc($data);
            $_SESSION['username'] = $username;
            $_SESSION['password'] = $password;
            $_SESSION['fullname'] = $row['fullname'];
            $_SESSION['role'] = $row['role'];

            if($row['role'] == "Chief-judge"){
                header("Location: manager.php");
            }else{
                header("Location: images.php");
            }
        }
    }
}


$query = 'select * from files where filetype = "image"';
$queryResults = mysql_query($query);
$res = mysql_fetch_assoc($queryResults);
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
                    <li>
                        <a href="#">Logout</a>
                    </li>
                    
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Page Content -->
    <div class="container">

        <div class="row">

            <div class="col-lg-12">
                <h1 class="page-header">Images from the database</h1>
            </div>

<?php
while($row = mysql_fetch_array($queryResults))
{
    
?>
            <div id="fly" class="col-lg-3 float-left col-md-4 col-xs-6 thumb">
                <a class="thumbnail" href="#">
                    <img class="img-responsive" src=<?php echo "../".$row["link"]; }?> alt="">
                </a>
            </div>

        </div>

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
