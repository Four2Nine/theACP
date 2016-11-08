<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/23
 * Time: 16:23
 */

/**
 * @param $salt1 //采用username作为盐1
 * @param $salt2 //采用password（密）作为盐2
 * @return string   //邀请码，唯一
 */
function generateInvitationCode($salt1, $salt2)
{
    $guid = "";
    $uid = uniqid("", true);
    $data = $_SERVER['REQUEST_TIME'];
    $data .= $salt1;
    $data .= $salt2;
    $hash = strtoupper(hash('ripemd128', $uid . $guid . md5($data)));
    $guid =
        substr($hash, 0, 8) .
        '-' .
        substr($hash, 8, 4) .
        '-' .
        substr($hash, 12, 4) .
        '-' .
        substr($hash, 16, 4) .
        '-' .
        substr($hash, 20, 12);
    return $guid;
}

/**
 * @param $username //用户名
 * @param $password //密码
 * @param $salt //盐
 * @return string   //token
 */
function generateToken($username, $password, $salt)
{
    $cookies = array();
    $cookies['username'] = $username;
    $cookies['password'] = $password;
    $cookies['salt'] = $salt;
    return md5(serialize($cookies));
}