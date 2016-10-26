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
$result['user_info_status'] = null;
$result['project_info_status'] = null;

$result['token'] = $_COOKIE['__token'];
$result['username'] = $_COOKIE['__username'];

$userInfo = get_user_info($result);

if ($userInfo == null) {
    $result['user_info_status'] = Constant::$_DB_SELECT_ERROR;
} else {
    $result['user_info_status'] = Constant::$_CORRECT;
    $result['username'] = $userInfo['username'];
    $result['balance'] = $userInfo['balance'];
    $result['invitation_code'] = $userInfo['invitation_code'];
}

echo json_encode($result);
exit;


//-----------------------------------------------------------------------
//-----------------------------------------------------------------------

function get_user_info($result)
{
    $userInfo = getUserInfo($result['token'], $result['username']);
    if (count($userInfo) == 0) {
        return null;
    }
    return $userInfo;
}


