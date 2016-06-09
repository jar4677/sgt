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
    $name = sanitize($_POST['name']);
    $assignment = sanitize($_POST['assignment']);
    $grade = sanitize($_POST['grade']);
<<<<<<< HEAD

    $query = "INSERT INTO `data` (`name`, `assignment`, `grade`) VALUES ('$name', '$assignment', '$grade')";
    
    if(mysqli_query($conn, $query)){
	print($query);
	print('successful');
    } else {
	print('unsuccessful');
    };
};
=======

    $query = "INSERT INTO `data` (`name`, `assignment`, `grade`) VALUES ('$name', '$assignment', '$grade')";

    print(mysqli_query($conn, $query));
};



>>>>>>> 7f96746eeb0b3a29e55002837dade54ebdc0cf2d
