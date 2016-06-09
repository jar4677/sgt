<?php
require_once("/var/www/cred/mysql_connect_sgt.php");

$query = "SELECT * FROM `data`";

$result = mysqli_query($conn, $query);

<<<<<<< HEAD
if(mysqli_num_rows($result) > 0){
=======
if(mysqli_affected_rows($result) > 0){
>>>>>>> 7f96746eeb0b3a29e55002837dade54ebdc0cf2d
    while($row = mysqli_fetch_assoc($result)){
        $output[] = $row;
    }
}

<<<<<<< HEAD
print_r(json_encode($output));
=======
print(json_encode($output));
>>>>>>> 7f96746eeb0b3a29e55002837dade54ebdc0cf2d
