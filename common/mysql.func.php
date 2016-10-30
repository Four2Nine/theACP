<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/21
 * Time: 21:06
 */

/**
 * @param $value //用户名
 * @return bool     //表中是否存在相同用户名
 */
function isExist($value)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id` FROM `tb_user` WHERE `username` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $value);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($ids);

    $isExist = false;
    while ($stmt->fetch()) {
        $isExist = true;
    }

    $stmt->close();
    $con->close();
    return $isExist;
}

/**
 * @param $value1 //用户名
 * @param $value2 //密码
 * @return bool     //是否存在该用户
 */
function attemptLogin($value1, $value2)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id` FROM `tb_user` WHERE `username` = ? AND `password` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $value1, $value2);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($ids);

    $isExist = false;
    while ($stmt->fetch()) {
        $isExist = true;
    }

    $stmt->close();
    $con->close();
    return $isExist;
}

/**
 * @param $token //__token
 * @param $name //用户名
 * @param $password //密码
 * @param $invitation_code //邀请码
 * @return bool //是否添加成功
 */
function addUser($token, $name, $password, $invitation_code)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");

    $sql = "INSERT INTO `tb_user` (
                    `token`,
                    `username`,
                    `password`,
                    `invitation_code`
              ) VALUE (?, ?, ?, ?)";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("ssss", $token, $name, $password, $invitation_code);
    $stmt->execute();

    $affected_rows = $stmt->affected_rows;
    $stmt->close();
    $con->close();
    return $affected_rows == 1 ? true : false;
}

/**
 * @param $token //__token
 * @return bool //token 是否存在
 */
function checkToken($token)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id` FROM `tb_user` WHERE `token` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($ids);

    $result = false;
    while ($stmt->fetch()) {
        $result = true;
    }

    $stmt->close();
    $con->close();
    return $result;
}

/**
 * @param $token //__token
 * @param $username //用户名
 * @return array    //用户信息--数组，否则为空
 */
function getUserInfo($token, $username)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `username`, `balance`, `invitation_code` FROM `tb_user` WHERE `token` = ? AND `username` = ? LIMIT 1";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $token, $username);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($username, $balance, $invitation_code);

    $result = array();
    while ($stmt->fetch()) {
        $result['username'] = $username;
        $result['balance'] = $balance;
        $result['invitation_code'] = $invitation_code;
    }
    $stmt->close();
    $con->close();
    return $result;
}

/**
 * @param $token //用户token
 * @return array    //多条用户申请表
 */
function getUserApply($token)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id`, `project_id`, `status` FROM `tb_apply` WHERE `user_token` = ? ORDER BY `id` DESC";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $token);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($id, $project_id, $status);

    $result = array();
    while ($stmt->fetch()) {
        $item = array();
        $item['id'] = $id;
        $item['project_id'] = $project_id;
        switch ($status) {
            case 0:
                $item['status'] = "待审核";
                break;
            case 1:
                $item['status'] = "审核中";
                break;
            case 2:
                $item['status'] = "审核通过";
        }
        $result[$id] = $item;
    }
    $stmt->close();
    $con->close();
    return $result;
}

/**
 * @param $array //报名表信息-数组
 * @return bool //是否报名成功
 */
function submitApply($array)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "INSERT INTO `tb_apply` (
                    `user_token`,
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
        $array['user_token'],
        $array['project'],
        $array['name'],
        $array['gender'],
        $array['nationality'],
        $array['phone_number'],
        $array['email'],
        $array['wechat'],
        $array['id_card_number'],
        $array['passport_number'],
        $array['province'],
        $array['post_address'],
        $array['city_of_departure'],
        $array['emergency_contact_name'],
        $array['emergency_contact_phone_number'],
        $array['occupation'],
        $array['duration'],
        $array['start_date'],
        $array['diet_requirement'],
        $array['is_medical_history'],
        $array['medical_history'],
        $array['is_first_go_abroad'],
        $array['english_level'],
        $array['is_need_insurance'],
        $array['is_apply_interview'],
        $array['interview_date']
    );
    $stmt->execute();

    $affected_rows = $stmt->affected_rows;
    $stmt->close();
    $con->close();
    return $affected_rows == 1 ? true : false;
}

/**
 * @return int 返回项目数量
 */
function getProjectCount()
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT * FROM `tb_project`";
    $stmt = $con->prepare($sql);
    $stmt->execute();
    $stmt->store_result();
    $count = $stmt->num_rows;
    $stmt->close();
    $con->close();
    return $count;
}

/**
 * @param $start //查询起始
 * @param $num //查询数目
 * @return array    //返回项目信息
 */
function getProjectInfo($start, $num)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8;");
    $sql = "SELECT `id`, `acpname`, `acpcity`, `acpdate`, `acpday`, `acptheme`, `acpbright`, `acpmean`, `acpdetail`, 
`acptip`, `acppicture`, `acppushdate`, `acpistop` FROM `tb_project` LIMIT ?, ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ii", $start, $num);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($id, $name, $city, $date, $day, $theme, $bright, $mean, $detail, $tip, $picture, $push_date,
        $is_top);

    $result = array();
    while ($stmt->fetch()) {
        $item = array();
        $item['id'] = $id;
        $item['name'] = $name;
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

        $result[$id] = $item;
    }
    $stmt->close();
    $con->close();
    return $result;
}
