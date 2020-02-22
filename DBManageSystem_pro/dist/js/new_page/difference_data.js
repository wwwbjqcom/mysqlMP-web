//差异数据
var difference_data_data = JSON.stringify({"cluster_name": ""});
var difference_data_url = "getsqls";
var language_custom = {
    processing: 'Loading ...',
    paginate: {
        first: "«",
        previous: "‹",
        next: "›",
        last: "»"
    },
    search: "搜索",
    select: {
        rows: {
            _: "选择 %d",
            0: ""
        }
    },
    lengthMenu: "每页 当前 _MENU_",
    info: 'Displays the results of items _START_ to _END_; A total of _TOTAL_ entries',
    infoFiltered: "",
    infoEmpty: ""

};
var different_data_tb_obj = "";


function click_difference_data_render() {
    $(".click_rep_difference_data_tb").empty();

    var tmp_difference_data_tb = "<table id=\"different_data_tb\" class=\"table table-striped\"\n" +
        "                                                               style=\"table-layout:fixed;word-break:break-all;width: 99%; font-size: 14px\">\n" +
        "                                                            <thead>\n" +
        "                                                            <tr>\n" +
        "                                                                <th style=\"width: 30px\"></th>\n" +
        "                                                                <th style=\"width: 30px\"></th>\n" +
        "                                                                <th style=\"width: 90px\">集群名</th>\n" +
        "                                                                <th style=\"width: 110px\">Host</th>\n" +
        "                                                                <th style=\"width: 440px\">原始sql</th>\n" +
        "                                                                <th style=\"width: 400px\">已回滚SQL</th>\n" +
        "                                                                <th style=\"width: 110px\">时间</th>\n" +
        "                                                                <!--<th style=\"width: 30px\"></th>-->\n" +
        "                                                                <!--<th style=\"width: 30px\"></th>-->\n" +
        "                                                                <!--<th style=\"width: 90px\">集群名</th>-->\n" +
        "                                                                <!--<th style=\"width: 110px\">Host</th>-->\n" +
        "                                                                <!--<th style=\"width: 440px\">原始sql</th>-->\n" +
        "                                                                <!--<th style=\"width: 400px\">已回滚SQL</th>-->\n" +
        "                                                                <!--<th style=\"width: 110px\">时间</th>-->\n" +
        "                                                            </tr>\n" +
        "                                                            </thead>\n" +
        "                                                        </table>";

    $(".click_rep_difference_data_tb").append(tmp_difference_data_tb);
    different_data_tb_obj = $('#different_data_tb').DataTable({
        dom: '<"mailbox-controls custom_search"f>t<"btn-group custom_length"l><"pull-right custom_page"p>',
        serverSide: false,
        ajax: {
            // "url": difference_data_url,
            type: "POST",
            contentType: "application/json",
            data: function ( d ) {
                return difference_data_data;
            },
            url: difference_data_url,
            dataSrc: "value.sql_info"
        },

        columns: [
            {
                data: "host",
                render: function (data, type, full, row) {
                    return "<td><input type='checkbox'></td>"
                }
            },
            {
                data: "host",
                className: "mailbox-star",
                render: function (data, type, full, row) {
                    if (full.confirm == true || full.confirm == "true") {
                        var temp_html = "<td><a><i class=\"fa fa-star text-yellow\"></i></a></td>"
                    } else {
                        var temp_html = "<td><a><i class=\"fa fa-star-o text-yellow\"></i></a></td>"
                    }
                    return temp_html
                }
            },
            {data: "cluster_name"},
            {data: "host"},
            {data: "current"},
            {data: "rollback"},
            {data: "time"}

        ],
        ordering: false,
        lengthMenu: [[10, 15, 25, 50, -1], [10, 15, 25, 50, "All"]],
        language: language_custom

    });
}
