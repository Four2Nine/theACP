<?
define("NAV", "about-us");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>关于 | theACP</title>
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
                <li class="active">
                    <a href="about-us.php">关于theACP</a>
                </li>
                <li>
                    <a href="project-list.php">志愿项目</a>
                </li>
                <li>
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
                <h1>关于theACP</h1>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada</p>
            </div>
            <div class="col-sm-6">
                <ul class="breadcrumb pull-right">
                    <li><a href="index.html">首页</a></li>
                    <li class="active">关于theACP</li>
                </ul>
            </div>
        </div>
    </div>
</section><!--/#title-->

<section id="about-us" class="container">
    <div class="row">
        <div class="col-sm-6">
            <h2>What we are</h2>
            <p>Proin gravida nibh vel velit auctor aliquet. Aenean sollicitudin, lorem quis bibendum auctor, nisi elit
                consequat ipsum, nec sagittis sem nibh id elit. Duis sed odio sit amet nibh vulputate cursus a sit amet
                mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris
                vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Mauris in erat justo. Nullam ac urna eu felis dapibus condimentum sit
                amet a augue. Sed non neque elit. Sed ut imperdiet nisi. Proin condimentum fermentum nunc. Etiam
                pharetra, erat sed fermentum feugiat, velit mauris egestas quam, ut aliquam massa nisl quis neque.
                Suspendisse in orci enim.</p>
        </div><!--/.col-sm-6-->
        <div class="col-sm-6">
            <h2>Our Skills</h2>
            <div>
                <div class="progress">
                    <div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="90"
                         aria-valuemin="0" aria-valuemax="100" style="width: 90%;">
                        <span>HTML/CSS</span>
                    </div>
                </div>
                <div class="progress">
                    <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="70"
                         aria-valuemin="0" aria-valuemax="100" style="width: 70%;">
                        <span>Wordpress</span>
                    </div>
                </div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0"
                         aria-valuemax="100" style="width: 40%;">
                        <span>Joomla</span>
                    </div>
                </div>
                <div class="progress">
                    <div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="55" aria-valuemin="0"
                         aria-valuemax="100" style="width: 55%;">
                        <span>Drupal</span>
                    </div>
                </div>
                <div class="progress">
                    <div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="75"
                         aria-valuemin="0" aria-valuemax="100" style="width: 75%;">
                        <span>PHP</span>
                    </div>
                </div>
            </div>
        </div><!--/.col-sm-6-->
    </div><!--/.row-->

    <div class="gap"></div>
    <h1 class="center">Meet the Team</h1>
    <p class="lead center">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas.</p>
    <div class="gap"></div>

    <div id="meet-the-team" class="row">
        <div class="col-md-3 col-xs-6">
            <div class="center">
                <p><img class="img-responsive img-thumbnail img-circle" src="images/team-member.jpg" alt=""></p>
                <h5>David J. Robbins
                    <small class="designation muted">Senior Vice President</small>
                </h5>
                <p>Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor.</p>
                <a class="btn btn-social btn-facebook" href="#"><i class="icon-facebook"></i></a> <a
                    class="btn btn-social btn-google-plus" href="#"><i class="icon-google-plus"></i></a> <a
                    class="btn btn-social btn-twitter" href="#"><i class="icon-twitter"></i></a> <a
                    class="btn btn-social btn-linkedin" href="#"><i class="icon-linkedin"></i></a>
            </div>
        </div>

        <div class="col-md-3 col-xs-6">
            <div class="center">
                <p><img class="img-responsive img-thumbnail img-circle" src="images/team-member.jpg" alt=""></p>
                <h5>David J. Robbins
                    <small class="designation muted">Senior Vice President</small>
                </h5>
                <p>Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor.</p>
                <a class="btn btn-social btn-facebook" href="#"><i class="icon-facebook"></i></a> <a
                    class="btn btn-social btn-google-plus" href="#"><i class="icon-google-plus"></i></a> <a
                    class="btn btn-social btn-twitter" href="#"><i class="icon-twitter"></i></a> <a
                    class="btn btn-social btn-linkedin" href="#"><i class="icon-linkedin"></i></a>
            </div>
        </div>
        <div class="col-md-3 col-xs-6">
            <div class="center">
                <p><img class="img-responsive img-thumbnail img-circle" src="images/team-member.jpg" alt=""></p>
                <h5>David J. Robbins
                    <small class="designation muted">Senior Vice President</small>
                </h5>
                <p>Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor.</p>
                <a class="btn btn-social btn-facebook" href="#"><i class="icon-facebook"></i></a> <a
                    class="btn btn-social btn-google-plus" href="#"><i class="icon-google-plus"></i></a> <a
                    class="btn btn-social btn-twitter" href="#"><i class="icon-twitter"></i></a> <a
                    class="btn btn-social btn-linkedin" href="#"><i class="icon-linkedin"></i></a>
            </div>
        </div>
        <div class="col-md-3 col-xs-6">
            <div class="center">
                <p><img class="img-responsive img-thumbnail img-circle" src="images/team-member.jpg" alt=""></p>
                <h5>David J. Robbins
                    <small class="designation muted">Senior Vice President</small>
                </h5>
                <p>Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor.</p>
                <a class="btn btn-social btn-facebook" href="#"><i class="icon-facebook"></i></a> <a
                    class="btn btn-social btn-google-plus" href="#"><i class="icon-google-plus"></i></a> <a
                    class="btn btn-social btn-twitter" href="#"><i class="icon-twitter"></i></a> <a
                    class="btn btn-social btn-linkedin" href="#"><i class="icon-linkedin"></i></a>
            </div>
        </div>
    </div><!--/#meet-the-team-->
</section><!--/#about-us-->

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
</body>
</html>