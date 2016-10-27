/**
 * Created by liuyang on 2016/10/27.
 */

$("li.dropdown").hide();

$(document).ready(function () {
    //验证登录状态
    $.ajax({
        url: "/theACP/controller/check.login.php",
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
            url: "/theACP/controller/logout.con.php",
            success: function (data) {
                var result = JSON.parse(data);

                if (result.status == CORRECT) {
                    location.href = "/theACP/index.html";
                }
            }
        })
    });
});