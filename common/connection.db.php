<?php
header('Content-Type:text/html;charset=utf-8;');
define('ROOT_PATH', substr(dirname(__FILE__), 0, -5));
if (PHP_VERSION < '4.1.0') {
    exit('当前PHP版本低于4.1.0，请升级版本！');
}
require ROOT_PATH . 'common/global.func.php';
require ROOT_PATH . 'common/mysql.func.php';
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PWD', 'QFynXANCxVdXm2q7');
define('DB_NAME', 'db_acp');
connect();