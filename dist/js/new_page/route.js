//获取routeinfo cluster_name_list
function get_router_cluster_name_list(url, data) {
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        async: false,
        type: "post",
        contentType: "application/json",
        // head: {
        //     "X-CSRFToken": getCookie("csrftoken")
        // },
        success: function (e) {
            if (e.status != 0 || e.status != "0") {
                var $router_cluster_name_list = $(".route_cluster_name_list");
                $router_cluster_name_list.empty();
                $router_cluster_name_list.append("<option value='0'>请选择集群</option>");
                var response_data = e.value.cluster_name_list;
                for (var i = 0; i < response_data.length; i++) {
                    if (i == 0) {
                        $router_cluster_name_list.append("<option selected='selected'>" + response_data[i] + "</option>");
                    } else {
                        $router_cluster_name_list.append("<option>" + response_data[i] + "</option>");
                    }
                }
            } else {
                swal("获取集群列表错误" + "error: " + e.err, "获取集群列表错误", "error");

            }

        },
        error: function (e) {
            swal("获取集群列表错误", "获取集群列表错误,服务器错误", "error");

        }
    });
}
var router_cluster_name_list_url = "getrouteclusternamelist";
var router_cluster_name_list_data = {"cluster_name": ""};
get_router_cluster_name_list(router_cluster_name_list_url, router_cluster_name_list_data);

//route change cluster_name
$(".route_cluster_name_list").change(function () {
    var routeinfo_url = "routeinfo";
    var current_route_cluster_name = $(".route_cluster_name_list").val();
    var routeinfo_data = {"cluster_name": current_route_cluster_name};
    get_routeinfo(routeinfo_url, routeinfo_data);

});

//routeinfo
$('.slider').slider({tooltip: 'always',tooltip_position:'bottom'});
function get_routeinfo(url, data) {
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        async: false,
        type: "post",
        contentType: "application/json",
        success: function (e) {
            if(e.status == 3 || e.status == "3"){
                var route_data = e.value.route;
                var $add_write_card = $(".add_write_card");
                var $add_route_read_tb = $(".add_route_read_tb");
                $add_write_card.empty();
                $add_route_read_tb.empty();
                for(var i = 0; i<route_data.length; i++){
                    var write_tmp = "";
                    var read_tmp = "";
                    var read_count = route_data[i]["read"].length;
                    write_tmp = "<div class=\"box custom_border_top\">\n" +
                        "                                                <div class=\"box-header\" style=\"background: #ddd\">\n" +
                        "                                                    <h4 class=\"box-title\">Write</h4>\n" +
                        "                                                </div>\n" +
                        "\n" +
                        "                                                <div class=\"box-footer no-padding monitor_status\">\n" +
                        "                                                    <ul class=\"nav nav-pills nav-stacked\">\n" +
                        "                                                        <li><a>IP <span\n" +
                        "                                                                class=\"pull-right\"\n" +
                        "                                                                style=\"margin-right: 150px;\">"+ route_data[i]["write"]["host"] +"</span></a>\n" +
                        "                                                        </li>\n" +
                        "                                                        <li><a>Role <span\n" +
                        "                                                                class=\"pull-right label label-primary\"\n" +
                        "                                                                style=\"margin-right: 150px;\">Write</span></a>\n" +
                        "                                                        </li>\n" +
                        "                                                        <li><a>Port <span class=\"pull-right\"\n" +
                        "                                                                          style=\"margin-right: 150px;\">"+ route_data[i]["write"]["port"] +"</span></a>\n" +
                        "                                                        </li>\n" +
                        "                                                        <li>\n" +
                        "                                                            <a>Write Count <span class=\"pull-right\" style=\"margin-right: 150px;\">1</span></a>\n" +
                        "                                                        </li>\n" +
                        "                                                        <li>\n" +
                        "                                                            <a>Read Count <span class=\"pull-right\" style=\"margin-right: 150px;\">"+ read_count +"</span></a>\n" +
                        "                                                        </li>\n" +
                        "\n" +
                        "                                                    </ul>\n" +
                        "                                                </div>\n" +
                        "                                                <!-- /.footer -->\n" +
                        "                                            </div>";

                    $add_write_card.append(write_tmp);
                    for(var j = 0; j< read_count; j++){
                        var read_seq = j + 1;
                        read_tmp += " <div class=\"box custom_border_top\" >\n" +
                            "                                                <table class=\"table no-padding dataTable\"\n" +
                            "                                                       style=\"word-break:break-all;font-size: 13px;\">\n" +
                            "                                                    <thead style=\"background: #ddd\">\n" +
                            "                                                    <tr>\n" +
                            "                                                        <th>序号</th>\n" +
                            "                                                        <th>IP</th>\n" +
                            "                                                        <th>Role</th>\n" +
                            "                                                        <th>Port</th>\n" +
                            "                                                    </tr>\n" +
                            "                                                    </thead>\n" +
                            "                                                    <tbody>\n" +
                            "                                                        <tr role=\"row\">\n" +
                            "                                                            <td>1</td>\n" +
                            "                                                            <td>"+ route_data[i]["read"][j]["host"] +"</td>\n" +
                            "                                                            <td><span class='label label-default'>Read</span></td>\n" +
                            "                                                            <td>"+ route_data[i]["read"][j]["port"]  +"</td>\n" +
                            "                                                        </tr>\n" +
                            "                                                    </tbody>\n" +
                            "                                                </table>\n" +
                            "                                            </div>";
                    }

                    if(read_count == 0){
                        read_tmp += " <div class=\"box custom_border_top\" >\n" +
                            "                                                <table class=\"table no-padding dataTable\"\n" +
                            "                                                       style=\"word-break:break-all;font-size: 13px;\">\n" +
                            "                                                    <thead style=\"background: #ddd\">\n" +
                            "                                                    <tr>\n" +
                            "                                                        <th>序号</th>\n" +
                            "                                                        <th>IP</th>\n" +
                            "                                                        <th>Role</th>\n" +
                            "                                                        <th>Port</th>\n" +
                            "                                                    </tr>\n" +
                            "                                                    </thead>\n" +
                            "                                                    <tbody>\n" +
                            "                                                        <tr role=\"row\">\n" +
                            "                                                            <td>no data...</td>\n" +
                            "                                                        </tr>\n" +
                            "                                                    </tbody>\n" +
                            "                                                </table>\n" +
                            "                                            </div>";
                    }
                    $add_route_read_tb.append(read_tmp);
                }
            }else{
                swal("获取routeinfo失败" + "error: " + e.err, "获取routeinfo失败", "error");
            }

        },
        error:function (e) {
            swal("获取routeinfo失败，服务器错误", "获取routeinfo失败,服务器错误", "error");
        }

    })
}
var routeinfo_url = "routeinfo";
var current_route_cluster_name = $(".route_cluster_name_list").val();
var routeinfo_data = {"cluster_name": current_route_cluster_name};
get_routeinfo(routeinfo_url, routeinfo_data);