<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/11/2
 * Time: 21:22
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$result = array();

$result['projectNum'] = getProjectCount();
$result['projectInfo'] = getProjectIdAndName();

echo json_encode($result);
exit;