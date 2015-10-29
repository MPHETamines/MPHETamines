<?php  
	$uploadfile = "";
	$uploadfilename = "";
	if(!isset($_FILES['file']) || ($_FILES['file']['tmp_name'] == ''))
        echo "Please choose a file.";
    else {
        $uploadfile =  $_FILES['file']['name'];
        $uploadfilename = $_FILES['file']['tmp_name'];  
    }
	$location = 'uploads/';
	if(move_uploaded_file($uploadfilename, $location.$uploadfile)){
		echo '1'; //success
		//echo "PATH: ".$location.$uploadfile;
	} else {
		echo '0'; //failure
	}

	
?>
