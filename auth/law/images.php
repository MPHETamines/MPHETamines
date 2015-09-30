<?php
$connection = mysql_connect('localhost', 'root', '') or die ("Could not connect: " . mysql_error());;
mysql_select_db('uwatchDB', $connection);

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

    <link href="css/lightbox.css" rel="stylesheet" />

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
                        <a href="images.php" class="active">Images</a>
                    </li>
                    <li>
                        <a href="videos.php">Videos</a>
                    </li>
                    <li>
                        <a href="audios.php">Audios</a>
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
                <h1 class="page-header">Images</h1>
            </div>


<?php


$query = 'select * from files where filetype = "image"';
$results = mysql_query($query) or die(mysql_error());
if(mysql_num_rows($results) < 1 ){
    echo "No files to display!";    
}
else{
    $i = 0;
    echo "<table cellspacing='3'  cellpadding='4'><tr>";    
    while($row = mysql_fetch_assoc($results)){
        echo "<td>
            <a href='../uploads/".$row['link']."' data-lightbox='images'>
                <img src='../uploads/".$row['link']."'  width='100' height='100' alt='pde image' />
            </a>
        </td>";

        if($i%2==0) 
        echo "</tr><tr>";

    }
    $i++; //increment the counter by 1
    if(!$i%2==0) { //if the last row only has one cell
       echo "<td>&nbsp</td>"; //then create an empty cell and finish the row
    }

    echo "</tr></table>";
}

?>

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

    <!-- jQuery -
    <script src="js/jquery.js"></script> -->
    <script src="js/jquery-1.11.0.min.js"></script>
    <!-- Lightbox-->
    <script src="js/lightbox.min.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>


</body>

</html>
