<?php
/**
 * Created by PhpStorm.
 * User: sealiu
 * Date: 2016/11/7
 * Time: 16:38
 */

require 'connection.db.php';
require 'Constant.php';

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

//获取轮播图数据
$sql = "SELECT * FROM `tb_slider` LIMIT 0, 3";
$stmt = $con->prepare($sql);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id, $img_path, $title, $subtitle);

$result = array();
while ($stmt->fetch()) {
    $item = array();
    $item['id'] = $id;
    $item['img_path'] = $img_path;
    $item['title'] = $title;
    $item['subtitle'] = $subtitle;
    $result[$id] = $item;
}
$stmt->close();
$con->close();

echo json_encode($result);
exit;
