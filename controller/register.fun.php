<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/21
 * Time: 12:06
 */
session_start();
define('ROOT_PATH', substr(dirname(__FILE__), 0, -5));

$result = array();

$result['uniqid'] = $_POST["uniqid"];
$result['username'] = $_POST["username"];
$result['password'] = $_POST["password"];
$result['password_confirm'] = $_POST["password_confirm"];

echo json_encode($result);



//-----------------------------------------------------------------
//-----------------------------------------------------------------

//if (!function_exists('_alert_back')) {
//    exit('_alert_back()函数不存在，请检查！');
//}
//if (!function_exists('_mysql_string')) {
//    exit('_mysql_string()函数不存在，请检查！');
//}

//检查用户名
//function _check_username($_string, $_max_len)
//{
//    $_string = trim($_string);
//    if (mb_strlen($_string, 'utf-8') < 1) {
//        return "会员名不能为空";
//    }
//    if (mb_strlen($_string, 'utf-8') > $_max_len) {
//        return '会员名长度不能超过' . $_max_len . '个字符';
//    }
//
//    if (!(preg_match('/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/', $_string))) {
//        return '会员名不能包括除下划线以外的特殊字符';
//    }
//    return null;
//}
//
//function _check_password($_first_pass, $_end_pass)
//{
//    if ($_first_pass != $_end_pass) {
//        return '两次密码输入不一致';
//    }
//    return null;
//}
//
//function _check_email($_string, $_max_len)
//{
//    if (!preg_match('/^([\w\-\.]+)@[\w\-\.]+(\.\w+)+$/', $_string)) {
//        return '邮箱格式不正确！';
//    }
//    if (mb_strlen($_string, 'utf-8') > $_max_len) {
//        return '邮箱字符不得大于' . $_max_len . '位！';
//    }
//    return null;
//}
//
//function _check_uniqid($_post_uniqid, $_session_uniqid)
//{
//    if ($_post_uniqid != $_session_uniqid) {
//        return '唯一标识符异常！';
//    }
//    return null;
//}