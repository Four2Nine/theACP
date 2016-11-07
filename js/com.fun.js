/**
 * Created by liuyang on 2016/10/22.
 */

/**
 * 检测用户名格式是否正确
 * @param tar 用户名输入框 $("#username")
 * @param fb    错误信息提示框 $("#cu-username-fb")
 */
function checkUsername(tar, fb) {
    var username = tar.val();
    var pattern = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;

    if (username == "") {
        tar.parent("div").removeClass("has-success").addClass("has-error");
        fb.attr("class", "cu-error-fb").html(
            "<span class='glyphicon glyphicon-remove'></span>&nbsp;不能为空"
        ).fadeIn(800);
        return false;
    } else if (username.length > 20) {
        tar.parent("div").removeClass("has-success").addClass("has-error");
        fb.attr("class", "cu-error-fb").html(
            "<span class='glyphicon glyphicon-remove'></span>&nbsp;不能超过20个字符"
        ).fadeIn(800);
        return false;
    } else if (!pattern.test(username)) {
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

/**
 * 检测密码格式是否正确
 * @param tar 密码输入框 $("#password")
 * @param fb    错误信息提示框 $("#cu-password-fb")
 */
function checkPassword(tar, fb) {
    var password = tar.val();

    if (password == "") {
        tar.parent("div").removeClass("has-success").addClass("has-error");
        fb.attr("class", "cu-error-fb").html(
            "<span class='glyphicon glyphicon-remove'></span>&nbsp;不能为空"
        ).fadeIn(800);
        return false;
    } else if (password.length < 6) {
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

/**
 * 检测密码确认格式是否正确
 * @param tar1      密码输入框 $("#password")
 * @param tar2      密码确认输入框 $("#password_confirm")
 * @param fb2       $("#cu-confirm-password-fb")
 * @returns {boolean} 返回是否正确
 */
function checkPasswordConfirm(tar1, tar2, fb2) {
    var password = tar1.val();
    var passwordConfirm = tar2.val();

    if (passwordConfirm == "") {
        tar2.parent("div").removeClass("has-success").addClass("has-error");
        fb2.attr("class", "cu-error-fb").html(
            "<span class='glyphicon glyphicon-remove'></span>&nbsp;不能为空"
        ).fadeIn(800);
        return false;
    } else if (passwordConfirm != password) {
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

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function getProjectFirstPic(string) {
    return string.toString().split("@")[0];
}