<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/11/3
 * Time: 12:20
 */

require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$id = $_POST['id'];

$result = getProjectDetail($id);

echo json_encode($result);
exit;