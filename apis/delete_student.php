<?php

require_once("/var/www/cred/mysql_connect_sgt.php");

if(empty($_POST)){
    print('no data');
} else {
    $id = $_POST['id'];

    $query = "DELETE FROM `data` WHERE `id` = '$id'";

    if(mysqli_query($conn, $query)){
        print($query);
        print('successful');
    } else {
        print('unsuccessful');
    };
}

mysqli_close($conn);