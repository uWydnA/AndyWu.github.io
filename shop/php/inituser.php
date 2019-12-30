<?php
$code = $_GET["retr0init"];
if ($code === "1") {
    $link = new mysqli("localhost:3306", "root", "root", "admin");
    if ($link->connect_errno) {
        $json = array("code" => "00", "msg" => "connect no");
        echo json_encode($json);
    } else {
        $str = "SELECT * FROM userShop";
        $q = $link->query($str);
        if ($q) {
            $selectArr = array();
            $count = 0;
            while ($arr = $q->fetch_assoc()) {
                $selectArr[$count] = $arr;
                $count = $count + 1;
            }
            $json = array("code" => "11", "msg" => $selectArr);
            echo json_encode($json);
        } else {
            $json = array("code" => "10", "msg" => "select no");
            echo json_encode($json);
        }
    }
}
