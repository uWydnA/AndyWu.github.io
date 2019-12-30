<?php
$u = $_GET["access_token"];
$link = new mysqli("localhost:3306", "root", "root", "admin");
if ($link->connect_errno) {
    $json = array("code" => 00, "msg" => "connect_errno");
    echo json_encode($json);
} else {
    $token = "SELECT * FROM login WHERE access_token= '" . $u . "'";
    $qtoken = $link->query($token);
    // print_r($quser);
    if ($qtoken) {
        $arr = $qtoken->fetch_assoc();
        $json = array("code" => 61, "msg" => $arr["user"]);
        echo json_encode($json);
    } else {
        $json = array("code" => 60, "msg" => "user no");
        echo json_encode($json);
    }
}
