/**
 * Created by liuyang on 2016/11/26.
 */
$("#cu-interview-date").hide();
$("#cu-medical-history").hide();
var project_id_GET = getQueryString("project_id");

var tempNaPa;

$(document).ready(function () {

    var is_apply_interview = $("#is_apply_interview");
    var is_medical_history = $("#is_medical_history");

    //从数据库获取项目列表，如果有项目才可以报名，没有的话就无法报名
    $.ajax({
        url: "/controller/apply.getProject.con.php",
        success: function (data) {
            var result = JSON.parse(data);

            if (result.projectNum == 0) {
                $(".list-group").html(
                    '<div class="alert alert-danger">Ops! 暂未开通任何项目, 无法报名</div>'
                );

                $("#apply-form").find("button[type='submit']").addClass("disabled");
            } else {
                var html = "";

                for (var item in result.projectInfo) {
                    var id = result.projectInfo[item]['id'];
                    var name = result.projectInfo[item]['name'];

                    if (id == project_id_GET) {
                        html += '<li class="list-group-item">' +
                            '<lable class="cu-block mdl-radio mdl-js-radio mdl-js-ripple-effect" for="list-option-' + id + '">' +
                            '<input type="radio" checked="checked" id="list-option-' + id + '" class="mdl-radio__button" name="project" value="' + id + '">&nbsp;' + name +
                            '</lable>' +
                            '</li>';
                    } else {
                        html += '<li class="list-group-item">' +
                            '<lable class="cu-block mdl-radio mdl-js-radio mdl-js-ripple-effect" for="list-option-' + id + '">' +
                            '<input type="radio" id="list-option-' + id + '" class="mdl-radio__button" name="project" value="' + id + '">&nbsp;' + name +
                            '</lable>' +
                            '</li>';
                    }

                }

                $(".list-group").html(html);
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

        $name = $("#name").val();
        $phone_number = $("#phone_number").val();

        //开始验证表单内容格式是否合法
        var project = $("input[name=project]:checked").val();
        if (project == undefined) {
            showErrorInfo("没有选择项目，请检查", "你忘记选择项目了", $("#cu-project-fb"), $inputs);
            return false;
        }

        if ($name == "") {
            showErrorInfo("姓名没有填写，请检查", "不能为空", $("#cu-name-fb"), $inputs);
            return false;
        }

        if ($name.length > 20) {
            showErrorInfo("姓名太长了", "俄罗斯人的名字也没有这么长吧!", $("#cu-name-fb"), $inputs);
        }

        if ($("#nationality").val() == "") {
            showErrorInfo("国籍没有填写，请检查", "不能为空", $("#cu-nationality-fb"), $inputs);
            return false;
        }

        if ($phone_number == "") {
            showErrorInfo("电话号码没有填写，请检查", "不能为空", $("#cu-phone-number-fb"), $inputs);
            return false;
        }

        if ($phone_number.length < 6) {
            showErrorInfo("电话号码太短点吧", "不加区号的座机号都比你长", $("#cu-phone-number-fb"), $inputs);
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
        if ($("#duration").val() == "") {
            showErrorInfo("项目时长没有填写，请检查", "不能为空", $("#cu-duration-fb"), $inputs);
            return false;
        }
        if ($("#start_date").val() == "") {
            showErrorInfo("开始时间没有填写，请检查", "不能为空", $("#cu-start-date-fb"), $inputs);
            return false;
        }

        if (is_medical_history.is(':checked')) {
            if ($("#medical-history").val() == "") {
                showErrorInfo("历史重大疾病没有填写，请检查", "如果没有历史重大疾病，请取消上方勾选",
                    $("#cu-medical-history-fb"), $inputs);
                return false;
            }
        }

        if (is_apply_interview.is(':checked')) {
            if ($("#interview-date").val() == "") {
                showErrorInfo("面试时间没有填写，请检查", "如果不申请面试，请取消上方勾选",
                    $("#cu-interview-date-fb"), $inputs);
                return false;
            }
        }

        tempNaPa = $name + $phone_number;

        $.ajax({
            url: "/controller/register.con.php",
            type: "post",
            data: {username: tempNaPa, password: tempNaPa, password_confirm: tempNaPa},
            success: function (data) {
                var result = JSON.parse(data);

                if (result.status == CORRECT) {
                    $.ajax({
                        url: "/controller/apply.con.php",
                        type: "post",
                        data: serializedData,
                        success: function (data) {
                            var result = JSON.parse(data);

                            if (result.status != CORRECT) {
                                // 显示错误信息
                                $("#cu-submit-fb").attr("class", "cu-error-fb").html(
                                    "<span class='glyphicon glyphicon-remove'></span>&nbsp;" +
                                    "error code: " + result.status + "&nbsp;&nbsp;" + errorcode2errorinfo(result.status)
                                ).show();
                            } else {
                                $("#cu-submit-fb").attr("class", "cu-success-fb").html(
                                    "<span class='glyphicon glyphicon-ok'></span>&nbsp;报名成功..."
                                ).show();

                                setTimeout(function () {
                                    location.href = "apply.wechat.result.html?s=1&u=" + result.u;
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
                        }
                    });
                } else {
                    location.href = "apply.wechat.result.html?s=0";
                }
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
    $("#interview_date").blur(function () {
        if (is_apply_interview.is(':checked')) {
            checkEmpty($(this), $("#cu-interview-date-fb"));
        }
    });
    $("#medical_history").blur(function () {
        if (is_medical_history.is(':checked')) {
            checkEmpty($(this), $("#cu-medical-history-fb"));
        }
    });


    //验证表单是否为空，如果是空的话显示错误信息
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

    //是否有重大疾病，是的话才会显示重大疾病的填写文本框
    is_medical_history.click(function () {
        var check = $(this);
        if (check.is(':checked')) {
            $("#cu-medical-history").fadeIn(800);
        } else {
            $("#cu-medical-history").fadeOut(300);
        }
    });

    //是否申请面试，是的话才会显示面试时间的选择
    is_apply_interview.click(function () {
        var check = $(this);
        if (check.is(':checked')) {
            $("#cu-interview-date").fadeIn(800);
        } else {
            $("#cu-interview-date").fadeOut(300);
        }
    });

    //下载报名表
    $("#cu-apply-download-btn").click(function () {
        window.location.href = 'open-resource/apply.doc';
    });
});