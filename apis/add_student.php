<?php
require_once("../cred/mysql_connect_sgt.php");

if(empty($_POST)){
    print('no data');
} else {
    print_r($_POST);
};

