
function get_cluster_metric(url, data) {
    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: "post",
        async: false,
        contentType: "application/json",
        success: function (e) {
            if (e.status == 3 || e.status == "3") {
                var cluster_metric_val = e.value;
                sessionStorage.setItem("cluster_metric", JSON.stringify(cluster_metric_val));
                $(".monitor_cluster_name").empty();
                $(".monitor_host").empty();
                $("#monitor_metric").empty();
                $(".monitor_cluster_name").append("<option value=''>请选择集群</option>");
                $(".monitor_host").append("<option value=''>请选择host</option>");

                var metric_info = cluster_metric_val.metric_info;
                var nodes_info = cluster_metric_val.nodes_info;
                for (var i = 0; i < metric_info.length; i++) {
                    if(i==0){
                        $("#monitor_metric").append("<option selected='selected' value=" + metric_info[i] + ">" + metric_info[i] + "</option>");
                    }else{
                        $("#monitor_metric").append("<option value=" + metric_info[i] + ">" + metric_info[i] + "</option>");
                    }
                }

                for (var j = 0; j < nodes_info.length; j++) {
                    if (j == 0) {
                        $(".monitor_cluster_name").append("<option selected=\"selected\" value=" + nodes_info[j]["cluster_name"] + ">" + nodes_info[j]["cluster_name"] + "</option>");
                        for (var k = 0; k < nodes_info[j]["node_list"].length; k++) {
                            if (k == 0) {
                                $(".monitor_host").append("<option selected=\"selected\" value=" + nodes_info[j]["node_list"][k] + " >" + nodes_info[j]["node_list"][k] + "</option>")
                            } else {
                                $(".monitor_host").append("<option value=" + nodes_info[j]["node_list"][k] + ">" + nodes_info[j]["node_list"][k] + "</option>");
                            }
                        }

                    } else {
                        $(".monitor_cluster_name").append("<option value=" + nodes_info[j]["cluster_name"] + ">" + nodes_info[j]["cluster_name"] + "</option>");
                    }

                }


            } else {
                swal("获取集群指标失败", "", "error")
            }
        },
        error: function (e) {
            console.log("获取监控集群列表错误，服务器错误");
        }


    })
}

var get_cluster_metric_url = "get_cluster_metric";
var get_cluster_metric_data = {};
get_cluster_metric(get_cluster_metric_url, get_cluster_metric_data);

function get_time() {
    var from_timestamp = "";
    var to_timestamp = "";
    var last_to_days = 2 * 24 * 60 * 60 * 1000;
    var last_seven_days = 7 * 24 * 60 * 60 * 1000;
    var last_thirty_days = 30 * 24 * 60 * 60 * 1000;
    var last_five_minutes = 5 * 60 * 1000;
    var last_fifteen_minutes = 15 * 60 * 1000;
    var last_thirty_minutes = 30 * 60 * 1000;
    var last_one_hours = 60 * 60 * 1000;
    var last_three_hours = 3 * 60 * 60 * 1000;
    var last_six_hours = 6 * 60 * 60 * 1000;
    var last_twelve_hours = 12 * 60 * 60 * 1000;
    var last_days = 24 * 60 * 60 * 1000;

    var time_button_text_str = $(".time_button_text").text();
    var is_include = time_button_text_str.indexOf("/");
    //-1 表示没有例如: last 5 minutes, 获取当前时间
    if(is_include == -1){
        $(".time_show_titie").attr("title", time_button_text_str);
        var to_time_crruent = new Date();
        to_timestamp = to_time_crruent.getTime();
        if(time_button_text_str == "Last 2 days"){
            from_timestamp = to_timestamp - last_to_days;
        }else if(time_button_text_str == "Last 7 days"){
            from_timestamp = to_timestamp - last_seven_days;
        }else if(time_button_text_str == "Last 30 days"){
            from_timestamp = to_timestamp - last_thirty_days;
        }else if(time_button_text_str == "Last 5 minutes"){
            from_timestamp = to_timestamp - last_five_minutes;
        }else if(time_button_text_str == "Last 15 minutes"){
            from_timestamp = to_timestamp - last_fifteen_minutes;
        }else if(time_button_text_str == "Last 30 minutes"){
            from_timestamp = to_timestamp - last_fifteen_minutes;
        }else if(time_button_text_str == "Last 1 hours"){
            from_timestamp = to_timestamp - last_one_hours;
        }else if(time_button_text_str == "Last 3 hours"){
            from_timestamp = to_timestamp - last_three_hours;
        }else if(time_button_text_str == "Last 6 hours"){
            from_timestamp = to_timestamp - last_six_hours;
        }else if(time_button_text_str == "Last 12 hours"){
            from_timestamp = to_timestamp - last_twelve_hours;
        }else if(time_button_text_str == "Last 24 hours"){
            from_timestamp = to_timestamp - last_days;
        }
    }else{
        var from_time = $('.frmo_actual_datepicker').val();
        var to_time = $('.to_actual_datepicker').val();
        if (to_time && from_time) {
            $(".time_button_text").text(from_time + "...");
            $(".time_show_titie").attr("title", from_time + "\n" + "to" + "\n" + to_time);
            var new_to_data = new Date(to_time);
            var new_from_data = new Date(from_time);
            from_timestamp = new_from_data.getTime();
            to_timestamp = new_to_data.getTime();

            //新增用于判断是否等于固定值
            var interval_time = parseInt(to_timestamp - from_timestamp);
            if(interval_time == last_to_days){
                $(".time_button_text").text("Last 2 days");
            }else if(interval_time == last_seven_days){
                $(".time_button_text").text("Last 7 days");
            }else if(interval_time == last_thirty_days){
                $(".time_button_text").text("Last 30 days");
            }else if(interval_time == last_five_minutes){
                $(".time_button_text").text("Last 5 minutes");
            }else if(interval_time == last_fifteen_minutes){
                $(".time_button_text").text("Last 15 minutes");
            }else if(interval_time == last_thirty_minutes){
                $(".time_button_text").text("Last 30 minutes");
            }else if(interval_time == last_one_hours){
                $(".time_button_text").text("Last 1 hours");
            }else if(interval_time == last_three_hours){
                $(".time_button_text").text("Last 3 hours");
            }else if(interval_time == last_six_hours){
                $(".time_button_text").text("Last 6 hours");
            }else if(interval_time == last_twelve_hours){
                $(".time_button_text").text("Last 12 hours");
            }else if(interval_time == last_days){
                $(".time_button_text").text("Last 24 hours");
            }

        }
    }

    return [from_timestamp, to_timestamp]

}
$(".monitor_cluster_name").change(function () {
    $(".monitor_host").empty();
    $(".monitor_host").append("<option selected=\"selected\" value=''>请选择host</option>");
    var current_monitor_charts_cluster_name = $(this).val();
    var monitor_cluster_metric_session = JSON.parse(sessionStorage.getItem("cluster_metric"));
    var nodes_info = monitor_cluster_metric_session.nodes_info;
    for (var j = 0; j < nodes_info.length; j++) {
        if (nodes_info[j]["cluster_name"] == current_monitor_charts_cluster_name) {
            for (var k = 0; k < nodes_info[j]["node_list"].length; k++) {
                if (k == 0) {
                    $(".monitor_host").append("<option value=" + nodes_info[j]["node_list"][k] + " selected='selected'>" + nodes_info[j]["node_list"][k] + "</option>")
                } else {
                    $(".monitor_host").append("<option value=" + nodes_info[j]["node_list"][k] + ">" + nodes_info[j]["node_list"][k] + "</option>");
                }
            }
        }

    }

    // $('#monitor_metric').selectpicker('selectAll');
    var metric = $("#monitor_metric").selectpicker("val");
    var host = $(".monitor_host").val();
    var monitor_time = get_time();
    if (monitor_time[0] && monitor_time[1] && metric && host) {
        var data = {
            "host": host,
            "metric": metric,
            "start_time": monitor_time[0],
            "stop_time": monitor_time[1]
        };
        var get_monitor_charts_list_data_url = "monitormetricvalue";
        get_monitor_charts_list_data(get_monitor_charts_list_data_url, data);


    }

});
$(".monitor_host").change(function () {
    var metric = $("#monitor_metric").selectpicker("val");
    var host = $(this).val();
    var monitor_time = get_time();
    if (monitor_time[0] && monitor_time[1] && metric && host) {
        var data = {
            "host": host,
            "metric": metric,
            "start_time": monitor_time[0],
            "stop_time": monitor_time[1]
        };
        var get_monitor_charts_list_data_url = "monitormetricvalue";
        get_monitor_charts_list_data(get_monitor_charts_list_data_url, data);


    }
});

//前五分钟(基于当前时间)
function last_five_minutes() {
    var current_time = new Date();
    var timestamp_tmp = current_time.getTime();
    var last_five = timestamp_tmp - 5 * 60 * 1000;
    return [last_five, timestamp_tmp]

}

//metric隐藏
$('#monitor_metric').on('hide.bs.select', function () {
    var host = $(".monitor_host").val();
    var metric = $("#monitor_metric").selectpicker("val");
    var time_val = get_time();
    var start_time = time_val[0];
    var stop_time = time_val[1];

    var get_monitor_charts_list_data_url = "monitormetricvalue";
    var get_monitor_charts_list_data_data = {
        "host": host,
        "metric": metric,
        "start_time": start_time,
        "stop_time": stop_time
    };
    get_monitor_charts_list_data(get_monitor_charts_list_data_url, get_monitor_charts_list_data_data)

   

});

function render_charts(monitor_value) {

    var series_custom = [];
    for (var i = 0; i < monitor_value.length; i++) {
        var tmp_monitor_value = {};
        tmp_monitor_value["name"] = monitor_value[i]["metric"];
        tmp_monitor_value["data"] = monitor_value[i]["value"];
        tmp_monitor_value["type"] = "area";
        series_custom.push(tmp_monitor_value);
    }

    var hight_charts_obj = {
        chart: {
            zoomType: 'x'
            // height: 900
        },
        title: {
            text: '',
            align: 'center'
        },

        xAxis: [{
            crosshair: true,
            type: "datetime",
        }],
        credits: {
            enabled: false,
            text: ""// 禁用版权信息
        },
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: false

        }],
        tooltip: {
            shared: true
        },
        legend: {
            useHTML: true,
            floating: false,
            layout: "vertical",
            align: "center",
            width: 1560,
            maxHeight: 200,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || // theme
                'rgba(255,255,255,0.25)',
            labelFormatter: function() {
                var ydata_arr = this.yData;
                var ydata_len = this.yData.length;
                var max_num = Math.max(...ydata_arr);
                var min_num = Math.min(...ydata_arr);
                var current_num = ydata_arr[ydata_len - 1];
                var ydata_sum = 0;
                for(var i=0; i<ydata_len; i++){
                    ydata_sum += ydata_arr[i]
                }
                var avg_num = Math.round(ydata_sum / ydata_len);

                return "<div class='simple_scroll_legend'>" +
                    "<div class='pull-left high_chart_legend_custom_left'> "+ this.name +"</div>\n" +
                    "<div class='pull-right high_chart_legend_custom'>" +
                    "<span class='pull-right' style='width: 100px;height: 18px;margin-right: 30px'>max: "+ max_num +" </span>" +
                    "<span class='pull-right' style='width: 150px;margin-right: 30px'>min: "+ min_num +" </span>" +
                    "<span class='pull-right' style='width: 150px;margin-right: 30px'>avg: "+ avg_num +" </span>" +
                    "</div>" +
                    "</div>"

            },
            navigation: {
                activeColor: '#3E576F',
                animation: true,
                arrowSize: 12,
                inactiveColor: '#CCC',
                style: {
                    fontWeight: 'bold',
                    color: '#333',
                    fontSize: '12px',
                }
            }
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        // [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: series_custom

    };


    Highcharts.chart('container', hight_charts_obj);
}
function get_monitor_charts_list_data(url, data, need_change_text=0, change_text="", from_timestamp="", to_timestamp="") {

    $.ajax({
        url: url,
        data: JSON.stringify(data),
        type: "post",
        async: false,
        contentType: "application/json",
        success: function (e) {
            if (e.status == 3 || e.status == "3") {
                var monitor_value = e.value.monitor_value;
                render_charts(monitor_value);
                if(need_change_text==1){
                    $(".time_show_titie").attr("title", change_text);
                    $(".time_button_text").text(change_text);
                    var time_humanize_list = switch_time_humanize(from_timestamp, to_timestamp);
                    $(".frmo_actual_datepicker").val(time_humanize_list[0]);
                    $(".to_actual_datepicker").val(time_humanize_list[1]);
                }
            }else{
                swal("获取单页面监控数据失败", e.err, "error")
            }

        },
        error: function (e) {
            console.log("获取监控图标数据列表错误，服务器错误");
        }

    });

}
//初始化
var get_monitor_charts_list_data_url = "monitormetricvalue";
var metric_init = $("#monitor_metric").selectpicker("val");
var host_init = $(".monitor_host").val();
var monitor_time_init = last_five_minutes();
var get_monitor_charts_list_data_data = {
    "host": host_init,
    "metric": metric_init,
    "start_time": monitor_time_init[0],
    "stop_time": monitor_time_init[1]
};
get_monitor_charts_list_data(get_monitor_charts_list_data_url, get_monitor_charts_list_data_data);

//点击事件需要函数
function switch_time_humanize(from_timestamp, to_timestamp) {
    var from_time_humanize = "";
    var to_time_humanize = "";
    var tmp_from_time = new Date(from_timestamp);
    var from_Y = tmp_from_time.getFullYear() + '/';
    var from_M = (tmp_from_time.getMonth()+1 < 10 ? '0'+(tmp_from_time.getMonth()+1) : tmp_from_time.getMonth()+1) + '/';
    var from_D = tmp_from_time.getDate() + ' ';
    var from_h = tmp_from_time.getHours() + ':';
    var from_m = tmp_from_time.getMinutes() + ':';
    var from_s = tmp_from_time.getSeconds();
    from_time_humanize = from_Y+from_M+from_D+from_h+from_m+from_s;

    var tmp_to_time = new Date(to_timestamp);
    var to_Y = tmp_to_time.getFullYear() + '/';
    var to_M = (tmp_to_time.getMonth()+1 < 10 ? '0'+(tmp_to_time.getMonth()+1) : tmp_to_time.getMonth()+1) + '/';
    var to_D = tmp_to_time.getDate() + ' ';
    var to_h = tmp_to_time.getHours() + ':';
    var to_m = tmp_to_time.getMinutes() + ':';
    var to_s = tmp_to_time.getSeconds();

    to_time_humanize = to_Y + to_M + to_D + to_h + to_m + to_s;
    return [from_time_humanize, to_time_humanize]


}
function toogle_time_button() {
    var is_active = $(".custom_dropdown-menu").hasClass("custom_active");
    if(is_active){
        $(".custom_dropdown-menu").hide();
        $(".custom_dropdown-menu").removeClass("custom_active");
        $(".to_actual_range").datepicker("clearDates");
        $(".to_actual_range").hide();
        $('.from_actual_range').datepicker("clearDates");
        $('.from_actual_range').hide();

    }else{
        $(".custom_dropdown-menu").show();
        $(".custom_dropdown-menu").addClass("custom_active")
    }
}
function get_specified_time(need_del_time_int){
    var current_time = new Date();
    var to_timestamp = current_time.getTime();
    var from_timestamp = to_timestamp - need_del_time_int;
    return [from_timestamp, to_timestamp]
}
//点击事件
$(".last_two_days").click(function () {
    var current_select_text = $(".last_two_days a").text();
    var need_del_time = 2 * 24 * 60 * 60 * 1000;
    var time_ret = get_specified_time(need_del_time);
    var from_timestamp = time_ret[0];
    var to_timestamp = time_ret[1];

    var metric = $(".monitor_metric").selectpicker("val");
    var host = $(".monitor_host").val();
    var data = {
        "host": host,
        "metric": metric,
        "start_time": from_timestamp,
        "stop_time": to_timestamp
    };
    var get_monitor_charts_list_data_url = "monitormetricvalue";
    get_monitor_charts_list_data(get_monitor_charts_list_data_url, data, 1, current_select_text, from_timestamp, to_timestamp);
    toogle_time_button();


});
$(".last_seven_days").click(function () {
    var current_select_text = $(".last_seven_days a").text();
    var need_del_time = 7 * 24 * 60 * 60 * 1000;
    var time_ret = get_specified_time(need_del_time);
    var from_timestamp = time_ret[0];
    var to_timestamp = time_ret[1];

    var metric = $(".monitor_metric").selectpicker("val");
    var host = $(".monitor_host").val();
    var data = {
        "host": host,
        "metric": metric,
        "start_time": from_timestamp,
        "stop_time": to_timestamp
    };
    var get_monitor_charts_list_data_url = "monitormetricvalue";
    get_monitor_charts_list_data(get_monitor_charts_list_data_url, data, 1, current_select_text, from_timestamp, to_timestamp);
    toogle_time_button();


});
$(".last_thirty_days").click(function () {
    var current_select_text = $(".last_thirty_days a").text();
    var need_del_time = 30 * 24 * 60 * 60 * 1000;
    var time_ret = get_specified_time(need_del_time);
    var from_timestamp = time_ret[0];
    var to_timestamp = time_ret[1];

    var metric = $(".monitor_metric").selectpicker("val");
    var host = $(".monitor_host").val();
    var data = {
        "host": host,
        "metric": metric,
        "start_time": from_timestamp,
        "stop_time": to_timestamp
    };
    var get_monitor_charts_list_data_url = "monitormetricvalue";
    get_monitor_charts_list_data(get_monitor_charts_list_data_url, data, 1, current_select_text, from_timestamp, to_timestamp);
    toogle_time_button();


});
$(".last_five_minutes").click(function () {
    var current_select_text = $(".last_five_minutes a").text();
    var need_del_time = 5 * 60 * 1000;
    var time_ret = get_specified_time(need_del_time);
    var from_timestamp = time_ret[0];
    var to_timestamp = time_ret[1];

    var metric = $(".monitor_metric").selectpicker("val");
    var host = $(".monitor_host").val();
    var data = {
        "host": host,
        "metric": metric,
        "start_time": from_timestamp,
        "stop_time": to_timestamp
    };
    var get_monitor_charts_list_data_url = "monitormetricvalue";
    get_monitor_charts_list_data(get_monitor_charts_list_data_url, data, 1, current_select_text, from_timestamp, to_timestamp);
    toogle_time_button();


});
$(".last_fifteen_minutes").click(function () {
    var current_select_text = $(".last_fifteen_minutes a").text();
    var need_del_time = 15 * 60 * 1000;
    var time_ret = get_specified_time(need_del_time);
    var from_timestamp = time_ret[0];
    var to_timestamp = time_ret[1];

    var metric = $(".monitor_metric").selectpicker("val");
    var host = $(".monitor_host").val();
    var data = {
        "host": host,
        "metric": metric,
        "start_time": from_timestamp,
        "stop_time": to_timestamp
    };
    var get_monitor_charts_list_data_url = "monitormetricvalue";
    get_monitor_charts_list_data(get_monitor_charts_list_data_url, data, 1, current_select_text, from_timestamp, to_timestamp);
    toogle_time_button();


});
$(".last_thirty_minutes").click(function () {
    var current_select_text = $(".last_thirty_minutes a").text();
    var need_del_time = 30 * 60 * 1000;
    var time_ret = get_specified_time(need_del_time);
    var from_timestamp = time_ret[0];
    var to_timestamp = time_ret[1];

    var metric = $(".monitor_metric").selectpicker("val");
    var host = $(".monitor_host").val();
    var data = {
        "host": host,
        "metric": metric,
        "start_time": from_timestamp,
        "stop_time": to_timestamp
    };
    var get_monitor_charts_list_data_url = "monitormetricvalue";
    get_monitor_charts_list_data(get_monitor_charts_list_data_url, data, 1, current_select_text, from_timestamp, to_timestamp);
    toogle_time_button();


});
$(".last_one_hours").click(function () {
    var current_select_text = $(".last_one_hours a").text();
    var need_del_time = 60 * 60 * 1000;
    var time_ret = get_specified_time(need_del_time);
    var from_timestamp = time_ret[0];
    var to_timestamp = time_ret[1];

    var metric = $(".monitor_metric").selectpicker("val");
    var host = $(".monitor_host").val();
    var data = {
        "host": host,
        "metric": metric,
        "start_time": from_timestamp,
        "stop_time": to_timestamp
    };
    var get_monitor_charts_list_data_url = "monitormetricvalue";
    get_monitor_charts_list_data(get_monitor_charts_list_data_url, data, 1, current_select_text, from_timestamp, to_timestamp);
    toogle_time_button();


});
$(".last_three_hours").click(function () {
    var current_select_text = $(".last_three_hours a").text();
    var need_del_time = 3 * 60 * 60 * 1000;
    var time_ret = get_specified_time(need_del_time);
    var from_timestamp = time_ret[0];
    var to_timestamp = time_ret[1];

    var metric = $(".monitor_metric").selectpicker("val");
    var host = $(".monitor_host").val();
    var data = {
        "host": host,
        "metric": metric,
        "start_time": from_timestamp,
        "stop_time": to_timestamp
    };
    var get_monitor_charts_list_data_url = "monitormetricvalue";
    get_monitor_charts_list_data(get_monitor_charts_list_data_url, data, 1, current_select_text, from_timestamp, to_timestamp);
    toogle_time_button();


});
$(".last_six_hours").click(function () {
    var current_select_text = $(".last_six_hours a").text();
    var need_del_time = 6 * 60 * 60 * 1000;
    var time_ret = get_specified_time(need_del_time);
    var from_timestamp = time_ret[0];
    var to_timestamp = time_ret[1];

    var metric = $(".monitor_metric").selectpicker("val");
    var host = $(".monitor_host").val();
    var data = {
        "host": host,
        "metric": metric,
        "start_time": from_timestamp,
        "stop_time": to_timestamp
    };
    var get_monitor_charts_list_data_url = "monitormetricvalue";
    get_monitor_charts_list_data(get_monitor_charts_list_data_url, data, 1, current_select_text, from_timestamp, to_timestamp);
    toogle_time_button();


});
$(".last_twelve_hours").click(function () {
    var current_select_text = $(".last_twelve_hours a").text();
    var need_del_time = 12 * 60 * 60 * 1000;
    var time_ret = get_specified_time(need_del_time);
    var from_timestamp = time_ret[0];
    var to_timestamp = time_ret[1];

    var metric = $(".monitor_metric").selectpicker("val");
    var host = $(".monitor_host").val();
    var data = {
        "host": host,
        "metric": metric,
        "start_time": from_timestamp,
        "stop_time": to_timestamp
    };
    var get_monitor_charts_list_data_url = "monitormetricvalue";
    get_monitor_charts_list_data(get_monitor_charts_list_data_url, data, 1, current_select_text, from_timestamp, to_timestamp);
    toogle_time_button();


});
$(".last_days").click(function () {
    var current_select_text = $(".last_days a").text();
    var need_del_time = 24 * 60 * 60 * 1000;
    var time_ret = get_specified_time(need_del_time);
    var from_timestamp = time_ret[0];
    var to_timestamp = time_ret[1];

    var metric = $(".monitor_metric").selectpicker("val");
    var host = $(".monitor_host").val();
    var data = {
        "host": host,
        "metric": metric,
        "start_time": from_timestamp,
        "stop_time": to_timestamp
    };
    var get_monitor_charts_list_data_url = "monitormetricvalue";
    get_monitor_charts_list_data(get_monitor_charts_list_data_url, data, 1, current_select_text, from_timestamp, to_timestamp);
    toogle_time_button();


});





