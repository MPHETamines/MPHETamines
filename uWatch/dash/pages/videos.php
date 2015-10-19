<?php 
require('../includes/officer-header.php');
require_once('../includes/connect.php');


 ?>

        <!-- Page Content -->
        <div id="page-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1 class="page-header">Video files</h1>
                        
                        <?php


                        $query = 'select * from files where filetype = "video"';
                        $results = mysql_query($query) or die(mysql_error());
                        if(mysql_num_rows($results) < 1 ){
                            echo "No files to display!";    
                        }
                        else{
                            $i = 0;
                            echo "<table class='imageTable' cellspacing='3'  cellpadding='4'><tr class='imageTr'>";    
                            while($row = mysql_fetch_assoc($results)){
                                echo "<td class='imageTd'>
                                    <a href='../../auth/uploads/".$row['link']."' data-lightbox='images'>
                                         <object autoplay='false' data='../../auth/uploads/".$row['link']."'  width='200' height='140'></object>
                                    </a>
                                </td>";

                                if($i%2==0) 
                                echo "</tr><tr class='imageTr'>";

                            }
                            $i++; //increment the counter by 1
                            if(!$i%2==0) { //if the last row only has one cell
                               echo "<td class='imageTd'>&nbsp</td>"; //then create an empty cell and finish the row
                            }

                            echo "</tr></table>";
                        }

                        ?>

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

