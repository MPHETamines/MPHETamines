<?php 
require('../includes/header.php') 

?>

        <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Mobile application users</h1>
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                Users
                            </div>
                                <!-- /.panel-heading -->
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="usersList table table-striped table-bordered table-hover">
                                        <thead style="background-color:#337AB7; color:#fff">
                                            <tr>
                                                <th>Fullname</th>
                                                <th>Email address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                <?php      
                                    require("../includes/connect.php");

                                    $query = mysql_query("SELECT * FROM users ORDER BY date ASC, time ASC");
                                    $numrows = mysql_num_rows($query);
                                    if($numrows>0){
                                        while( $row = mysql_fetch_assoc( $query ) ){
                                            $user_username = $row['email'];
                                            $user_password = $row['password'];
                                            $user_fullname = $row['fullname'];             
                                          echo '<tr>
                                                    <td>'.$user_fullname.'</td>
                                                    <td>'.$user_username.'</td>
                                                <tr>'; 
                                        }
                                    }
                                    ?>
                                        </tbody>
                                    </table>
                                </div>
                                <!-- /.table-responsive -->
                            </div>
                            <!-- /.panel-body -->
                        </div>
                        <!-- /.panel -->
                    </div>
                <!-- /.col-lg-12 -->
                    </div>
                    <!-- /.col-lg-12 -->
                </div>
                <!-- /.row -->
            </div>
            <!-- /.container-fluid -->
           
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
<?php require('../includes/footer.php') ?>

