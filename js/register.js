/**
 * Created by liuyang on 2016/10/21.
 */

$(".cu-error").hide();
$(".cu-correct").hide();
$(".alert-danger").hide();

$(document).ready(function () {
    // Bind to the submit event of our form
    $("#register-form").submit(function (event) {

        $(".cu-error").hide();
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

        //验证会员名
        if (!checkUsername($("#username").val())) {
            $inputs.prop("disabled", false);
            return false;
        }

        //验证密码
        if (!checkPassword($("#password").val())) {
            $inputs.prop("disabled", false);
            return false;
        }

        //验证密码确认
        if (!checkPasswordConfirm($("#password_confirm").val(), $("#password").val())) {
            $inputs.prop("disabled", false);
            return false;
        }


        // Fire off the request to /form.php
        $.ajax({
            url: "/theACP/controller/register.fun.php",
            type: "post",
            data: serializedData,
            success: function (data) {
                $(".alert-danger").html(data).fadeIn(800);
                setTimeout(function () {
                    $(".alert-danger").fadeOut(800)
                }, 2000);
            },
            error: function (request) {

            },
            complete: function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);
            }
        });

    });

    //失去焦点时判断 input 的合法性
    $("#username").blur(function () {
        checkUsername($(this).val());
    });
    $("#password").blur(function () {
        checkPassword($(this).val())
    });
    $("#password_confirm").blur(function () {
        checkPasswordConfirm($(this).val(), $("#password").val());
    });

    function checkUsername(username) {
        var pattern = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;

        if (username == "") {
            $("#username-error")
                .html("<span class='glyphicon glyphicon-exclamation-sign'></span>会员名不能为空")
                .fadeIn(800);
            $("#username-correct").hide();
            return false;
        } else if (username.length > 20) {
            $("#username-error")
                .html("<span class='glyphicon glyphicon-exclamation-sign'></span>会员名长度不能超过20个字符")
                .fadeIn(800);
            $("#username-correct").hide();
            return false;
        } else if (!pattern.test(username)) {
            $("#username-error")
                .html("<span class='glyphicon glyphicon-exclamation-sign'></span>会员名不能包括除下划线以外的特殊字符")
                .fadeIn(800);
            $("#username-correct").hide();
            return false;
        } else {
            $("#username-error").hide();
            $("#username-correct").fadeIn(800);
            return true;
        }
    }

    function checkPassword(password) {
        if (password == "") {
            $("#password-error")
                .html("<span class='glyphicon glyphicon-exclamation-sign'></span>密码不能为空")
                .fadeIn(800);
            $("#password-correct").hide();
            return false;
        } else if (password.length < 6) {
            $("#password-error")
                .html("<span class='glyphicon glyphicon-exclamation-sign'></span>密码不能少于6位")
                .fadeIn(800);
            $("#password-correct").hide();
            return false;
        } else {
            $("#password-error").hide();
            $("#password-correct").fadeIn(800);
            return true;
        }
    }

    function checkPasswordConfirm(password_confirm, password) {
        if (password_confirm == "") {
            $("#password-confirm-error")
                .html("<span class='glyphicon glyphicon-exclamation-sign'></span>密码确认不能为空")
                .fadeIn(800);
            $("#password-confirm-correct").hide();
            return false;
        } else if (password_confirm != password) {
            $("#password-confirm-error")
                .html("<span class='glyphicon glyphicon-exclamation-sign'></span>两次密码输入不一致")
                .fadeIn(800);
            $("#password-confirm-correct").hide();
            return false;
        } else {
            $("#password-confirm-error").hide();
            $("#password-confirm-correct").fadeIn(800);
            return true;
        }
    }
});