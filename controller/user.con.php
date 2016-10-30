<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/23
 * Time: 17:13
 */

header('Content-Type:text/html;charset=utf-8;');
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$result = array();

$userInfo = get_user_info();
$applyInfo = get_apply_info();

if ($userInfo == null) {
    $result['user_info_status'] = Constant::$_DB_SELECT_ERROR;
} else {
    $result['user_info_status'] = Constant::$_CORRECT;
    $result['user_info'] = $userInfo;
}


$result['apply_info_status'] = Constant::$_CORRECT;
$result['apply_info'] = $applyInfo;


echo json_encode($result);
exit;


//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

function get_user_info()
{
    $userInfo = getUserInfo($_COOKIE['__token'], $_COOKIE['__username']);
    if (count($userInfo) == 0) {
        return null;
    }
    return $userInfo;
}

function get_apply_info()
{
    $applyInfo = getUserApply($_COOKIE['__token']);
    if (count($applyInfo) == 0) {
        return null;
    }
    return $applyInfo;
}


