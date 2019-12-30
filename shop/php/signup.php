<?php
$u = $_POST["user"];
$p = $_POST["pass"];
$t = $_POST["signtoken"];
$at = $_POST["access_token"];
if ($t === "__retr0x__") {
    $link = new mysqli("localhost:3306", "root", "root", "admin");
    if ($link->connect_errno) {
        $json = array("code" => 00, "msg" => "connect_errno");
        echo json_encode($json);
    } else {
        $str = "SELECT * FROM login WHERE user='" . $u . "'";
        $q = $link->query($str);
        if ($q) {
            $arr = $q->fetch_assoc();
            if ($arr) {
                $json = array("code" => 10, "msg" => "select yes");
                echo json_encode($json);
            } else {
                $add = "INSERT login(user,pass,access_token) VALUE('" . $u . "','" . $p . "','" . $at . "')";
                $qadd = $link->query($add);
                if ($qadd) {
                    $json = array("code" => 21, "msg" => $at);
                    echo json_encode($json);
                } else {
                    $json = array("code" => 20, "msg" => "add no");
                    echo json_encode($json);
                }
            }
        }
    }
} else {
    $json = array("code" => 80, "msg" => "token no");
    echo json_encode($json);
}
