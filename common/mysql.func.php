<?php
/**
 * Created by PhpStorm.
 * User: liuyang
 * Date: 2016/10/21
 * Time: 21:06
 */
function connect()
{
    return mysqli_connect(DB_HOST, DB_USER, DB_PWD, DB_NAME) or die('fail to connect the database!');
}