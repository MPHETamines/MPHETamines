<?php 
    require_once('../includes/header.php');
    require_once('../includes/connect.php');

?>
        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Dashboard</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>

            <!-- /.row -->
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-map-marker fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge"></div>
                                    <div>Search by location</div>
                                </div>
                            </div>
                        </div>
                        
                            <div class="panel-footer">
                                <!-- search -->
                                <div class="input-group sidebar-search custom-search-form">
                                    <input type="text" class="search-value form-control" placeholder="Search by location">
                                    <span class="input-group-btn">
                                        <a class="btn btn-default search-files-location" type="button" href="search-results.php">
                                            <i class="fa fa-search"></i>
                                        </a>
                                    </span>
                                </div>
                                <!-- /input-group -->
                                <div class="clearfix"></div>
                            </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa  fa-gavel fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge"> </div>
                                    <div>Search by crime type</div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group well">
                            <form class="insertOfficer" autocomplete="off">
                                <select class="form-control" name="role" >
                                    <option>Select crime type</option>
                                    <option>Drugs</option>
                                    <option>Murder</option>
                                    <option>Rape</option>
                                    <option>Robbery</option>
                                    <option>Violence</option>
                                    <option>Other</option>
                                </select>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-calendar fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge"></div>
                                    <div>Date</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">Sort by</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-file fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="huge"> </div>
                                    <div>Search by file type</div>
                                </div>
                            </div>
                        </div>
                       <div class="form-group well">
                            <form class="filetype" autocomplete="off">
                                <select class="form-control search-files-type" name="role" >
                                    <option>Select File type</option>
                                    <option>Image</option>
                                    <option>Video</option>
                                    <option>Audio</option>
                                </select>
                                <a class="button form-control select-file" href="search-results.php">Go</a>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.row -->  
            <!-- row 2 -->
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-red">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-copy fa-5x"></i>
                                </div>
                                 <?php
                                    $query = 'select * from files';
                                    $results = mysql_query($query) or die(mysql_error());
                                 ?>
                                <div class="col-xs-9 text-right">
                                    <div class="huge"><?php echo mysql_num_rows($results) ?></div>
                                    <div>Total files</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-yellow">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-image fa-5x"></i>
                                </div>
                                 <?php
                                    $query = 'select * from files WHERE filetype="image"';
                                    $results = mysql_query($query) or die(mysql_error());
                                 ?>
                                <div class="col-xs-9 text-right">
                                    <div class="huge"> <?php echo mysql_num_rows($results) ?> </div>
                                    <div>Images</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-green">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-film fa-5x"></i>
                                </div>
                                <?php
                                    $query = 'select * from files WHERE filetype="video"';
                                    $results = mysql_query($query) or die(mysql_error());
                                 ?>
                                <div class="col-xs-9 text-right">
                                    <div class="huge"> <?php echo mysql_num_rows($results) ?> </div>
                                    <div>Videos</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-bullhorn fa-5x"></i>
                                </div>
                                <?php
                                    $query = "select * from files WHERE filetype='audio'";
                                    $results = mysql_query($query) or die(mysql_error());
                                 ?>
                                <div class="col-xs-9 text-right">
                                    <div class="huge"> <?php echo mysql_num_rows($results) ?> </div>
                                    <div>Audios</div>
                                </div>
                            </div>
                        </div>
                        <a href="#">
                            <div class="panel-footer">
                                <span class="pull-left">View Details</span>
                                <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                                <div class="clearfix"></div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            
        </div>

    <!-- /#wrapper -->
<?php require('../includes/footer.php') ?>


<script type="text/javascript">
    $(document).ready(function(){
        $('input').val('');
    });
</script>