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
                $("#cu-user-notification").fadeOut(500);
                $.ajax({
                    url: "/theACP/controller/user.con.php",
                    success: function (data) {
                        var result = JSON.parse(data);

                        //获取用户信息
                        if (result.user_info_status != CORRECT) {
                            // 显示错误信息
                            $("#cu-user-notification").html(
                                "error code: " + result.status + '<br>' + errorcode2errorinfo(result.status)
                            ).fadeIn(500);
                        } else {
                            //显示会员的个人信息
                            $("#username").html(result.user_info.username);
                            $("#balance").html(result.user_info.balance + " 元");
                            $("#invitation-code").val(result.user_info.invitation_code);
                        }

                        //获取用户报名的项目及审核进度
                        if (result.apply_info_status != CORRECT) {
                            // 显示错误信息
                            $("#cu-user-notification").html(
                                "error code: " + result.status + '<br>' + errorcode2errorinfo(result.status)
                            ).fadeIn(500);
                        } else {
                            //显示用户已经报名的项目，以及进度
                            if (result.apply_info == null || result.apply_info.length == 0) {
                                $("table tbody>tr>td").html("没有已报名项目");
                            } else {
                                var html = "";
                                for (var item in result.apply_info) {
                                    html += "<tr>" +
                                        "<td>" + item + "</td>" +
                                        "<td>" + result.apply_info[item + ""]['project_id'] + "</td>" +
                                        "<td>" + result.apply_info[item + ""]['status'] + "</td>" +
                                        "<td><span class='glyphicon glyphicon-list-alt'></span></td>" +
                                        "</tr>";
                                }

                                $("table tbody").html(html).fadeIn(300);
                            }
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