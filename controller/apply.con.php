<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/25
 * Time: 22:08
 */

header('Content-Type:text/html;charset=utf-8;');
require substr(dirname(__FILE__), 0, -10) . 'common\connection.db.php';
require substr(dirname(__FILE__), 0, -10) . 'common\Constant.php';

$result = array();
$result['project'] = $_POST['project'];
$result['name'] = $_POST['name'];
$result['gender'] = $_POST['gender'];
$result['nationality'] = $_POST['nationality'];
$result['phone_number'] = $_POST['phone_number'];
$result['email'] = $_POST['email'];
$result['wechat'] = $_POST['wechat'];
$result['id_card_number'] = $_POST['id_card_number'];
$result['passport_number'] = $_POST['passport_number'];
$result['province'] = $_POST['province'];
$result['post_address'] = $_POST['post_address'];
$result['city_of_departure'] = $_POST['city_of_departure'];
$result['emergency_contact_name'] = $_POST['emergency_contact_name'];
$result['emergency_contact_phone_number'] = $_POST['emergency_contact_phone_number'];
$result['occupation'] = $_POST['occupation'];
$result['duration'] = $_POST['duration'];
$result['start_date'] = $_POST['start_date'];
$result['diet_requirement'] = $_POST['diet_requirement'];
$result['is_medical_history'] = $_POST['is_medical_history'];
$result['is_first_go_abroad'] = $_POST['is_first_go_abroad'];
$result['english_level'] = $_POST['english_level'];
$result['is_apply_interview'] = $_POST['is_apply_interview'];
$result['interview_date'] = $_POST['interview_date'];
$result['is_need_insurance'] = $_POST['is_need_insurance'];

echo json_encode($result);

