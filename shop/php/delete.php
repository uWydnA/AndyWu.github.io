<?php
$n = $_GET["name"];
$link = new mysqli("localhost:3306", "root", "root", "admin");
if ($link->connect_errno) {
    $json = array("code" => "00", "msg" => "connect no");
    echo json_encode($json);
} else {
    $str = "DELETE FROM userShop WHERE name='" . $n . "'";
    $q = $link->query($str);
    if ($q) {
        $json = array("code" => "51", "msg" => "delete ok");
        echo json_encode($json);
    } else {
        $json = array("code" => "50", "msg" => "delete no");
        echo json_encode($json);
    }
}
