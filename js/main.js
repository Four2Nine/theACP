var CORRECT = 100; //正确

var USERNAME_ERROR = 201; //用户名错误
//-------------------------------------------------------
var USERNAME_BLANK_ERROR = 2010; //用户名为空
var USERNAME_LENGTH_ERROR = 2011; //用户名长度不符合要求
var USERNAME_FORMAT_ERROR = 2012; //用户名格式错误
var USERNAME_REPEAT_ERROR = 2013; //用户名重复
var USERNAME_NOT_FOUND_ERROR = 2014; //没有找到该用户

var PASSWORD_ERROR = 202; //密码错误
//-------------------------------------------------------
var PASSWORD_BLANK_ERROR = 2020; //密码为空
var PASSWORD_LENGTH_ERROR = 2021; //密码长度不符合要求
var PASSWORD_INCONSISTENT_ERROR = 2022; //密码输入不一致
var PASSWORD_INCORRECT_ERROR = 2023; //密码错误

var INVITATION_CODE_ERROR = 203; //无效的邀请码

var DB_INSERT_ERROR = 301; //未知的INSERT错误

var NO_PERMISSION = 401;

jQuery(function ($) {

    //#main-slider
    $(function () {
        $('#main-slider.carousel').carousel({
            interval: 8000
        });
    });

    $('.centered').each(function (e) {
        $(this).css('margin-top', ($('#main-slider').height() - $(this).height()) / 2);
    });

    $(window).resize(function () {
        $('.centered').each(function (e) {
            $(this).css('margin-top', ($('#main-slider').height() - $(this).height()) / 2);
        });
    });

    //portfolio
    $(window).load(function () {
        $portfolio_selectors = $('.portfolio-filter >li>a');
        if ($portfolio_selectors != 'undefined') {
            $portfolio = $('.portfolio-items');
            $portfolio.isotope({
                itemSelector: 'li',
                layoutMode: 'fitRows'
            });
            $portfolio_selectors.on('click', function () {
                $portfolio_selectors.removeClass('active');
                $(this).addClass('active');
                var selector = $(this).attr('data-filter');
                $portfolio.isotope({filter: selector});
                return false;
            });
        }
    });

    //contact form
    var form = $('.contact-form');
    form.submit(function () {
        $this = $(this);
        $.post($(this).attr('action'), function (data) {
            $this.prev().text(data.message).fadeIn().delay(3000).fadeOut();
        }, 'json');
        return false;
    });

    //goto top
    $('.gototop').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 500);
    });

    //Pretty Photo
    $("a[rel^='prettyPhoto']").prettyPhoto({
        social_tools: false
    });
});

function errorcode2errorinfo(errorcode) {
    switch (errorcode) {
        case USERNAME_ERROR:
            return "用户名错误";
        case USERNAME_BLANK_ERROR:
            return "用户名为空";
        case USERNAME_LENGTH_ERROR:
            return "用户名长度不符合要求";
        case USERNAME_FORMAT_ERROR:
            return "用户名格式错误";
        case USERNAME_REPEAT_ERROR:
            return "用户名已存在";
        case USERNAME_NOT_FOUND_ERROR:
            return "该用户不存在";
        case PASSWORD_ERROR:
            return "密码错误";
        case PASSWORD_BLANK_ERROR:
            return "密码为空";
        case PASSWORD_LENGTH_ERROR:
            return "密码长度不符合要求";
        case PASSWORD_INCONSISTENT_ERROR:
            return "确认密码输入不一致";
        case PASSWORD_INCORRECT_ERROR:
            return "密码错误";
        case INVITATION_CODE_ERROR:
            return "无效的邀请码";
        case DB_INSERT_ERROR:
            return "未知的INSERT错误";
    }
}