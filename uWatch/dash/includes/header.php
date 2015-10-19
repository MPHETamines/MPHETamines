<?php
session_start();

if(!isset($_SESSION['fullname']) || !isset($_SESSION['role']) || !isset($_SESSION['username'])){
    header("Location:index.php");
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

    <title>uWatch dashboard</title>
    <!-- style-->
    <link href="../css/lightbox.css" rel="stylesheet" />
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <!-- Bootstrap Core CSS -->
    <link href="../bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="../bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Timeline CSS -->
    <link href="../dist/css/timeline.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <link href="../bower_components/morrisjs/morris.css" rel="stylesheet">

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

    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">uwatch dashboard</a>
            </div>
            <!-- /.navbar-header -->

            <!-- Start Profile -->
            <ul class="nav navbar-top-links navbar-right">
                 <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                       Hi <?php if(isset($_SESSION['fullname'])) echo $_SESSION['fullname'] ?> <i class="fa fa-user fa-fw"></i>
                    </a>
                </li>
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="logout.php">
                       Logout <i class="fa fa-power-off fa-fw"></i>
                    </a>
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->
            <!-- end profile -->
            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <!-- search -->
                        <li class="sidebar-search">
                            <div class="input-group custom-search-form">
                                <input type="text" class="form-control" placeholder="Search...">
                                <span class="input-group-btn">
                                    <button class="btn btn-default" type="button">
                                        <i class="fa fa-search"></i>
                                    </button>
                                </span>
                            </div>
                            <!-- /input-group -->
                        </li>

                        <li><!--Dashboard -->
                            <a href="dashboard.php"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
                        </li>
                        <!--
                        <li> // chats 
                            <a href="#"><i class="fa fa-bar-chart-o fa-fw"></i> Charts<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="flot.html">Flot Charts</a>
                                </li>
                                <li>
                                    <a href="morris.html">Morris.js Charts</a>
                                </li>
                            </ul>
                             /.nav-second-level 
                        </li>-->

                        <li><!-- files -->
                            <a href="#"><i class="fa fa-folder fa-fw"></i> Files<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="audios.php"><i class="fa fa-file-sound-o fa-fw"></i> Audio files</a>
                                </li>
                                <li>
                                    <a href="images.php"><i class="fa fa-file-photo-o fa-fw"></i> Image files</a>
                                </li>
                                <li>
                                    <a href="videos.php"><i class="fa fa-file-video-o fa-fw"></i> Video files</a>
                                </li>
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>

                        <li><!-- users -->
                            <a href="users.php"><i class="fa fa-users fa-fw"></i> Users</a>
                        </li>

                        <li><!-- officers -->
                            <a href="officers.php"><i class="fa fa-user fa-fw"></i> Officers</a>
                        </li>
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

