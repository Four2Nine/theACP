<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/30
 * Time: 11:06
 */

header('Content-Type:text/html;charset=utf-8;');
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$currentPage = (int)$_GET['currentPage'];

$result = array();

$result['projectNum'] = getProjectCount();
$result['projectInfo'] = getProjectInfo(($currentPage - 1) * 3, 3);


echo json_encode($result);
exit;