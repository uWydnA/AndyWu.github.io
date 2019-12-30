<?php
$id = $_GET["id"];
$link = new mysqli("localhost:3306", "root", "root", "admin");
if ($link->connect_errno) {
    $json = array("code" => "00", "msg" => "connect no");
    echo json_encode($json);
} else {
    $str = "SELECT * FROM shop WHERE id=" . $id;
    $q = $link->query($str);
    if ($q) {
        $selectArr = array();
        $count = 0;
        while ($arr = $q->fetch_assoc()) {
            $selectArr[$count] = $arr;
            $count = $count + 1;
        }
        $json = array("code" => "21", "msg" => $selectArr);
        echo json_encode($json);
    } else {
        $json = array("code" => "20", "msg" => "select no");
        echo json_encode($json);
    }
}
