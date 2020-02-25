
//获取cluster_name_list
function get_cluster_name_list(url, data) {
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
            if (e.status == 3 || e.status == "3") {
                var $cluster_name_list = $(".cluster_name_list");
                $cluster_name_list.empty();
                $cluster_name_list.append("<option value='0'>请选择集群</option>");
                var response_data = e.value.cluster_name_list;
                for (var i = 0; i < response_data.length; i++) {
                    if (i == 0) {
                        $cluster_name_list.append("<option selected='selected'>" + response_data[i] + "</option>");
                    } else {
                        $cluster_name_list.append("<option>" + response_data[i] + "</option>");
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
//var get_cluster_list_url = "./test/cluster_list.json";
var get_cluster_list_url = "getclusternamelist";
var get_cluster_list_data = {};
get_cluster_name_list(get_cluster_list_url, get_cluster_list_data);

//获取dbha数据
var cluster_name = $(".cluster_name_list").val();
var get_dbha_data_url = "getdbhadata";
//var get_dbha_data_url = "./test/dbha.json";
var get_dbha_data_data = JSON.stringify({"cluster_name": cluster_name});
//var get_dbha_data_data = {"cluster_name": cluster_name};
var dbha_tb_obj = $('#dbha_tb').DataTable({
    destroy: true,
    "dom": 't',
    "serverSide": false,
    "ajax": {
        //"url": get_dbha_data_url,
        type: "post",
        //dataType : "json",
        async: false,
        contentType : "application/json",
        data:  function ( d ) {
            return get_dbha_data_data;
        },
        url: get_dbha_data_url,
        dataSrc: "value.nodes_info"
    },


    columns: [
        {
            data: null,
            className: 'text-center whiteSpace',
            render: function (data, type, row, meta) {

                return "<div class=\"dropdown\">\n" +
                    "  <button class=\"btn btn-default dropdown-toggle\" type=\"button\" style='color: rgb(33,33,33)' id=\"dropdownMenu\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"true\">\n" +
                    '<i class="fa fa-bars"></i>\n' +
                    "  </button>\n" +
                    "  <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu\" style='left: -2px;top: -4px;'>\n" +
                    "    <li><a style='color: rgb(33,33,33)' class='edit_node' data-toggle=\"modal\" data-target=\"#modal_edit_node\" title='编辑' cluster_name="+ row.cluster_name +" host="+ row.host +" dbport="+ row.dbport +" role="+ row.role +" online="+ row.online +"><i class='btn btn-default btn-xs fa fa-pencil-square-o'></i>编辑</a></li>\n" +
                    "    <li><a style='color: rgb(33,33,33)' class='maintain_node'  title='维护' maintain_status="+ row.maintain +" host="+ row.host +"><i class='btn btn-default btn-xs fa fa-wrench'></i>维护</a></li>\n" +
                    "    <li><a style='color: rgb(33,33,33)' class='master_slave_switch'  title='主从切换' host="+ row.host +"><i class='btn btn-default btn-xs fa fa-exchange'></i>主从切换</a></li>\n" +
                    "    <li><a style='color: rgb(33,33,33)' class='monitor_config_node'  title='监控配置' host="+ row.host +" data-toggle=\"modal\" data-target=\"#modal_node_monitor_config\"><i class='btn btn-default btn-xs fa fa-cogs'></i>监控设置</a></li>\n" +
                    "    <li><a style='color: rgb(33,33,33)' class='delete_node'  title='删除' host="+ row.host +"><i class='btn btn-default btn-xs fa fa-trash'></i>删除</a></li>\n" +
                    "  </ul>\n" +
                    "</div>"


            }
        },
        {
            data: "role",
            render: function (data, type, full, row) {
                if(full.maintain == true || full.maintain == "true"){
                    return "<span class=\"label label-warning\" aria-hidden=\"true\">maintain</span>"
                }else{
                    if (data == "master") {
                        return "<span class=\"label label-primary\" aria-hidden=\"true\">master</span>"
                    } else {
                        return "<span class=\"label label-default\" aria-hidden=\"true\">slave</span>"
                    }
                }


            }

        },
        {data: "executed_gtid_set"},
        {
            data: "host",
        },
        // {data: "cluster_name"},
        {data: "dbport"},
        {
            data: "online",
            render: function (data, type, full, row) {
                if (data == "true" || data == true) {
                    return "<i class=\"fa fa-check-circle text-success\" aria-hidden=\"true\"></i>"
                } else {
                    return "<i class=\"fa fa-times-circle text-danger\" aria-hidden=\"true\"></i>"
                }
            }
        },
        {
            data: "sql_thread",
            render: function (data, type, full, row) {
                if (data == "true" || data == true) {
                    return "<i class=\"fa fa-check-circle text-success\" aria-hidden=\"true\"></i>"
                } else {
                    return "<i class=\"fa fa-times-circle text-danger\" aria-hidden=\"true\"></i>"
                }
            }
        },
        {
            data: "io_thread",
            render: function (data, type, full, row) {
                if (data == "true" || data == true) {
                    return "<i class=\"fa fa-check-circle text-success\" aria-hidden=\"true\"></i>"
                } else {
                    return "<i class=\"fa fa-times-circle text-danger\" aria-hidden=\"true\"></i>"
                }
            }
        },
        {
            data: "read_only",
            render: function (data, type, full, row) {
                if (data == "true" || data == true) {
                    return "<i class=\"fa fa-check-circle text-success\" aria-hidden=\"true\"></i>"
                } else {
                    return "<i class=\"fa fa-times-circle text-danger\" aria-hidden=\"true\"></i>"
                }
            }
        },

    ],
    ordering: false
});

//获取监控信息
function get_monitor_info(url, data) {
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        async: false,
        type: "post",
        contentType: "application/json",
        success: function (e) {
            if (e.status == 3 || e.status == "3") {
                var monitor_status_len = Object.keys(e.value.monitor_status).length;
                var cluster_info_len = Object.keys(e.value.cluster_info).length;
                var switch_info_len = Object.keys(e.value.switch_info).length;
                if(monitor_status_len == 0 || cluster_info_len == 0 || switch_info_len == 0){
                    $(".dbha_tb_list .row").hide()
                }else{
                    $(".dbha_tb_list .row").show();
                }
                var manager_status = e.value.monitor_status.manager_status;
                var $monitor_status = $(".monitor_status ul li span");
                if (manager_status == true || manager_status == "true") {
                    $monitor_status.eq(0).removeClass("label-success");
                    $monitor_status.eq(0).removeClass("label-danger");
                    $monitor_status.eq(0).addClass("label-success");
                    $monitor_status.eq(0).text("ACTIVE");
                } else {
                    $monitor_status.eq(0).removeClass("label-success");
                    $monitor_status.eq(0).removeClass("label-danger");
                    $monitor_status.eq(0).addClass("label-danger");
                    $monitor_status.eq(0).text("INACTIVE");
                }

                var cluster_state = e.value.cluster_info.cluster_state;
                var difference_data = e.value.cluster_info.difference_data;
                var $cluster_info = $(".cluster_info ul li span");
                if (cluster_state == true || cluster_state == "true") {
                    $cluster_info.eq(1).removeClass("label-success");
                    $cluster_info.eq(1).removeClass("label-danger");
                    $cluster_info.eq(1).addClass("label-success");
                    $cluster_info.eq(1).text("ACTIVE");
                } else {
                    $cluster_info.eq(1).removeClass("label-success");
                    $cluster_info.eq(1).removeClass("label-danger");
                    $cluster_info.eq(1).addClass("label-danger");
                    $cluster_info.eq(1).text("INACTIVE");
                }
                if (difference_data == true || difference_data == "true") {
                    $cluster_info.eq(2).removeClass("label-success");
                    $cluster_info.eq(2).removeClass("label-danger");
                    $cluster_info.eq(2).addClass("label-danger");
                    $cluster_info.eq(2).addClass("custom_search_differen_data");
                    $cluster_info.eq(2).text("存在");
                } else {
                    $cluster_info.eq(2).removeClass("label-success");
                    $cluster_info.eq(2).removeClass("label-danger");
                    $cluster_info.eq(2).removeClass("custom_search_differen_data");
                    $cluster_info.eq(2).addClass("label-success");
                    $cluster_info.eq(2).text("不存在");
                }

                var $cluster_switch_info = $(".cluster_switch_info ul li span");
                $cluster_switch_info.eq(0).text(e.value.switch_info.switch_total);
                var last_switch_state = e.value.switch_info.last_switch_state;
                if (last_switch_state == true || last_switch_state == "true") {
                    $cluster_switch_info.eq(2).removeClass("label-success");
                    $cluster_switch_info.eq(2).removeClass("label-danger");
                    $cluster_switch_info.eq(2).addClass("label-success");
                    $cluster_switch_info.eq(2).text("SUCCESS");
                } else {
                    $cluster_switch_info.eq(2).removeClass("label-success");
                    $cluster_switch_info.eq(2).removeClass("label-danger");
                    $cluster_switch_info.eq(2).addClass("label-danger");
                    $cluster_switch_info.eq(2).text("FAILED");
                }
                if(e.value.switch_info.switch_total == 0 || e.value.switch_info.switch_total == "0" || e.value.switch_info.last_switch_time == 0 || e.value.switch_info.last_switch_time == "0"){
                    $cluster_switch_info.eq(1).text("0");
                }else{
                    var last_switch_time = parseInt(e.value.switch_info.last_switch_time);
                    var date = new Date(last_switch_time);
                    Y = date.getFullYear() + '-';
                    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    D = date.getDate() + ' ';
                    h = date.getHours() + ':';
                    m = date.getMinutes() + ':';
                    s = date.getSeconds();
                    var last_switch_time_new = Y+M+D+h+m+s;
                    $cluster_switch_info.eq(1).text(last_switch_time_new);
                }




                $monitor_status.eq(1).text(e.value.monitor_status.cluster_name);
                $monitor_status.eq(2).text(e.value.monitor_status.failover_count);
                $cluster_info.eq(0).text(e.value.cluster_info.topology);
            } else {
                swal("获取监控信息错误" + "error: " + e.err, "获取监控信息错误", "error");

            }

        },
        error: function (e) {
            swal("获取监控信息错误", "获取监控信息错误,服务器错误", "error");
        }

    })
}
var get_monitor_info_url = "getmonitorinfo";
//var get_monitor_info_url = "./test/monitor_data.json";
var get_monitor_info_data = {"cluster_name": cluster_name};
get_monitor_info(get_monitor_info_url, get_monitor_info_data);


    
function generate_dbha_detail_tb(url, data) {
    $.ajax({
        url: url,
        data: data,
        type: "post",
        async: false,
        contentType: "application/json",
        success: function (e) {
            var dbha_data = e["value"]["nodes_info"];
            var dbha_data_length = dbha_data.length;
            var $dbha = $(".dbha_detail .dbha_row");
            $dbha.empty();
            for(var i = 0; i < dbha_data_length; i ++){
                var tmp = "";
                var maintain_html = "";
                var read_only_html = "";
                var event_scheduler_html = "";
                var io_thread_html = "";
                var sql_thread_html = "";
                var role_html = "";


                if(dbha_data[i]["maintain"] == true || dbha_data[i]["maintain"] == "true"){
                    maintain_html = "<i class=\"fa fa-check-circle text-success\" aria-hidden=\"true\"></i>"
                }else{

                    maintain_html =  '<i class="fa fa-times-circle text-danger" aria-hidden="true"></i>';
                }

                if(dbha_data[i]["read_only"] == "true" || dbha_data[i]["read_only"] == true){
                    read_only_html = '<i class="fa fa-check-circle text-success" aria-hidden="true"></i>';
                }else{
                    read_only_html = '<i class="fa fa-times-circle text-danger" aria-hidden="true"></i>';
                }

                if(dbha_data[i]["event_scheduler"] == true || dbha_data[i]["event_scheduler"] == "true"){
                    event_scheduler_html = '<i class="fa fa-check-circle text-success" aria-hidden="true"></i>';
                }else{
                    event_scheduler_html = '<i class="fa fa-times-circle text-danger" aria-hidden="true"></i>';
                }

                if(dbha_data[i]["io_thread"] == true || dbha_data[i]["io_thread"] == "true"){
                    io_thread_html = '<i class="fa fa-check-circle text-success" aria-hidden="true"></i>';
                }else{
                    io_thread_html = '<i class="fa fa-times-circle text-danger" aria-hidden="true"></i>';
                }

                if(dbha_data[i]["sql_thread"] == true || dbha_data[i]["sql_thread"] == "true"){
                    sql_thread_html = '<i class="fa fa-check-circle text-success" aria-hidden="true"></i>';
                }else{
                    sql_thread_html = '<i class="fa fa-times-circle text-danger" aria-hidden="true"></i>';
                }

                if(dbha_data[i]["role"] == "master"){
                    role_html = '<span class="label label-primary">Master</span>';
                }else{
                    role_html = '<span class="label label-default">Slave</span>';
                }
                var sql_error_html = "";
                var sql_err_value = dbha_data[i]["sql_error"];
                var sql_err_len = sql_err_value.length;
                var slice_len = 25;
                var need_slice_count = Math.floor(sql_err_len/slice_len);
                for(var j = 0; j< need_slice_count; j++){
                    var start_num = j * slice_len;
                    var end_num = j*slice_len + slice_len - 1;
                    var tmp_sql_err_frame = sql_err_value.slice(start_num, end_num);
                    tmp_sql_err_frame = tmp_sql_err_frame + "\n";
                    sql_error_html += tmp_sql_err_frame;

                }




                tmp = "<div style=\"font-size: 13px; margin-right: 70px;width: 450px;height: 598px;float: left\">\n" +
                    "                                                <div class=\"box box-solid\">\n" +
                    "                                                    <div class=\"box-body\">\n" +
                    "                                                        <table class=\"table\" style=\"border: 0;\">\n" +
                    "                                                            <colgroup>\n" +
                    "                                                                <col style=\"width: 5%;\">\n" +
                    "                                                                <col style=\"width: 30%;\">\n" +
                    "                                                                <col style=\"width: 60%;\">\n" +
                    "                                                                <col style=\"width: 5%;\">\n" +
                    "                                                            </colgroup>\n" +
                    "                                                            <tr style=\"padding: 0;\">\n" +
                    "                                                                <th><img src=\"./dist/img/mysql.png\" style=\"width:32px\"></th>\n" +
                    "                                                                <th colspan=\"2\">"+ dbha_data[i]["host"] +"</th>\n" +
                    "                                                                <th>\n" +
                    "                                                                    <div class=\"dropdown custom_card_tb_btn\">\n" +
                    "                                                                        <button class=\"btn btn-default dropdown-toggle btn-sm\"\n" +
                    "                                                                                type=\"button\"\n" +
                    "                                                                                style='color: rgb(33,33,33)'\n" +
                    "                                                                                id=\"dropdownMenu\" data-toggle=\"dropdown\"\n" +
                    "                                                                                aria-haspopup=\"true\"\n" +
                    "                                                                                aria-expanded=\"true\">\n" +
                    "                                                                            <i class=\"fa fa-bars\"></i>\n" +
                    "                                                                        </button>\n" +
                    "                                                                        <ul class=\"dropdown-menu\"\n" +
                    "                                                                            aria-labelledby=\"dropdownMenu\"\n" +
                    "                                                                            style='left: -45px;top: -8px;font-size: 13px'>\n" +
                    "                                                                            <li><a style='color: rgb(33,33,33)' class='edit_node'  data-toggle='modal' data-target='#modal_edit_node' cluster_name="+ dbha_data[i]["cluster_name"] +" host="+ dbha_data[i]["host"] +" dbport="+ dbha_data[i]["dbport"] +" role="+ dbha_data[i]["role"] +" online="+ dbha_data[i]["online"] +"><i\n" +
                    "                                                                                    class='btn btn-default btn-xs fa fa-pencil-square-o'\n" +
                    "                                                                                   ></i>编辑</a></li>\n" +
                    "                                                                            <li><a style='color: rgb(33,33,33)' class='maintain_node' maintain_status="+ dbha_data[i]["maintain"] +" host="+ dbha_data[i]["host"] +"><i\n" +
                    "                                                                                    class='btn btn-default btn-xs fa fa-wrench'\n" +
                    "                                                                                    ></i>维护</a></li>\n" +
                    "                                                                            <li><a style='color: rgb(33,33,33)' class='master_slave_switch' host="+ dbha_data[i]["host"] +"><i\n" +
                    "                                                                                    class='btn btn-default btn-xs fa fa-exchange'\n" +
                    "                                                                                    ></i>主从切换</a></li>\n" +
                    "                                                                            <li><a style='color: rgb(33,33,33)' class='delete_node' host="+ dbha_data[i]["host"] +"><i\n" +
                    "                                                                                    class='btn btn-default btn-xs fa fa-trash'\n" +
                    "                                                                                    ></i>删除</a></li>\n" +
                    "                                                                        </ul>\n" +
                    "                                                                    </div>\n" +
                    "                                                                </th>\n" +
                    "                                                            </tr>\n" +
                    "                                                            <tr>\n" +
                    "                                                                <td colspan=\"4\" style=\"padding: 0;border-top: 0;\">\n" +
                    "                                                                    <table class=\"table fixed\" style=\"border: 1px;\">\n" +
                    "                                                                        <tbody>\n" +
                    "                                                                        <tr>\n" +
                    "                                                                            <th class=\"tabicon\">Role</th>\n" +
                    "                                                                            <th class=\"tabicon\">Maintain</th>\n" +
                    "                                                                            <th class=\"tabicon\">Read Only</th>\n" +
                    "                                                                            <th class=\"tabicon\">Event Scheduler</th>\n" +
                    "                                                                        </tr>\n" +
                    "                                                                        <tr>\n" +
                    "                                                                            <td>\n" +
                    "                                                                                "+ role_html +"\n" +
                    "                                                                            </td>\n" +
                    "                                                                            <td align=\"center\">\n" +
                    "                                                                                "+ maintain_html +"\n" +
                    "                                                                            </td >\n" +
                    "                                                                            <td align=\"center\">\n" +
                    "                                                                                "+ read_only_html  +"\n" +
                    "                                                                            </td>\n" +
                    "                                                                            <td align=\"center\">\n" +
                    "                                                                                "+ event_scheduler_html +"\n" +
                    "                                                                            </td>\n" +
                    "                                                                        </tr>\n" +
                    "                                                                        </tbody>\n" +
                    "                                                                    </table>\n" +
                    "                                                                </td>\n" +
                    "                                                            </tr>\n" +
                    "                                                            <tr>\n" +
                    "                                                                <td colspan=\"2\">Version</td>\n" +
                    "                                                                <td colspan=\"2\">"+ dbha_data[i]["version"] + "</td>\n" +
                    "                                                            </tr>\n" +
                    "                                                            <tr>\n" +
                    "                                                                <td colspan=\"2\">Server Id</td>\n" +
                    "                                                                <td colspan=\"2\">"+ dbha_data[i]["server_id"] +"</td>\n" +
                    "                                                            </tr>\n" +
                    "                                                            <tr>\n" +
                    "                                                                <td colspan=\"4\" style=\"padding: 0;\">\n" +
                    "                                                                    <table class=\"table table-condensed fixed\"\n" +
                    "                                                                           style=\"border: 1px\">\n" +
                    "                                                                        <tbody>\n" +
                    "                                                                        <tr style=\"background: #ddd\">\n" +
                    "                                                                            <th class=\"tabicon\">IO Thread</th>\n" +
                    "                                                                            <th class=\"tabicon\">SQL Thread</th>\n" +
                    "                                                                            <th class=\"tabicon\">Sync Binlog</th>\n" +
                    "                                                                            <th class=\"tabicon\">Flush Commit</th>\n" +
                    "                                                                        </tr>\n" +
                    "                                                                        <tr>\n" +
                    "\n" +
                    "                                                                            <td align=\"center\" class=\"tabicon\"> "+ io_thread_html +"</td>\n" +
                    "                                                                            <td align=\"center\" class=\"tabicon\"> "+ sql_thread_html +"</td>\n" +
                    "\n" +
                    "                                                                            <td align=\"center\" class=\"tabicon\"> "+ dbha_data[i]["sync_binlog"] +"</td>\n" +
                    "                                                                            <td align=\"center\" class=\"tabicon\"> "+ dbha_data[i]["innodb_flush_log_at_trx_commit"] +"</td>\n" +
                    "                                                                        </tr>\n" +
                    "\n" +
                    "                                                                        </tbody>\n" +
                    "                                                                    </table>\n" +
                    "                                                                </td>\n" +
                    "                                                            </tr>\n" +
                    "                                                            <tr>\n" +
                    "                                                                <td colspan=\"2\">\n" +
                    "                                                                    <span class=\"ng-scope\">Executed GTID Set</span>\n" +
                    "                                                                </td>\n" +
                    "                                                                <td colspan=\"2\">\n" +
                    "                                                                    <span class=\"ng-binding ng-scope\">\n" +
                    "                                                                        "+ dbha_data[i]["executed_gtid_set"] +"\n" +
                    "                                                                    </span>\n" +
                    "                                                                </td>\n" +
                    "\n" +
                    "                                                            </tr>\n" +
                    "                                                            <tr>\n" +
                    "                                                                <td class=\"gtid\" colspan=\"2\"></td>\n" +
                    "                                                                <td class=\"gtid\" colspan=\"2\"></td>\n" +
                    "                                                            </tr>\n" +
                    "                                                            <tr>\n" +
                    "                                                                <td class=\"gtid\" colspan=\"2\"></td>\n" +
                    "                                                                <td class=\"gtid\" colspan=\"2\"></td>\n" +
                    "                                                            </tr>\n" +
                    "                                                            <tr>\n" +
                    "                                                                <td colspan=\"2\">Delay</td>\n" +
                    "                                                                <td colspan=\"2\" class=\"ng-binding\">"+ dbha_data[i]["seconds_behind"] +"</td>\n" +
                    "                                                            </tr>\n" +
                    "                                                            <tr>\n" +
                    "                                                                <td colspan=\"2\">Master</td>\n" +
                    "                                                                <td colspan=\"2\" class=\"ng-binding\">"+ dbha_data[i]["master"] +"</td>\n" +
                    "                                                            </tr>\n" +
                    "                                                            <tr>\n" +
                    "                                                                <td colspan=\"2\"><span>SQL error</span></td>\n" +
                    "                                                                <td colspan=\"2\">\n" +
                    "                                                                   <span>\n" +
                    "                                                                        "+ sql_error_html +"\n" +
                    "                                                                   </span>\n" +
                    "                                                                </td>\n" +
                    "                                                            </tr>\n" +
                    "                                                        </table>\n" +
                    "                                                    </div>\n" +
                    "                                                </div>\n" +
                    "                                            </div>";



                $dbha.append(tmp);

            }

        },
        error: function (e) {
            console.log("获取dbha数据报错，服务器错误");
        }
    });
}
//生成dbha detal tb
var generate_dbha_detail_tb_url = "dbhadetail";
var generate_dbha_detail_tb_data = JSON.stringify({"cluster_name": cluster_name});
generate_dbha_detail_tb(generate_dbha_detail_tb_url, generate_dbha_detail_tb_data);



//var get_monitorsetting_url = "getmonitorsetting";
function get_monitorconfig_ajax(url, data) {
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: "post",
        async: false,
        contentType: "application/json",
        success: function (e) {

            if(e.status == 3 || e.status == "3"){
                var days_str = e["value"]["days"].toString();
                $("#save_days").val(days_str);
                $("#submit_change_monitor_config").attr("host", e.value.host);
                if(e.value.monitor == true || e.value.monitor == "true"){
                    $("md-switch .md-bar").css("background-color","rgba(255, 64, 129, 0.5)");
                    $("md-switch .md-thumb").css("background-color", "rgb(255, 64, 129)");
                    $("md-switch .md-thumb").css("left", 0);
                    $(".show_off_on").text("On");

                }else {
                    $("md-switch .md-bar").css("background-color", "rgb(158, 158, 158)");
                    $("md-switch .md-thumb").css("background-color", "rgb(250, 250, 250)");
                    $("md-switch .md-thumb").css("left", -15);
                    $(".show_off_on").text("Off");
                }
            }else{
                swal("获取监控配置失败", "error: " + e.err, "error");
            }
        },
        error: function (e) {
            console.log("获取监控配置失败，服务器错误");
        }

    })
}

function check_days(days) {
    var dyas_is_float = days.indexOf(".");
    var days_num = parseInt(days);
    if(dyas_is_float == "-1" || dyas_is_float == -1){
        if(days_num != NaN && (days_num >= 1 && days_num <= 30)){
            return true
        }
    }else{
        return false
    }
}
function update_monitor_setting_ajax(url, data) {
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: "post",
        async: false,
        contentType: "application/json",
        success: function (e) {

            if(e.status == 1 || e.status == "1"){
                swal("更新监控配置成功", "", "success");
                $("#modal_node_monitor_config").modal('hide');
            }else{
                swal("更新监控配置失败", "error: " + e.err, "error");
            }
        },
        error: function (e) {
            console.log("更新监控配置失败，服务器错误");
        }

    })
}


//dbha监控
function generate_monitor_charts(thread_running_data, thread_connected_data) {
    var thread_runing_count = parseInt(thread_running_data);
    var total_thread_running_count = thread_runing_count * 2;
    var thread_running_normal_color_count = "";
    var thread_running_yellow_color_count = "";
    var thread_running_red_color_count = "";

    if (thread_runing_count > 200) {
        thread_running_normal_color_count = 100;
        thread_running_yellow_color_count = 100;
        thread_running_red_color_count = thread_runing_count - 200;
    } else if (thread_runing_count > 100) {
        thread_running_normal_color_count = 100;
        thread_running_yellow_color_count = thread_runing_count - 100;
        thread_running_red_color_count = 0;
    } else {
        thread_running_normal_color_count = thread_runing_count;
        thread_running_yellow_color_count = 0;
        thread_running_red_color_count = 0;
    }


    var thread_connected_count = parseInt(thread_connected_data);
    var total_thread_connected_count = thread_connected_count * 2;
    var thread_connected_normal_color_count = "";
    var thread_connected_yellow_color_count = "";
    var thread_connected_red_color_count = "";

    if (thread_connected_count > 200) {
        thread_connected_normal_color_count = 100;
        thread_connected_yellow_color_count = 100;
        thread_connected_red_color_count = thread_connected_count - 200;
    } else if (thread_connected_count > 100) {
        thread_connected_normal_color_count = 100;
        thread_connected_yellow_color_count = thread_connected_count - 100;
        thread_connected_red_color_count = 0;
    } else {
        thread_connected_normal_color_count = thread_connected_count;
        thread_connected_yellow_color_count = 0;
        thread_connected_red_color_count = 0;
    }


    var chart = new Chartist.Pie('.thread_running',
        {
            series: [{
                value: thread_running_normal_color_count,
                name: 'step_green',
                className: 'custom_green_chartist_color',
                meta: 'Meta green'
            }, {
                value: thread_running_yellow_color_count,
                name: 'step_yellow',
                className: 'custom_yellow_chartist_color',
                meta: 'Meta Yellow'
            }, {
                value: thread_running_red_color_count,
                name: 'step_red',
                className: 'custom_red_chartist_color',
                meta: 'Meta Three'
            }
            ],
            label: [thread_running_normal_color_count, thread_running_yellow_color_count, thread_running_red_color_count],
        }, {
            donut: true,
            donutWidth: 30,
            startAngle: 270,
            total: total_thread_running_count,
            showLabel: false,
            plugins: [
                Chartist.plugins.fillDonut({
                    items: [{
                        content: "<h3>"+ thread_runing_count +"</h3>"
                    }]
                })
            ],
        });
    chart.on('draw', function (data) {
        if (data.type === 'slice' && data.index == 0) {
            // Get the total path length in order to use for dash array animation
            var pathLength = data.element._node.getTotalLength();

            // Set a dasharray that matches the path length as prerequisite to animate dashoffset
            data.element.attr({
                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
            });

            // Create animation definition while also assigning an ID to the animation for later sync usage
            var animationDefinition = {
                'stroke-dashoffset': {
                    id: 'anim' + data.index,
                    dur: 1200,
                    from: -pathLength + 'px',
                    to: '0px',
                    easing: Chartist.Svg.Easing.easeOutQuint,
                    fill: 'freeze'
                }
            };

            // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
            data.element.attr({
                'stroke-dashoffset': -pathLength + 'px'
            });

            // We can't use guided mode as the animations need to rely on setting begin manually
            // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
            data.element.animate(animationDefinition, true);
        }
    });


    var chart_thread_connected = new Chartist.Pie('.thread_connected',
        {
            series: [{
                value: thread_connected_normal_color_count,
                name: 'step_green',
                className: 'custom_green_chartist_color',
                meta: 'Meta green'
            }, {
                value: thread_connected_yellow_color_count,
                name: 'step_yellow',
                className: 'custom_yellow_chartist_color',
                meta: 'Meta Yellow'
            }, {
                value: thread_connected_red_color_count,
                name: 'step_red',
                className: 'custom_red_chartist_color',
                meta: 'Meta Three'
            }
            ],
            label: [thread_connected_normal_color_count, thread_connected_yellow_color_count, thread_connected_red_color_count],
        }, {
            donut: true,
            donutWidth: 30,
            startAngle: 270,
            total: total_thread_connected_count,
            showLabel: false,
            plugins: [
                Chartist.plugins.fillDonut({
                    items: [{
                        content: "<h3>"+ thread_connected_count +"</h3>"
                    }]
                })
            ],
        });
    chart_thread_connected.on('draw', function (data) {
        if (data.type === 'slice' && data.index == 0) {
            // Get the total path length in order to use for dash array animation
            var pathLength = data.element._node.getTotalLength();

            // Set a dasharray that matches the path length as prerequisite to animate dashoffset
            data.element.attr({
                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
            });

            // Create animation definition while also assigning an ID to the animation for later sync usage
            var animationDefinition = {
                'stroke-dashoffset': {
                    id: 'anim' + data.index,
                    dur: 1200,
                    from: -pathLength + 'px',
                    to: '0px',
                    easing: Chartist.Svg.Easing.easeOutQuint,
                    fill: 'freeze'
                }
            };

            // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
            data.element.attr({
                'stroke-dashoffset': -pathLength + 'px'
            });

            // We can't use guided mode as the animations need to rely on setting begin manually
            // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
            data.element.animate(animationDefinition, true);
        }
    });
}
function render_monitor_queires_qps(current_qps_val, slow_queries_val) {
    $(".qps_count").text(current_qps_val);
    $(".queries_count").text(slow_queries_val);
}

var monitor_statistics_ajax_url = "monitorstatistics";
var monitor_statistics_ajax_data = {"cluster_name": cluster_name};

function monitor_statistics_ajax(url ,data) {
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: "post",
        async: false,
        contentType: "application/json",
        success: function (e) {
            if(e.status == 3 || e.status == "3"){

                var thread_running_val = e.value.thread_running;
                var thread_connected_val = e.value.thread_connected;
                var current_qps_val = e.value.current_qps;
                var slow_queries_val = e.value.slow_queries;
                generate_monitor_charts(thread_running_val, thread_connected_val);
                render_monitor_queires_qps(current_qps_val, slow_queries_val);

            }else{
                swal("获取监控statistics错误", "error: " + e.err, "error");
            }
        },
        error: function (e) {
            console.log("获取监控statistics错误，服务器错误");
        }
    })

}
monitor_statistics_ajax(monitor_statistics_ajax_url, monitor_statistics_ajax_data);




