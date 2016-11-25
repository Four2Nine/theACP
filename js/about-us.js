/**
 * Created by liuyang on 2016/11/2.
 */

$("li.dropdown").hide();

$(document).ready(function () {
    //验证登录状态
    $.ajax({
        url: "/controller/check.login.php",
        success: function (data) {
            var result = JSON.parse(data);
            if (result.status == CORRECT) {
                $("li.dropdown").show();
            } else {
                $(".cu-nav li:eq(2)").after(
                    "<li>" +
                    "<a href='register.html'>注册</a>" +
                    "</li>" +
                    "<li>" +
                    "<a href='login.html'>登录</a>" +
                    "</li>"
                );
            }
        }
    });

    //退出登录
    $("#cu-logout").click(function () {
        $.ajax({
            url: "/controller/logout.con.php",
            success: function (data) {

                if (data == CORRECT) {
                    location.href = "about-us.html";
                }
            }
        })
    });
});