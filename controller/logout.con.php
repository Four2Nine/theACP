<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/24
 * Time: 15:35
 */

header('Content-Type:text/html;charset=utf-8;');
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

logout("__username", "__token");

$result = array();
$result['status'] = Constant::$_CORRECT;
echo json_encode($result);
exit;