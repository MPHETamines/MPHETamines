<?php 
require('../includes/header.php')

 ?>
        <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Law Officials</h1>
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                Law Officials
                            </div>
                                <!-- /.panel-heading -->
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="officerList table table-bordered table-hover ">
                                        <thead style="background-color:#337AB7; color:#fff">
                                            <tr>
                                                <th>Fullname</th>
                                                <th>Username</th>
                                                <th>Role</th>
                                                <th>Date created</th>
                                                <?php if( isset($_SESSION['role']) && $_SESSION['role']=='admin'){
                                                    echo '<th class="edit">Edit password</th><th class="delete">Delete</th>';
                                                }?>
                                            </tr>
                                        </thead>
                                        <tbody>
                                <?php      
                                    require("../includes/connect.php");

                                    $query = mysql_query("SELECT * FROM officers ORDER BY date ASC, time ASC");
                                    $numrows = mysql_num_rows($query);
                                    if($numrows>0){
                                        while( $row = mysql_fetch_assoc( $query ) ){
                                            $officer_id = $row['id'];
                                            $officer_username = $row['username'];
                                            //$officer_password = $row['password'];
                                            $officer_fullname = $row['fullname'];
                                            $officer_role = $row['role'];
                                            $date = $row['date'];      

                                            if( isset($_SESSION['role']) && $_SESSION['role']=='admin'){
                                              echo '<tr>
                                                        <td>'.$officer_fullname.'</td>
                                                        <td>'.$officer_username.'</td>
                                                        <td>'.$officer_role.'</td>
                                                        <td>'.$date.'</td>
                                                        <td class="edit" id="'.$officer_id.'" > 
                                                        <a id="'.$officer_id.'" class="edit-button" width="10px" href="" >Edit</a></td> 
                                                        <td class="delete" id="'.$officer_id.'" > 
                                                        <img id="'.$officer_id.'" class="delete-button" width="10px" src="../images/close.svg" alt="delete"/></td> 
                                                        
                                                    <tr>'; 

                                            }else{
                                                echo '<tr>
                                                        <td>'.$officer_fullname.'</td>
                                                        <td>'.$officer_username.'</td>
                                                        <td>'.$officer_role.'</td>
                                                        <td>'.$date.'</td>
                                                    <tr>'; 

                                            }  
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


<script type="text/javascript">
    $(document).ready(function(){
        $('input').val('');
    });
</script>