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
    $sql = "SELECT id FROM tb_user WHERE username = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("s", $value);
    $stmt->execute();

    $stmt->store_result();
    $stmt->bind_result($ids);
    $stmt->close();
    $con->close();
    return $ids == null ? false : true;
}

/**
 * @param $value1 //用户名
 * @param $value2 //密码
 * @return bool     //是否存在该用户
 */
function attemptLogin($value1, $value2)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);

    $sql = "SELECT COUNT(id) FROM tb_user WHERE username = ? AND password = ?";
    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $value1, $value2);
    $stmt->bind_result($num);

    $stmt->execute();
    $stmt->close();
    $con->close();
    return $num == 0 ? false : true;
}


function addUser($name, $password)
{
    $con = mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME);
    $con->query("SET NAMES UTF8");

    $sql = "INSERT INTO tb_user (
                    username,
                    password
              ) VALUE (?,?)";

    $stmt = $con->prepare($sql);
    $stmt->bind_param("ss", $name, $password);
    $stmt->execute();

    $affected_rows = $stmt->affected_rows;
    $stmt->close();
    $con->close();
    return $affected_rows == 1 ? true : false;
}