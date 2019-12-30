<?php
$n = $_GET["name"];
$p = $_GET["price"];
$i = $_GET["img"];

$link = new mysqli("localhost:3306", "root", "root", "admin");
if ($link->connect_errno) {
    $json = array("code" => "00", "msg" => "connect no");
    echo json_encode($json);
} else {
    $str = "SELECT * FROM userShop WHERE `name`='" . $n . "'";
    $q = $link->query($str);
    if ($q) {
        $arr = $q->fetch_assoc();
        $a = json_encode($arr) === "null";
        if ($a) {
            $stre = "INSERT userShop(name,price,img) VALUES('" . $n . "'," . $p . ",'" . $i . "')";
            $qq = $link->query($stre);
            $jsone = array("code" => "41", "msg" => $n);
            echo json_encode($jsone);
        } else {
            $json = array("code" => "20", "msg" => $n);
            echo json_encode($json);
        }
    } else {
        $json = array("code" => "30", "msg" => $n);
        echo json_encode($json);
    }
}
