<?php 
require_once('../includes/header.php');
require_once("../includes/connect.php");
 ?>
        <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Search results</h1>
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                Search results
                            </div>
                                <!-- /.panel-heading -->

               <!--============== LOCATION ===================     -->        
                            <div class="panel-body">
                            <?php 
                                if( isset($_SESSION['location']) && isset($_SESSION['search']) ){
                                    $query = mysql_query("SELECT * FROM files WHERE ".$_SESSION['location']." LIKE '%".$_SESSION['search']."%'");
                                    $numrows = mysql_num_rows($query);
                                    if($numrows>0){


                            ?>
                                <div class="table-responsive">
                                    <table class="fileList table table-bordered table-hover ">
                                        <thead>
                                            <tr>
                                                <th>File</th>
                                                <th>Uploaded by</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                <?php      
                                        while( $row = mysql_fetch_assoc( $query ) ){
                                              echo '<tr>
                                                        <td>'.$row['link'].'</td>
                                                        <td>'.$row['user_fk'].'</td>
                                                    <tr>'; 
                                        }
                                    }
                                }

                            ?>
            <!-- =========== END LOCATION ========== -->

               <!--============== FILETYPE ===================     -->        
                            <?php 
                                if( isset($_SESSION['filetype']) && isset($_SESSION['search']) ){
                                    $query = mysql_query("SELECT * FROM files WHERE ".$_SESSION['filetype']." LIKE '%".$_SESSION['search']."%'");
                                    $numrows = mysql_num_rows($query);
                                    if($numrows>0){


                            ?>
                                <div class="table-responsive">
                                    <table class="fileList table table-bordered table-hover ">
                                        <thead>
                                            <tr>
                                                <th>File</th>
                                                <th>Uploaded by</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                <?php      
                                        while( $row = mysql_fetch_assoc( $query ) ){
                                              echo '<tr>
                                                        <td>'.$row['link'].'</td>
                                                        <td>'.$row['user_fk'].'</td>
                                                    <tr>'; 
                                        }
                                     }
                                }
                                else{
                                    echo "No results found";
                                    $_SESSION['filetype'] = array();
                                    $_SESSION['location'] = array();
                                }
                            ?>
            <!-- =========== END FILETYPE ========== -->


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


<script type="text/javascript">
    $(document).ready(function(){
        $('input').val('');
    });
</script>