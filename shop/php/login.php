<?php
$u = $_POST["user"];
$p = $_POST["pass"];
$link = new mysqli("localhost:3306", "root", "root", "admin");
if ($link->connect_errno) {
    $json = array("code" => 00, "msg" => "connect_errno");
    echo json_encode($json);
} else {
    $user = "SELECT * FROM login WHERE user= '" . $u . "'";
    $quser = $link->query($user);
    // print_r($quser);
    if ($quser) {
        $arr = $quser->fetch_assoc();
        if (!$arr) {
            $json = array("code" => 10, "msg" => "user_no");
            echo json_encode($json);
            die();
        } else {
            if ($arr["pass"] === $p) {
                $json = array("code" => 21, "msg" => $arr["access_token"]);
                echo json_encode($json);
            } else {
                $json = array("code" => 20, "msg" => $arr["pass"] === $p);
                echo json_encode($json);
            }
        }
    } else {
        $json = array("code" => 10, "msg" => "connect_errno");
        echo json_encode($json);
    }
}
