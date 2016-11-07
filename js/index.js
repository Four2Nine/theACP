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

    $.ajax({
        url: "/theACP/controller/index.con.php",
        success: function (data) {
            var result = JSON.parse(data);
            var slideBubble = "";
            var mainSlider = $("#main-slider");

            for (var item in result) {
                if (item == 0) {
                    slideBubble += '<li data-target="#main-slider" data-slide-to="' + item + '" class="active"></li>';
                } else {
                    slideBubble += '<li data-target="#main-slider" data-slide-to="' + item + '"></li>';
                }
                var slideItem = $("#cu-item" + item);
                slideItem.find("h2").html(result[item]["title"]);
                slideItem.find("p").html(result[item]["subtitle"]);
            }

            mainSlider.find("ol").html(slideBubble);
        }
    });

    //退出登录
    $("#cu-logout").click(function () {
        $.ajax({
            url: "/theACP/controller/logout.con.php",
            success: function (data) {
                if (data == CORRECT) {
                    location.href = "/theACP/index.html";
                }
            }
        })
    });
});