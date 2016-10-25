<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/26
 * Time: 0:37
 */

header('Content-Type:text/html;charset=utf-8;');
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$result = array();

//验证Cookie是否存在
$result['status'] = is_cookie_exist();
if ($result['status'] != Constant::$_CORRECT) {
    echo json_encode($result);
    exit;
}

//验证token是否正确
$result['status'] = is_token_exist($_COOKIE['__token']);

echo json_encode($result);
exit;


//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

function is_cookie_exist()
{
    if (!(isset($_COOKIE['__token']) && isset($_COOKIE['__username']))) {
        return Constant::$_NOT_LOGIN;
    } else {
        return Constant::$_CORRECT;
    }
}

function is_token_exist($token)
{
    if (checkToken($token)) {
        return Constant::$_CORRECT;
    } else {
        return Constant::$_TOKEN_INCORRECT;
    }
}