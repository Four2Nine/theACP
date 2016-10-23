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

if (!(isset($_COOKIE['__token']) && isset($_COOKIE['__username']))) {
    $result['status'] = Constant::$_NO_PERMISSION;
    echo json_encode($result);
    exit;
}

