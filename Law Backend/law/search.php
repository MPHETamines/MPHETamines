<!DOCTYPE html>
<html>
<head>
<style>
  table {
    width: 100%;
    border-collapse: collapse;
}

table, td, th {
    border: 1px solid black;
    padding: 5px;
}
tr{
    float:left;
    width:100%;
}
</style>
</head>
<body>

<?php

$connection = mysql_connect('localhost', 'root', '') or die ("Could not connect: " . mysql_error());
mysql_select_db('uwatchdb', $connection);

$category = $_POST['searchValue'];
echo $category;

//$query = "select * from files where category = '".$category."'";
$query = "select * from files where category = '".$category."' OR tags ='".$category."'";
$results = mysql_query($query) or die(mysql_error());
//echo $results;


if(mysql_num_rows($results) == 0 ){
    echo "No files under that category!";    
}
else{   
    echo "<table id='foundData'>
    <tr class='table_item table_header'>
    <th class='table_item'>File type</th>
    <th class='table_item'>Tags</th>
    <th class='table_item'>Category</th>
    <th class='table_item'>Owner</th>
    </tr>";

    while($row = mysql_fetch_assoc($results)) {
        echo "<tr class='table_item table_header'>";
        echo "<td class='table_item'>" . $row['filetype'] . "</td>";
        echo "<td class='table_item'>" . $row['tags'] . "</td>";
        echo "<td class='table_item'>" . $row['category'] . "</td>";
        echo "<td class='table_item'>" . $row['user_fk'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
}

mysql_close($connection);
?>
</body>
</html>