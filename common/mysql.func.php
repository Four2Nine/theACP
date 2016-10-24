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

