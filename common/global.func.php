<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/23
 * Time: 16:23
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

function generateToken($username, $password, $salt)
{
    $cookies = array();
    $cookies['username'] = $username;
    $cookies['password'] = $password;
    $cookies['salt'] = $salt;
    return md5(serialize($cookies));
}


function toUTF8($str)
{
    $encode = mb_detect_encoding($str, array('ASCII', 'UTF-8', 'GB2312', 'GBK'));
    if (!$encode == 'UTF-8') {
        $str = iconv('UTF-8', $encode, $str);
    }
    return $str;
}