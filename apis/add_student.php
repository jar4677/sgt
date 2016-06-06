<?php

//require_once("mysql_connect.php");

if(empty($_POST)){
    print('no data');
} else {
//    $name = $_POST['name'];
//    $course = $_POST['course'];
//    $grade = $_POST['grade'];

//    $query = "INSERT into `data` (`name`, `course`, `grade`) VALUES ('$name', '$course', '$grade')";

//    $result = mysqli_query($conn, $query);
//
//    if(mysqli_affected_rows($conn) > 0){
//        print(mysqli_affected_rows($conn));
//    } else {
//        print('no rows affected');
//    }

//    $output = json_encode($_POST);
    print_r($_POST);
};

