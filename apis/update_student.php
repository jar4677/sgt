<?php

require_once("/var/www/cred/mysql_connect_sgt.php");

function sanitize($string){
    if(is_numeric($string)){
        $string = floatval($string);
    } else {
        $string = stripslashes(htmlentities(trim($string)));
    }
    return $string;
}


if(empty($_POST)){
    print('no data');
} else {
    $id = sanitize($_POST['id']);
    $name = sanitize($_POST['name']);
    $assignment = sanitize($_POST['assignment']);
    $grade = sanitize($_POST['grade']);

    $query = "UPDATE `data` SET `name` = '$name', `assignment` = '$assignment', `grade` = '$grade' WHERE `id` = '$id'";

    if(mysqli_query($conn, $query)){
        print($query);
        print('successful');
    } else {
        print('unsuccessful');
    };
}

mysqli_close($conn);