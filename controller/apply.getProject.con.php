<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/11/2
 * Time: 21:22
 */

require 'connection.db.php';
require 'global.func.php';
require 'Constant.php';

$result = array();

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

//项目数量
$sqlCount = "SELECT * FROM `tb_project`";
$stmt = $con->prepare($sqlCount);
$stmt->execute();
$stmt->store_result();
$result['projectNum'] = $stmt->num_rows;


//为报名表页面获取项目的ID和名称列表
$sqlIDAndName = "SELECT `id`, `acpname` FROM `tb_project`";
$stmt = $con->prepare($sqlIDAndName);
$stmt->execute();
$stmt->store_result();
$stmt->bind_result($id, $name);
$projects = array();
while ($stmt->fetch()) {
    $item = array();
    $item['id'] = $id;
    $item['name'] = $name;
    $projects[$id] = $item;
}
$result['projectInfo'] = $projects;

//关闭连接
$stmt->close();
$con->close();
echo json_encode($result);
exit;