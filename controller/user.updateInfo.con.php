<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/11/2
 * Time: 19:13
 */

require 'connection.db.php';
require 'global.func.php';
require 'Constant.php';

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$data = array();
$data['name'] = empty($_POST['name']) ? $_COOKIE['__username'] : $_POST['name'];
$data['is_change_password'] = empty($_POST['is_change_password']) ? 0 : 1;
$data['old_password'] = md5($_POST['password'] . Constant::$_SALT);
$data['new_password'] = md5($_POST['new_password'] . Constant::$_SALT);
$data['password'] = $data['is_change_password'] == 1 ? $data['new_password'] : $data['old_password'];
$data['confirm_new_password'] = $_POST['confirm_new_password'];

$result = array();

//检查用户密码是否正确
$sql = "SELECT * FROM `tb_user` WHERE `token` = ? AND `password` = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ss", $_COOKIE['__token'], $data['old_password']);
$stmt->execute();
$stmt->store_result();

$isCorrect = $stmt->fetch();

$result['status'] = $isCorrect ? Constant::$_CORRECT : Constant::$_PASSWORD_ERROR;
if ($result['status'] != Constant::$_CORRECT) {
    echo json_encode($result);
    exit;
}

$new_token = generateToken($data['name'], $data['password'], Constant::$_SALT);

//更新用户信息
$sql = "UPDATE `tb_user` SET `token` = ?, `username` = ?, `password` = ? 
WHERE `token` = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("ssss", $new_token, $data['name'], $data['password'], $_COOKIE['__token']);

$stmt->execute();
$stmt->store_result();
$affected_rows = $stmt->affected_rows;

$result['status'] = $affected_rows == 1 ? Constant::$_CORRECT : Constant::$_DB_UPDATE_ERROR;

if ($result['status'] == Constant::$_CORRECT) {
    //更新COOKIEs
    setcookie('__username', $data['name']);
    setcookie('__password', $data['password']);
    setcookie('__token', $new_token);
}

$stmt->close();
$con->close();

echo json_encode($result);
exit;