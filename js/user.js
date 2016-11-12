/**
 * Created by liuyang on 2016/10/23.
 */

$("#cu-empty-state").hide();
$("#cu-applies-form").hide();

$("#cu-new-password").hide();
$("#cu-confirm-new-password").hide();
$("#cu-update-user-info-form").parent().hide();
$("#cu-cancel-update-user-info").hide();
$("#submit-update-form").hide();

$(document).ready(function () {
    //验证登录状态
    $.ajax({
        url: "/theACP/controller/check.login.php",
        success: function (data) {
            var result = JSON.parse(data);

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
                $("#cu-applies-loading").fadeOut(500);
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
                                $("#cu-empty-state").fadeIn(800);
                            } else {
                                $("#cu-applies-form").show();
                                var html = '';
                                for (var item in result.apply_info) {

                                    var id = result.apply_info[item + ""]['id'];
                                    var project_name = result.apply_info[item + ""]['project_name'];
                                    var status = result.apply_info[item + ""]['status'];
                                    var time = result.apply_info[item + ""]['apply_time'];

                                    html += '<li class="mdl-list__item">' +
                                        '<span class="mdl-list__item-action">' +
                                        '<label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-' + id + '">' +
                                        '<input type="checkbox" id="list-checkbox-' + id + '" name="list-checkbox-' + id + '" class="mdl-checkbox__input"/>' +
                                        '</label>' +
                                        '</span>' +
                                        '<span class="mdl-list__item-primary-content">' + project_name + '</span>' +
                                        '<span class="mdl-list__item-secondary-content">' + time + '</span>' +
                                        '<span class="mdl-list__item-secondary-info">' + status + '</span>' +
                                        '</li>';
                                }
                                $("#cu-applies-list").html(html).fadeIn(800);
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
                if (data == CORRECT) {
                    location.href = "/theACP/login.html";
                }
            }
        })
    });

    //是否修改密码，如果是那么就显示新密码和确认新密码输入框
    $("#is_change_password").click(function () {
        var check = $(this);
        if (check.is(':checked')) {
            $("#cu-new-password").fadeIn(800);
            $("#cu-confirm-new-password").fadeIn(800);
        } else {
            $("#cu-new-password").fadeOut(300);
            $("#cu-confirm-new-password").fadeOut(300);
        }
    });

    //点击后显示修改个人信息的表单
    $("#display-update-form").click(function () {
        $("#cu-update-user-info-form").parent().fadeIn(800);
        $("#cu-cancel-update-user-info").fadeIn(800);
        $("#display-update-form").hide();
        $("#submit-update-form").show();
    });

    //取消后隐藏修改个人信息的表单，并重新显示修改资料按钮
    $("#cu-cancel-update-user-info").click(function () {
        cancelUpdate();
    });

    //提交修改个人信息的表单
    $("#submit-update-form").click(function () {

        var form = $("#cu-update-user-info-form");
        var inputs = form.find("input, select, button, textarea");
        var serializedData = form.serialize();

        //检测密码
        if (!checkPwd($("#password"), $("#cu-password-fb"))) {
            inputs.prop("disabled", false);
            return false;
        }

        //检测姓名
        if (!checkName($("#name"), $("#cu-name-fb"))) {
            inputs.prop("disabled", false);
            return false;
        }

        //如果需要修改密码，还要验证新密码和新密码确认
        if ($("#is_change_password").is(':checked')) {
            var newPwd = $("#new_password");
            var newPwdConfirm = $("#confirm_new_password");

            if (!checkPwd(newPwd, $("#cu-new-password-fb"))) {
                inputs.prop("disabled", false);
                return false;
            }

            if (!checkConfirmPwd(newPwd, newPwdConfirm, $("#cu-confirm-new-password-fb"))) {
                inputs.prop("disabled", false);
                return false;
            }
        }

        $.ajax({
            url: "/theACP/controller/user.update.con.php",
            type: "post",
            data: serializedData,
            success: function (data) {
                cancelUpdate();
                var result = JSON.parse(data);
                if (result.status != CORRECT) {
                    $("#cu-update-fb").removeClass("label-success").addClass("label-danger")
                        .html(errorcode2errorinfo(result.status) + ", 修改失败").show();
                    setTimeout(function () {
                        $("#cu-update-fb").fadeOut(300);
                    }, 1700);
                } else {
                    //更新会员的姓名
                    $("#username").html(result.name);
                    $("#cu-update-fb").addClass("label-success").removeClass("label-danger")
                        .html("信息已修改").fadeIn(500);
                    setTimeout(function () {
                        $("#cu-update-fb").fadeOut(300);
                    }, 1700);
                }
            }
        })
    });

});

function cancelUpdate() {
    $("#cu-update-user-info-form").parent().fadeOut(300);
    $("#cu-cancel-update-user-info").fadeOut(300);
    $("#display-update-form").show();
    $("#submit-update-form").hide();
}

//检测姓名
function checkName(tar, fb) {
    if (tar.val() == "") {
        tar.parent("div").removeClass("has-success").addClass("has-error");
        fb.attr("class", "cu-error-fb").html(
            "<span class='glyphicon glyphicon-remove'></span>&nbsp;不能为空"
        ).fadeIn(800);
        return false;
    } else if (tar.val().length > 20) {
        tar.parent("div").removeClass("has-success").addClass("has-error");
        fb.attr("class", "cu-error-fb").html(
            "<span class='glyphicon glyphicon-remove'></span>&nbsp;长度不能超过20个字符"
        ).fadeIn(800);
        return false;
    } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(tar.val())) {
        tar.parent("div").removeClass("has-success").addClass("has-error");
        fb.attr("class", "cu-error-fb").html(
            "<span class='glyphicon glyphicon-remove'></span>&nbsp;不能包括除下划线以外的特殊字符"
        ).fadeIn(800);
        return false;
    } else {
        tar.parent("div").removeClass("has-error").addClass("has-success");
        fb.attr("class", "cu-success-fb").html("").fadeIn(800);
        return true;
    }
}

//检测密码
function checkPwd(tar, fb) {
    if (tar.val() == "") {
        tar.parent("div").removeClass("has-success").addClass("has-error");
        fb.attr("class", "cu-error-fb").html(
            "<span class='glyphicon glyphicon-remove'></span>&nbsp;不能为空"
        ).fadeIn(800);
        return false;
    } else if (tar.val().length < 6) {
        tar.parent("div").removeClass("has-success").addClass("has-error");
        fb.attr("class", "cu-error-fb").html(
            "<span class='glyphicon glyphicon-remove'></span>&nbsp;不能少于6位"
        ).fadeIn(800);
        return false;
    } else {
        tar.parent("div").removeClass("has-error").addClass("has-success");
        fb.attr("class", "cu-success-fb").html("").fadeIn(800);
        return true;
    }
}

//检测确认密码
function checkConfirmPwd(tar1, tar2, fb2) {
    if (tar1.val() != tar2.val()) {
        tar2.parent("div").removeClass("has-success").addClass("has-error");
        fb2.attr("class", "cu-error-fb").html(
            "<span class='glyphicon glyphicon-remove'></span>&nbsp;两次输入不一致"
        ).fadeIn(800);
        return false;
    } else {
        tar2.parent("div").removeClass("has-error").addClass("has-success");
        fb2.attr("class", "cu-success-fb").html("").fadeIn(800);
        return true;
    }
}

//失去焦点时判断inputs合法性
$("#name").blur(function () {
    checkName($(this), $("#cu-name-fb"));
});

$("#password").blur(function () {
    checkPwd($(this), $("#cu-password-fb"));
});

$("#new_password").blur(function () {
    checkPwd($(this), $("#cu-new-password-fb"));
});

$("#confirm_new_password").blur(function () {
    checkConfirmPwd($("#new_password"), $(this), $("#cu-confirm-new-password-fb"));
});