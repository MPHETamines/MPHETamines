
<?php
$Host= 'localhost';
$User= 'root';
$Password= '';
$Dbname= 'uwatchdata';

$Conection_string="host=$Host dbname=$Dbname user=$User password=$Password";

/* Connect with database asking for a new connection*/
$Connect=mysqli_connect($Host,$User,$Password,$Dbname);

/* Error checking the connection string */
if (!$Connect) {
 echo "Database Connection Failure";
 exit;
}

$q="";
if($_POST['uname']=='' && $_POST['tag']=='' && $_POST['type']=='')
{
	$q="SELECT link,fileType,username,tags from files;";

}
	
else if($_POST['uname']!='' && $_POST['tag']=='' && $_POST['type']=='')
{
	$q="SELECT link,fileType,username,tags from files where username='".$_POST['uname']."';";

}

else if($_POST['uname']=='' && $_POST['tag']!='' && $_POST['type']=='')
{
	$q="SELECT link,fileType,username,tags from files where tags like '%".$_POST['tag']."%';";

}
	
else if($_POST['uname']=='' && $_POST['tag']=='' && $_POST['type']!='')
{
	$q="SELECT link,fileType,username,tags from files where fileType='".$_POST['type']."';";

}

else if($_POST['uname']!='' && $_POST['tag']!='' && $_POST['type']=='')
{
	$q="SELECT link,fileType,username,tags from files where username='".$_POST['uname']."' AND tags like '%".$_POST['tag']."%';";

}

else if($_POST['uname']!='' && $_POST['tag']=='' && $_POST['type']!='') 		
{
	$q="SELECT link,fileType,username,tags from files where username='".$_POST['uname']."' AND fileType= '".$_POST['type']."';";
	
}		

else if($_POST['uname']=='' && $_POST['tag']!='' && $_POST['type']!='') 		
{
	$q="SELECT link,fileType,username,tags from files where tags like '%".$_POST['tag']."%' AND fileType= '".$_POST['type']."';";
	
}		

else $q="SELECT link,fileType,username,tags from files where tags like '%".$_POST['tag']."%' AND fileType= '".$_POST['type']."' AND username='".$_POST['uname']."';";

	
/*$querybyusername="SELECT link,fileType,username,tags from files where username='".$_POST['uname']."';";
$querybytag="SELECT link,fileType,username,tags from files where tags like '%".$_POST['tag']."%';";
$querybytype="SELECT link,fileType,username,tags from files where fileType='".$_POST['type']."';";
*/	
	
	
//$result=mysqli_query($Connect,$querybyusername);
//$result2=mysqli_query($Connect,$querybytag);
//$result3=mysqli_query($Connect,$querybytype);
$finalresult=mysqli_query($Connect,$q);

//$row=mysqli_fetch_assoc($result);
//$row2=mysqli_fetch_assoc($result2);
//$row3=mysqli_fetch_assoc($result3);
$finalrow=mysqli_fetch_assoc($finalresult);

//echo "1". $querybyusername."<br>";
//echo "2". $querybytag."<br>";
//echo "3". $querybytype."<br>";
//echo "4". $q."<br>";

//<a href="url">link text</a>

$s="";
$i=0;
$a=array();
if(isset($finalrow)){
while($finalrow != null)
{
echo "<a href=\"". $finalrow['link'] ."\">  "." ".$finalrow['link']. "</a>"; 
$s.="<a href=\"". $finalrow['link'] ."\">  "." ".$finalrow['link']. "</a>"; ;
echo $finalrow['fileType']." ";
$s.=$finalrow['fileType']." ";
echo $finalrow['username']." ";
$s.=$finalrow['username']." ";
echo $finalrow['tags']." ";
$s.=$finalrow['tags']." ";
echo "<br>";
$s.="<br>";
echo "AS ".$s;
$finalrow=mysqli_fetch_assoc($finalresult);
$a[$i]=$s;
$i++;
$s="";
}

}

for($x=0;$x<count($a);$x++)
{
	for($y=0;$y<count($a);$y++)
	{
		if(strpos($a[$x],"Video")!=null && strpos($a[$y],"Audio")!=null || strpos($a[$x],"Image")!=null && strpos($a[$y],"Audio")!=null) // audio first
		{
			$temp=$a[$x];
			$a[$x]=$a[$y];
			$a[$y]=$temp;
			
		}		
		else if(strpos($a[$x],"Image")!=null && strpos($a[$y],"Video")!=null) 	//video next
		{
			$temp=$a[$x];
			$a[$x]=$a[$y];
			$a[$y]=$temp;
			
		}		
		 	
			
	}
	
}






echo "<h2 style=\"text-align:center\">Image<h2>";

for($r=0;$r<count($a);$r++)
	echo $a[$r];


echo "<h2 style=\"text-align:center\">Video<h2>";
echo "<h2 style=\"text-align:center\">Audio<h2>";

/*
if(isset($row)){
while($row != null)
{
echo "a1 " ; echo $row['link']." "; 
echo $row['fileType']." ";
echo $row['username']." ";
echo $row['tags']." ";
echo "<br>";
$row=mysqli_fetch_assoc($result);
}

}


if(isset($row2)){
echo "a2 " ; echo $row2['link']." "; 
echo $row2['fileType']." ";
echo $row2['username']." ";
echo $row2['tags']." ";
echo "<br>";
}


if(isset($row3)){
echo "a3 " ; echo $row3['link']." "; 
echo $row3['fileType']." ";
echo $row3['username']." ";
echo $row3['tags']." ";
echo "<br>";
}

*/




?>