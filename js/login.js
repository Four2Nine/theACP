/**
 * Created by liuyang on 2016/10/22.
 */

$(".cu-default-fb").hide();

$(document).ready(function () {
    $("#login-form").submit(function (event) {
        $(".cu-default-fb").hide();
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

        var username = $("#username");
        var password = $("#password");

        if (!checkUsername(username, $("#cu-username-fb"))) {
            $inputs.prop("disabled", false);
            return false;
        }

        //验证密码
        if (!checkPassword(password, $("#cu-password-fb"))) {
            $inputs.prop("disabled", false);
            return false;
        }

        $.ajax({
            url: "/theACP/controller/login.con.php",
            type: "post",
            data: serializedData,
            success: function (data) {

                var result = JSON.parse(data);

                if (result.status != CORRECT) {
                    $("#cu-submit-fb").attr("class", "cu-error-fb").html(
                        "<span class='glyphicon glyphicon-remove'></span>&nbsp;" +
                        "error code: " + result.status + "&nbsp;&nbsp;" + errorcode2errorinfo(result.status)
                    ).show();
                } else {
                    $("#cu-submit-fb").attr("class", "cu-success-fb").html(
                        "<span class='glyphicon glyphicon-ok'></span>&nbsp;登录成功，正在跳转..."
                    ).show();
                    setTimeout(function () {
                        location.href = "/theACP/user.html";
                    }, 1200);
                }

                setTimeout(function () {
                    $(".cu-notification").fadeOut(800);
                }, 2000);
            },
            error: function (request) {

            },
            complete: function (data) {
                // Reenable the inputs
                $inputs.prop("disabled", false);
            }
        });

    });

    //失去焦点时判断 input 的合法性
    $("#username").blur(function () {
        var fb = $("#cu-username-fb");
        fb.attr("class", "cu-success-fb").html("").fadeIn(800);
        checkUsername($(this), fb);
    });
    $("#password").blur(function () {
        checkPassword($(this), $("#cu-password-fb"))
    });
});