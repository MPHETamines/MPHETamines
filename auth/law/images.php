<?php
    require_once('dbconnect.php');
    require_once('header.html');
?>


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

</div> <!-- close row -->
</div> <!-- close container-->


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


<!-- Search box -->
<!--
<div class="container">
  <div class="row">
    <form method="post" action="getuser()">
        
        <div class="col-md-6">
        <h2>Custom search field</h2>
            <div id="custom-search-input">
                <div class="input-group col-md-12">
                    <input type="text" class="form-control input-lg" name="search" id="search" placeholder="Search for PDE" />
                    <span class="input-group-btn">
                        <button class="btn btn-info btn-lg" type="submit">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </span>
                </div>
            </div>
        </div>

    </form>
  </div>
</div>



<div class="container">
    <form>
        <select name="category" onchange="getUser(this.value)">
          <option value="">Select a category:</option>
          <option value="1">drugs</option>
          <option value="2">murder</option>
          <option value="3">rape</option>
          <option value="4">robbery</option>
          <option value="5">violence</option>
          <option value="6">other</option>
        </select>
    </form>
    <br/>
    <div id="foundData"></div>
</div>

-->
<!-- searchbox ends -->

</html>
