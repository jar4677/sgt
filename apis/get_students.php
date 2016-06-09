<?php
require_once("/var/www/cred/mysql_connect_sgt.php");

$query = "SELECT * FROM `data`";

$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        $output[] = $row;
    }
}

print(json_encode($output));

mysqli_close($conn);