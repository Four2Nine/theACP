/**
 * Created by liuyang on 2016/10/23.
 */

$(".cu-notification").hide();
$("#user-info").hide();

$("#copy2board").tooltip();

$(document).ready(function () {
    $.ajax({
        url: "/theACP/controller/user.con.php",
        success: function (data) {
            var result = JSON.parse(data);

            if (result.status != CORRECT) {
                // 显示错误信息
                $("#cu-spinner-aside").hide();
                $("#cu-spinner-content").hide();

                $("#cu-alert-aside").html(
                    "error code: " + result.status + '<br>' + errorcode2errorinfo(result.status)
                ).fadeIn(800);
                $("#cu-alert-content").html(
                    "error code: " + result.status + '<br>' + errorcode2errorinfo(result.status)
                ).fadeIn(800);
            } else {
                $("#cu-spinner-aside").hide();
                if (result.user_info_status != null && result.user_info_status != CORRECT) {
                    $("#cu-alert-aside").html(
                        "error code: " + result.status + '<br>' + errorcode2errorinfo(result.status)
                    ).fadeIn(800);
                } else {
                    //显示会员的个人信息
                    $("#username").html(result.username);
                    $("#balance").html(result.balance + " 元");
                    $("#invitation-code").val(result.invitation_code);
                    $("#user-info").fadeIn(800);
                }
                if (result.project_info_status != null && result.project_info_status != CORRECT) {
                    $("#cu-spinner-content").hide();
                    $("#cu-alert-content").html(
                        "error code: " + result.status + '<br>' + errorcode2errorinfo(result.status)
                    ).fadeIn(800);
                }
            }
        }
    });

    $("#cu-logout").click(function () {
        $.ajax({
            url: "/theACP/controller/user.con.php",
            success: function (data) {
                var result = JSON.parse(data);

                if (result.status == CORRECT) {
                    location.href = "/theACP/login.html";
                }
            }
        })
    });
});