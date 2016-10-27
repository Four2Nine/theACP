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


$result = array();
$result['status'] = submit_apply($data);
echo json_encode($result);
exit;

//--------------------------------------------------------------------------------
//--------------------------------------------------------------------------------

function submit_apply($data)
{
    if (submitApply($data)) {
        return Constant::$_CORRECT;
    } else {
        return Constant::$_DB_INSERT_ERROR;
    }
}

