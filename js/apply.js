/**
 * Created by liuyang on 2016/10/25.
 */

$("#cu-interview-date").hide();

$(document).ready(function () {
    $("#apply-form").submit(function (event) {
        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        $.ajax({
            url: "/theACP/controller/apply.con.php",
            type: "post",
            data: serializedData,
            success: function (data) {

            }
        });

    });

    //验证登录状态
    $.ajax({
        url: "/theACP/controller/check.login.php",
        success: function (data) {
            var result = JSON.parse(data);

            $("#p2").hide();
            if (result.status != CORRECT) {
                // 显示错误信息
                $("#cu-apply-notification").html(
                    "error code: " + result.status + '<br>' + errorcode2errorinfo(result.status) + ", 正在跳转至登录页面..."
                );
                setTimeout(function () {
                    location.href = "/theACP/login.html";
                }, 1200);
            } else {
                $("#cu-apply-notification").hide();
            }
        }
    });

    //是否申请面试，是的话才会显示面试时间的选择
    $("#is_apply_interview").click(function () {
        var check = $(this);
        if (check.is(':checked')) {
            $("#cu-interview-date").fadeIn(800);
        } else {
            $("#cu-interview-date").fadeOut(300);
        }
    });

    //下载报名表
    $("#cu-apply-download-btn").click(function () {
        window.location.href = '/theACP/open-resource/项目报名表.doc';
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