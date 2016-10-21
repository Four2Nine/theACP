<?php
ob_start();
session_start();
require dirname(__FILE__) . '/common/global.func.php';
$_uniqid = _sha1_uniqid();
$_SESSION['uniqid'] = $_uniqid;

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>注册 | theACP</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link href="css/prettyPhoto.css" rel="stylesheet">
    <link href="css/animate.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
    <link href="css/custom.css" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
    <script src="js/respond.min.js"></script>
    <![endif]-->
    <link rel="shortcut icon" href="images/ico/favicon.ico">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="images/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="images/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="images/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="images/ico/apple-touch-icon-57-precomposed.png">
</head><!--/head-->
<body>

<header class="navbar navbar-inverse navbar-fixed-top wet-asphalt" role="banner">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle cu-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand cu-logo" href="index.html">
                <!--<img src="images/logo.png" alt="logo">-->
                theACP
            </a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li>
                    <a href="index.html">首页</a>
                </li>
                <li>
                    <a href="about-us.php">关于theACP</a>
                </li>
                <li>
                    <a href="project-list.php">志愿项目</a>
                </li>
                <li class="active">
                    <a href="register.php">注册</a>
                </li>
                <li>
                    <a href="login.php">登录</a>
                </li>
            </ul>
        </div>
    </div>
</header><!--/header-->

<section id="title" class="emerald">
    <div class="container">
        <div class="row">
            <div class="col-sm-6 cu-page-head">
                <h1>注册一个帐号</h1>
                <p>注册一个帐号即可报名加入我们的志愿者工作。生活于我，不止是一场英雄梦！</p>
            </div>
            <div class="col-sm-6">
                <ul class="breadcrumb pull-right">
                    <li><a href="index.html">首页</a></li>
                    <li class="active">注册</li>
                </ul>
            </div>
        </div>
    </div>
</section><!--/#title-->

<section id="registration" class="container">

    <div class="alert alert-danger" role="alert">Oh snap!...</div>

    <form id="register-form" class="form-horizontal cu-form col-sm-8" role="form" method="post">
        <input type="hidden" name="uniqid" value="<? echo $_uniqid ?>">
        <div class="form-group">
            <label for="username" class="col-sm-3 control-label">会员名</label>
            <div class="col-sm-6">
                <input type="text" id="username" name="username" placeholder="会员名" class="form-control">
                <span class="label label-danger cu-error" id="username-error"></span>
            </div>
            <label class="glyphicon glyphicon-ok cu-correct" id="username-correct"></label>
        </div>

        <div class="form-group">
            <label for="password" class="col-sm-3 control-label">密码</label>
            <div class="col-sm-6">
                <input type="password" id="password" name="password" placeholder="密码" class="form-control">
                <span class="label label-danger cu-error" id="password-error"></span>
            </div>
            <label class="glyphicon glyphicon-ok cu-correct" id="password-correct"></label>
        </div>
        <div class="form-group">
            <label for="password_confirm" class="col-sm-3 control-label">密码确认</label>
            <div class="col-sm-6">
                <input type="password" id="password_confirm" name="password_confirm" placeholder="密码确认"
                       class="form-control">
                <span class="label label-danger cu-error" id="password-confirm-error"></span>
            </div>
            <label class="glyphicon glyphicon-ok cu-correct" id="password-confirm-correct"></label>
        </div>

        <div class="form-group">
            <label for="invitationCode" class="col-sm-3 control-label">邀请码</label>
            <div class="col-sm-6">
                <input type="text" id="invitationCode" name="invitationCode" placeholder="邀请码（选填）"
                       class="form-control disabled">
            </div>
        </div>

        <div class="form-group">
            <div class="col-sm-offset-3 col-sm-4">
                <button class="btn btn-success btn-md btn-block" id="register-btn">注册</button>
            </div>
        </div>

        <p class="col-sm-offset-3">
            已有帐号？
            <a href="login.php" class="cu-link">直接登录</a>
        </p>
    </form>

    <p id="testJsAjax"></p>
</section><!--/#registration-->

<footer id="footer" class="midnight-blue">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                &copy; 2016 429 | ShapeBootstrap.
                All Rights Reserved.
            </div>
            <div class="col-sm-6">
                <ul class="pull-right">
                    <li><a href="#">xxx</a></li>
                    <li><a href="#">xxx</a></li>
                    <li><a href="#">xxx</a></li>
                    <li><a href="#">xxx</a></li>
                    <li><a id="gototop" class="gototop" href="#"><i class="icon-chevron-up"></i></a></li><!--#gototop-->
                </ul>
            </div>
        </div>
    </div>
</footer><!--/#footer-->

<script src="js/jquery.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/jquery.prettyPhoto.js"></script>
<script src="js/main.js"></script>
<script src="js/register.js"></script>
</body>
</html>