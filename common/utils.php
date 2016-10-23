<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/23
 * Time: 16:23
 */

function generateInvitationCode()
{
    static $guid = '';
    $uid = uniqid("", true);
    $data = "theACP";
    $data .= $_SERVER['REQUEST_TIME'];
    $data .= $_SERVER['HTTP_USER_AGENT'];
    $data .= $_SERVER['REMOTE_ADDR'];
    $data .= $_SERVER['REMOTE_PORT'];
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
    return serialize($cookies);
}