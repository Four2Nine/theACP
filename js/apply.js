/**
 * Created by liuyang on 2016/10/25.
 */

$("#cu-interview-date").hide();

$(document).ready(function () {

    //是否申请面试，是的话才会显示面试时间的选择
    $("#is_apply_interview").click(function () {
        var check = $(this);
        if (check.is(':checked')) {
            $("#cu-interview-date").fadeIn(800);
        } else {
            $("#cu-interview-date").fadeOut(300);
        }
    });
});