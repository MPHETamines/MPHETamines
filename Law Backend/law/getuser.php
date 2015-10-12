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
mysql_select_db('uwatchDB', $connection);
if(isset($_GET['q'])){

    $q = intval($_GET['q']);
}
else{
    $q = "0";
}

if($q == "1"){
    $category = "Drug";   
}
else if($q == "2"){
    $category = "Murder";   
}

else if($q == "3"){
    $category = "Rape";   
}
else if($q == "4"){
    $category = "Robbery";   
}

else if($q == "5"){
    $category = "Violence";   
}

else if($q == "6"){
    $category = "Other";   
}
else{
    $category = "";
}

$query = 'select * from files where category ="' . $category . '"';
$results = mysql_query($query) or die(mysql_error());

if(mysql_num_rows($results) < 1 ){
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