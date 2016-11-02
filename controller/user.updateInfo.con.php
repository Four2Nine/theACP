<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/11/2
 * Time: 19:13
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$data = array();

$data['name'] = empty($_POST['name']) ? $_COOKIE['__username'] : $_POST['name'];
$data['password'] = md5($_POST['password'] . Constant::$_SALT);
$data['is_change_password'] = empty($_POST['is_change_password']) ? 0 : 1;
$data['new_password'] = md5($_POST['new_password'] . Constant::$_SALT);
$data['confirm_new_password'] = $_POST['confirm_new_password'];

$result = array();
$result['status'] = checkPassword($_COOKIE['__token'], $data['password']) ? Constant::$_CORRECT :
    Constant::$_PASSWORD_ERROR;
if ($result['status'] != Constant::$_CORRECT) {
    echo json_encode($result);
    exit;
}

$name = $data['name'];
$pwd = $data['is_change_password'] == 1 ? $data['new_password'] : $data['password'];
$new_token = generateToken($name, $pwd, Constant::$_SALT);


$result['status'] = updateUserInfo($_COOKIE['__token'], $name, $pwd, $new_token) == 1 ? Constant::$_CORRECT :
    Constant::$_DB_UPDATE_ERROR;
if ($result['status'] == Constant::$_CORRECT) {
    $result['name'] = $data['name'];
    //更新COOKIEs
    setcookie('__username', $result['name']);
    setcookie('__token', $new_token);
}

echo json_encode($result);
exit;