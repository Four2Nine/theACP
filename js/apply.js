/**
 * Created by liuyang on 2016/10/25.
 */

$("#cu-interview-date").hide();

$(document).ready(function () {

    //验证登录状态
    $.ajax({
        url: "/theACP/controller/check.login.php",
        success: function (data) {
            var result = JSON.parse(data);

            $("#p2").hide();
            if (result.status != CORRECT) {
                // 显示错误信息
                $("#cu-apply-notification").html(
                    "error code: " + result.status + '<br>' + errorcode2errorinfo(result.status) +
                    ", 正在跳转至登录页面..."
                );
                setTimeout(function () {
                    location.href = "/theACP/login.html";
                }, 1200);
            } else {
                $("#cu-apply-notification").hide();
            }
        }
    });

    //提交报名表单
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

        //开始验证表单内容格式是否合法
        var project = $("input[name=project]:checked").val();
        if (project == undefined) {
            showErrorInfo("没有选择项目，请检查", "你忘记选择项目了", $("#cu-project-fb"), $inputs);
            return false;
        }

        if ($("#name").val() == "") {
            showErrorInfo("姓名没有填写，请检查", "不能为空", $("#cu-name-fb"), $inputs);
            return false;
        }

        if ($("#nationality").val() == "") {
            showErrorInfo("国籍没有填写，请检查", "不能为空", $("#cu-nationality-fb"), $inputs);
            return false;
        }

        if ($("#phone_number").val() == "") {
            showErrorInfo("电话号码没有填写，请检查", "不能为空", $("#cu-phone-number-fb"), $inputs);
            return false;
        }

        if ($("#email").val() == "") {
            showErrorInfo("邮箱没有填写，请检查", "不能为空", $("#cu-email-fb"), $inputs);
            return false;
        }
        if ($("#wechat").val() == "") {
            showErrorInfo("微信号没有填写，请检查", "不能为空", $("#cu-wechat-fb"), $inputs);
            return false;
        }
        if ($("#id_card_number").val() == "") {
            showErrorInfo("身份证号没有填写，请检查", "不能为空", $("#cu-id-card-number-fb"), $inputs);
            return false;
        }
        if ($("#passport_number").val() == "") {
            showErrorInfo("护照号没有填写，请检查", "不能为空", $("#cu-passport-number-fb"), $inputs);
            return false;
        }
        if ($("#province").val() == "") {
            showErrorInfo("现居省份没有填写，请检查", "不能为空", $("#cu-province-fb"), $inputs);
            return false;
        }
        if ($("#post_address").val() == "") {
            showErrorInfo("邮寄地址没有填写，请检查", "不能为空", $("#cu-post-address-fb"), $inputs);
            return false;
        }
        if ($("#city_of_departure").val() == "") {
            showErrorInfo("出发城市没有填写，请检查", "不能为空", $("#cu-city-of-departure-fb"), $inputs);
            return false;
        }
        if ($("#emergency_contact_name").val() == "") {
            showErrorInfo("紧急联系人没有填写，请检查", "不能为空", $("#cu-emergency-contact-name-fb"), $inputs);
            return false;
        }
        if ($("#emergency_contact_phone_number").val() == "") {
            showErrorInfo("紧急联系人电话没有填写，请检查", "不能为空", $("#cu-emergency-contact-phone-number-fb"),
                $inputs);
            return false;
        }

        $.ajax({
            url: "/theACP/controller/apply.con.php",
            type: "post",
            data: serializedData,
            success: function (data) {
                //var result = JSON.parse(data);
            },
            error: function (request) {

            },
            complete: function () {
                // Reenable the inputs
                $inputs.prop("disabled", false);
            }
        });
    });

    //点击提交时判断input的合法性
    function showErrorInfo(info1, info2, fb, inputs) {
        $("#cu-submit-fb").attr("class", "cu-error-fb").html(
            "<span class='glyphicon glyphicon-remove'></span>&nbsp;" + info1
        ).show();
        fb.attr("class", "cu-error-fb").html(
            "<span class='glyphicon glyphicon-remove'></span>&nbsp;" + info2
        ).fadeIn(800);
        inputs.prop("disabled", false);
    }


    //失去焦点时判断 input 的合法性
    $("#name").blur(function () {
        checkEmpty($(this), $("#cu-name-fb"));
    });
    $("#nationality").blur(function () {
        checkEmpty($(this), $("#cu-nationality-fb"));
    });
    $("#phone_number").blur(function () {
        checkEmpty($(this), $("#cu-phone-number-fb"));
    });
    $("#email").blur(function () {
        checkEmpty($(this), $("#cu-email-fb"));
    });
    $("#wechat").blur(function () {
        checkEmpty($(this), $("#cu-wechat-fb"));
    });
    $("#id_card_number").blur(function () {
        checkEmpty($(this), $("#cu-id-card-number-fb"));
    });
    $("#passport_number").blur(function () {
        checkEmpty($(this), $("#cu-passport-number-fb"));
    });
    $("#province").blur(function () {
        checkEmpty($(this), $("#cu-province-fb"));
    });
    $("#post_address").blur(function () {
        checkEmpty($(this), $("#cu-post-address-fb"));
    });
    $("#city_of_departure").blur(function () {
        checkEmpty($(this), $("#cu-city-of-departure-fb"));
    });
    $("#emergency_contact_name").blur(function () {
        checkEmpty($(this), $("#cu-emergency-contact-name-fb"));
    });
    $("#emergency_contact_phone_number").blur(function () {
        checkEmpty($(this), $("#cu-emergency-contact-phone-number-fb"));
    });
    $("#duration").blur(function () {
        checkEmpty($(this), $("#cu-duration-fb"));
    });
    $("#start_date").blur(function () {
        checkEmpty($(this), $("#cu-start-date-fb"));
    });
    $("#diet_requirement").blur(function () {
        checkEmpty($(this), $("#cu-diet-requirement-fb"));
    });

    function checkEmpty(tar, fb) {
        if (tar.val() == "") {
            tar.parent("div").removeClass("has-success").addClass("has-error");
            fb.attr("class", "cu-error-fb").html(
                "<span class='glyphicon glyphicon-remove'></span>&nbsp;不能为空"
            ).fadeIn(800);
        } else {
            tar.parent("div").removeClass("has-error").addClass("has-success");
            fb.attr("class", "cu-success-fb").html("").fadeIn(800);
        }
    }

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