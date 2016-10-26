/**
 * Created by liuyang on 2016/10/23.
 */

$(document).ready(function () {
    //验证登录状态
    $.ajax({
        url: "/theACP/controller/check.login.php",
        success: function (data) {
            var result = JSON.parse(data);

            $("#p2").hide();
            if (result.status != CORRECT) {
                $("#cu-user-notification").html(
                    "error code: " + result.status + '<br>' + errorcode2errorinfo(result.status) + "正在跳转至登录页面..."
                );

                setTimeout(function () {
                    location.href = "/theACP/login.html";
                }, 1200);
            } else {
                //登录状态验证成功，获取信息（包括用户信息和报名的醒目信息）
                $("#cu-user-notification").html("正在获取信息...");
                $.ajax({
                    url: "/theACP/controller/user.con.php",
                    success: function (data) {
                        var result = JSON.parse(data);

                        //获取用户信息
                        if (result.user_info_status != CORRECT) {
                            // 显示错误信息
                            $("#cu-user-notification").html(
                                "error code: " + result.status + '<br>' + errorcode2errorinfo(result.status)
                            );
                        } else {
                            $("#cu-user-notification").fadeOut(800);
                            //显示会员的个人信息
                            $("#username").html(result.username);
                            $("#balance").html(result.balance + " 元");
                            $("#invitation-code").val(result.invitation_code);
                        }

                        //获取用户报名的项目及审核进度
                        if (result.project_info_status != CORRECT) {
                            // 显示错误信息
                            $("#cu-user-notification").html(
                                "error code: " + result.status + '<br>' + errorcode2errorinfo(result.status)
                            );
                        } else {
                            $("#cu-user-notification").fadeOut(800);
                            //显示用户已经报名的项目，以及进度
                        }
                    }
                });
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
                    location.href = "/theACP/login.html";
                }
            }
        })
    });
});