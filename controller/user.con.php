<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/23
 * Time: 17:13
 */

require 'connection.db.php';
require 'Constant.php';

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$result = array();

//获取个人信息
$sqlInfo = "SELECT `username`, `balance`, `invitation_code` FROM `tb_user` WHERE `token` = ? LIMIT 1";

$stmt = $con->prepare($sqlInfo);
$stmt->bind_param("s", $_COOKIE['__token']);
$stmt->execute();

$stmt->store_result();
$stmt->bind_result($username, $balance, $invitation_code);

$userInfo = array();
while ($stmt->fetch()) {
    $userInfo['username'] = $username;
    $userInfo['balance'] = $balance;
    $userInfo['invitation_code'] = $invitation_code;
}

//根据查询到的个人信息返回相应的信息
if (count($userInfo) == 0) {
    $result['user_info_status'] = Constant::$_DB_SELECT_ERROR;
} else {
    $result['user_info_status'] = Constant::$_CORRECT;
    $result['user_info'] = $userInfo;
}

//获取会员的报名表
$sql = "SELECT a.id, p.acpname, a.status, a.apply_time FROM `tb_apply` a, `tb_project` p 
WHERE `user_token` = ? AND a.project_id = p.id";
$stmt = $con->prepare($sql);
$stmt->bind_param("s", $_COOKIE['__token']);
$stmt->execute();

$stmt->store_result();
$stmt->bind_result($id, $project_name, $status, $time);

$applyInfo = array();
while ($stmt->fetch()) {
    $item = array();
    $item['id'] = $id;
    $item['project_name'] = $project_name;
    $item['apply_time'] = $time;
    switch ($status) {
        case 0:
            $item['status'] = "待审核";
            break;
        case 1:
            $item['status'] = "审核通过";
            break;
        case 2:
            $item['status'] = "审核拒绝";
            break;
    }
    $applyInfo[$id] = $item;
}

//根据查询到该会员的报名信息返回相应的信息
$result['apply_info_status'] = Constant::$_CORRECT;
$result['apply_info'] = $applyInfo;


$stmt->close();
$con->close();

echo json_encode($result);
exit;
