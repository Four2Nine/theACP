/**
 * Created by liuyang on 2016/10/21.
 */
$(".cu-default-fb").hide();
$(document).ready(function () {
    // Bind to the submit event of our form
    $("#register-form").submit(function (event) {

        var $registerBtn = $("#cu-register-btn").button('loading');

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
        var confirmPassword = $("#password_confirm");

        //验证会员名
        if (!checkUsername(username, $("#cu-username-fb"))) {
            $inputs.prop("disabled", false);
            return false;
        }

        //验证密码
        if (!checkPassword(password, $("#cu-password-fb"))) {
            $inputs.prop("disabled", false);
            return false;
        }

        //验证密码确认
        if (!checkPasswordConfirm(password, confirmPassword, $("#cu-confirm-password-fb"))) {
            $inputs.prop("disabled", false);
            return false;
        }


        // Fire off the request to /form.php
        $.ajax({
            url: "/theACP/controller/register.con.php",
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
                        "<span class='glyphicon glyphicon-ok'></span>&nbsp;注册成功，正在自动登录..."
                    ).show();
                    setTimeout(function () {
                        location.href = "/theACP/user.html";
                    }, 1200);
                }

                setTimeout(function () {
                    $("#cu-submit-fb").fadeOut(800);
                }, 2000);
            },
            error: function (request) {

            },
            complete: function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);
                $registerBtn.button('reset')
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
    $("#password_confirm").blur(function () {
        checkPasswordConfirm($("#password"), $(this), $("#cu-confirm-password-fb"));
    });

});