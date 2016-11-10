/**
 * Created by liuyang on 2016/10/30.
 */

$("li.dropdown").hide();
var itemsNumberPerPage = 3;
var pageNum = 1;
var currentPage = getQueryString("p");

if (currentPage == null || currentPage.toString().length < 1) {
    currentPage = 1;
}

$(document).ready(function () {
    //验证登录状态
    $.ajax({
        url: "/theACP/controller/check.login.php",
        success: function (data) {
            var result = JSON.parse(data);
            if (result.status == CORRECT) {

                $("li.dropdown").show();
            } else {
                $(".cu-nav li:eq(2)").after(
                    "<li>" +
                    "<a href='register.html'>注册</a>" +
                    "</li>" +
                    "<li>" +
                    "<a href='login.html'>登录</a>" +
                    "</li>"
                );
            }

            //获取项目列表并显示
            $.ajax({
                url: "/theACP/controller/project-list.con.php",
                type: "get",
                data: {currentPage: currentPage},
                success: function (data) {
                    var result = JSON.parse(data);
                    var projectNum = result.projectNum;

                    $("#p2").hide();

                    //设置分页
                    if (projectNum > 0)
                        pageNum = Math.ceil(projectNum / itemsNumberPerPage); //向上取整

                    if (currentPage == 1) {
                        $("ul.pagination li:first").attr("class", "disabled");
                    }

                    if (currentPage == pageNum) {
                        $("ul.pagination li:last").attr("class", "disabled");
                    }

                    for (var i = 1; i <= pageNum; i++) {

                        if (i == currentPage) {
                            $("ul.pagination li:eq(-2)").after(
                                "<li class='active' onclick='goPage(" + i + ")'><a>" + i + "</a></li>"
                            );
                        } else {
                            $("ul.pagination li:eq(-2)").after(
                                "<li onclick='goPage(" + i + ")'><a>" + i + "</a></li>"
                            );
                        }

                    }

                    //显示项目内容列表
                    if (projectNum == 0) {
                        $("#cu-project-notification").html("暂时没有项目");
                    } else {
                        $("#cu-project-notification").hide();
                        for (var item in result.projects) {

                            var id = result.projects[item + ""]['id'];
                            var name = result.projects[item + ""]['name'];
                            var image_file = result.projects[item + ""]['imageFile'];
                            var pic_src = getProjectFirstPic(result.projects[item + ""]['picture']);
                            var push_date = result.projects[item + ""]['push_date']
                            var bright = result.projects[item + ""]['bright'];

                            $("#cu-blog-container").find(".blog:last").after(
                                "<div class='blog'>" +
                                "<div class='blog-item mdl-shadow--2dp'>" +
                                "<img class='img-responsive img-blog' src='/theACP/images/" + image_file + "/" + pic_src + "' alt=''/>" +
                                "<div class='blog-content'>" +
                                "<a href='project-item.html?project_id=" + id + "'>" +
                                "<h3>" + name + "</h3>" +
                                "</a>" +
                                "<div class='entry-meta'>" +
                                "<span>" +
                                "<i class='icon-calendar'>&nbsp;&nbsp;" + push_date + "</i>" +
                                "</span>" +
                                "</div>" +
                                "<p>" + bright + "</p>" +
                                "<button class='mdl-button mdl-js-button mdl-js-ripple-effect'>" +
                                "<a href='project-item.html?project_id=" + id + "'>" +
                                "查看全部" +
                                "</a>" +
                                "</button>" +
                                "</div>" +
                                "</div>" +
                                "</div>"
                            );
                        }
                    }

                }
            });
        }
    });

    //退出登录
    $("#cu-logout").click(function () {
        $.ajax({
            url: "/theACP/controller/logout.con.php",
            success: function (data) {
                if (data == CORRECT) {
                    location.href = "/theACP/project-list.html";
                }
            }
        })
    });

    $("#cu-link-to-about-btn").click(function () {
        location.href = "/theACP/about-us.html";
    })

});

function goPage(page) {
    location.href = "/theACP/project-list.html?p=" + page;
}

function prevPage() {
    var page = Math.max(currentPage - 1, 1);
    location.href = "/theACP/project-list.html?p=" + page;
}

function nextPage() {
    var page = Math.min(pageNum, currentPage + 1);
    location.href = "/theACP/project-list.html?p=" + page;
}