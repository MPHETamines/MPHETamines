<?php
    require_once('dbconnect.php');
    require_once('header.html');
?>

<!-- Page Content -->
<div class="container">

    <div class="row">

        <div class="col-lg-12">
            <h1 class="page-header">Audios</h1>
        </div>


<?php


$query = 'select * from files where filetype = "audio"';
$results = mysql_query($query) or die(mysql_error());
if(mysql_num_rows($results) < 1 ){
    echo "No files to display!";    
}
else{
    $i = 0;
    $name = "Mapza";
    echo "<table cellspacing='3'  cellpadding='4'><tr>";    
    while($row = mysql_fetch_assoc($results)){
        echo "<td>
            <a href=''>
                <object autoplay='false' data='../uploads/".$row['link']."'  width='100' height='100' ></object>
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

    <!-- jQuery -->
    <script src="js/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

</body>

</html>
