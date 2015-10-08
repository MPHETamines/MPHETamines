<?php 

session_start();
$connection = mysqli_connect('localhost', 'root', '','uwatchDB') or die ("Could not connect: " . mysqli_error());
//mysql_select_db('uwatchDB', $connection);
$error = "";
$query = 'select * from officers';
$data = mysqli_query($connection, $query);
if (mysqli_num_rows($data) == 0) {
    $error = "No officers in the database";
}else{

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
                     <li>
                        <a href="manager.php" class="active">Manager</a>
                    </li>
                    <li>
                        <a href="images.php" >Images</a>
                    </li>
                    <li>
                        <a href="videos.php">Videos</a>
                    </li>
                    <li>
                        <a href="audios.php">Audios</a>
                    </li>
                    <li class="name"> 
                      <a href="#">
                        <b>Hello: </b><?php if(isset($_SESSION['fullname'])) echo $_SESSION['fullname'];?>
                      </a> 
                   </li>
                   <li class="name logout"> 
                      <a href="logout.php">logout</a> 
                   </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Start form -->
    <div class="container">
        <div class="row">
        <h2>Registered users</h2>
        <hr/>
        <?php 
            echo "<table><tr class='theader'>";
            echo "<th>Name</th>";
            echo "<th>Username</th>";
            echo "<th>Password</th>";
            echo "<th>Role</th>";
             echo "<th>Edit</th>";
            echo "</tr>";
            while($row = mysqli_fetch_assoc($data)){
                echo "<tr class='hvalue'><th>".$row['fullname']."</th>";
                echo "<th>".$row['username']."</th>";
                echo "<th>".$row['password']."</th>";
                echo "<th>".$row['role']."</th>";
                echo "<th><a href='edit.php'>Edit user</a> | <a href='delete.php'>Delete user</a></th>";
                echo "</tr>";
            }
            echo "</table>";
        }?>
            <a href="register.php">Add user</a>
        </div>

    </div>
    <!-- end form -->

       <hr>

        <!-- Footer -->
        <footer class="container">
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
