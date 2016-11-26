<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/25
 * Time: 22:08
 */

require 'connection.db.php';
require 'Constant.php';

$data = array();
$data['user_token'] = $_COOKIE['__token'];
$data['project'] = $_POST['project'];
$data['name'] = $_POST['name'];
$data['gender'] = $_POST['gender'];
$data['nationality'] = $_POST['nationality'];
$data['phone_number'] = $_POST['phone_number'];
$data['email'] = $_POST['email'];
$data['wechat'] = $_POST['wechat'];
$data['id_card_number'] = $_POST['id_card_number'];
$data['passport_number'] = $_POST['passport_number'];
$data['province'] = $_POST['province'];
$data['post_address'] = $_POST['post_address'];
$data['city_of_departure'] = $_POST['city_of_departure'];
$data['emergency_contact_name'] = $_POST['emergency_contact_name'];
$data['emergency_contact_phone_number'] = $_POST['emergency_contact_phone_number'];
$data['occupation'] = $_POST['occupation'];
$data['duration'] = $_POST['duration'];
$data['start_date'] = $_POST['start_date'];
$data['diet_requirement'] = $_POST['diet_requirement'];
$data['is_medical_history'] = empty($_POST['is_medical_history']) ? 0 : 1;
$data['medical_history'] = $_POST['medical_history'];
$data['is_first_go_abroad'] = empty($_POST['is_first_go_abroad']) ? 0 : 1;
$data['english_level'] = $_POST['english_level'];
$data['is_need_insurance'] = empty($_POST['is_need_insurance']) ? 0 : 1;
$data['is_apply_interview'] = empty($_POST['is_apply_interview']) ? 0 : 1;
$data['interview_date'] = $_POST['interview_date'];

//连接数据库
$con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
$con->query("SET NAMES UTF8;");

//根据token查找用户的id，使用id绑定到用户的报名表上
$sql = "SELECT `id` FROM tb_user WHERE `token` = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("s", $data['user_token']);
$stmt->execute();
$stmt->bind_result($user_id);

$sql = "INSERT INTO `tb_apply` (
                    `user_id`,
                    `project_id`,
                    `name`,
                    `gender`,
                    `nationality`,
                    `phone_number`,
                    `email`,
                    `wechat`,
                    `id_card_number`,
                    `passport_number`,
                    `province`,
                    `post_address`,
                    `city_of_departure`,
                    `emergency_contact_name`,
                    `emergency_contact_phone_number`,
                    `occupation`,
                    `duration`,
                    `start_date`,
                    `diet_requirement`,
                    `is_medical_history`,
                    `medical_history`,
                    `is_first_go_abroad`,
                    `english_level`,
                    `is_need_insurance`,
                    `is_apply_interview`,
                    `interview_date`
              ) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = $con->prepare($sql);
$stmt->bind_param("sisisssssssssssiissisiiiis",
    $user_id,
    $data['project'],
    $data['name'],
    $data['gender'],
    $data['nationality'],
    $data['phone_number'],
    $data['email'],
    $data['wechat'],
    $data['id_card_number'],
    $data['passport_number'],
    $data['province'],
    $data['post_address'],
    $data['city_of_departure'],
    $data['emergency_contact_name'],
    $data['emergency_contact_phone_number'],
    $data['occupation'],
    $data['duration'],
    $data['start_date'],
    $data['diet_requirement'],
    $data['is_medical_history'],
    $data['medical_history'],
    $data['is_first_go_abroad'],
    $data['english_level'],
    $data['is_need_insurance'],
    $data['is_apply_interview'],
    $data['interview_date']
);
$stmt->execute();

$affected_rows = $stmt->affected_rows;

if ($affected_rows == 1) {
    $result['status'] = Constant::$_CORRECT;
} else {
    $result['status'] = Constant::$_DB_INSERT_ERROR;
}

$stmt->close();
$con->close();

echo json_encode($result);
exit;
