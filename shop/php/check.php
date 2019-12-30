<?php
$v = $_GET["verify"];
session_start();
$str =  $_SESSION['img_number'];
if ($v == $str) {
    $json = array("code" => 71, "msg" => "check yes");
    echo json_encode($json);
} else {
    $json = array("code" => 70, "msg" => "check no");
    echo json_encode($json);
}
