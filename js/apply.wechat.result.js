/**
 * Created by liuyang on 2016/11/26.
 */

var $s = getQueryString("s");
var $u = getQueryString("u");

if ($s == "1") {
    $("#result").html("恭喜！报名成功！");
    $("#cu-Na").html($u);
    $("#cu-Pa").html($u);
} else {
    $("#result").html("Ops！报名失败了！");
    $(".mdl-card__actions").hide();
}