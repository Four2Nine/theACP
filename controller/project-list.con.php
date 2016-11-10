<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/30
 * Time: 11:06
 */

require 'connection.db.php';
require 'Constant.php';

$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

$currentPage = (int)$_GET['currentPage'];

$num = 3;
$start = ($currentPage - 1) * $num;

$result = array();

//获取项目数量
$sqlCount = "SELECT * FROM `tb_project`";
$stmt = $con->prepare($sqlCount);
$stmt->execute();
$stmt->store_result();
$result['projectNum'] = $stmt->num_rows;

//获取项目的详情
$sqlDetail = "SELECT `id`, `acpname`, `acpcity`, `acpdate`, `acpday`, `acptheme`, `acpbright`, 
`acpmean`, `acpdetail`, `acptip`, `acppicture`, `acppushdate`, `acpistop` FROM `tb_project` LIMIT ?, ?";
$stmt = $con->prepare($sqlDetail);
$stmt->bind_param("ii", $start, $num);
$stmt->execute();

$stmt->store_result();
$stmt->bind_result($id, $name, $city, $date, $day, $theme, $bright, $mean, $detail, $tip, $picture,
    $push_date, $is_top);

$projects = array();
while ($stmt->fetch()) {
    $item = array();
    $item['id'] = $id;
    $item['name'] = $name;
    $item['imageFile'] = md5($name);
    $item['city'] = $city;
    $item['date'] = $date;
    $item['day'] = $day;
    $item['theme'] = $theme;
    $item['bright'] = $bright;
    $item['mean'] = $mean;
    $item['detail'] = $detail;
    $item['tip'] = $tip;
    $item['picture'] = $picture;
    $item['push_date'] = $push_date;
    $item['is_top'] = $is_top;

    $projects[$id] = $item;
}
$result['projects'] = $projects;

$stmt->close();
$con->close();
echo json_encode($result);
exit;