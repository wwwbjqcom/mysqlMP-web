
var dbha_log_data = {};
var dbha_log_url = "getlogdata";
var dbha_log_language_custom = {
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
var dbha_log_tb_obj = "";


function click_dbha_log_render() {
    $(".dbha_log_tb_div").empty();

    var tmp_dbha_log_tb = "<table id=\"dbha_log_tb\" class=\"table no-padding\"\n" +
        "                                               style=\"table-layout:fixed;word-break:break-all;font-size: 13px;\">\n" +
        "                                            <thead style=\"background: #ddd\">\n" +
        "                                                <tr>\n" +
        "                                                    <th style='width: 49px;'>ID</th>\n" +
        "                                                    <th style='width: 143px;'>RowKey</th>\n" +
        "                                                    <th>Data</th>\n" +
        "                                                </tr>\n" +
        "                                            </thead>\n" +
        "                                        </table>";

    $(".dbha_log_tb_div").append(tmp_dbha_log_tb);
    dbha_log_tb_obj = $('#dbha_log_tb').DataTable({
        dom: '<"mailbox-controls custom_search"f>t<"btn-group custom_length"l><"pull-right custom_page"p>',
        serverSide: false,
        ajax: {
            // "url": difference_data_url,
            type: "POST",
            contentType: "application/json",
            data: function ( d ) {
                return JSON.stringify(dbha_log_data);
            },
            url: dbha_log_url,
            dataSrc: "value.log_data"
        },

        columns: [
            {
                data: null,
                render: function (data, type, full, row) {
                    return row.row + 1;
                }
            },
            {data: "row_key"},
            {
                data: "data",
                render: function (data, type, full, row) {
                    return JSON.stringify(data)
                }
            }

        ],
        ordering: false,
        lengthMenu: [[10, 15, 25, 50, -1], [10, 15, 25, 50, "All"]],
        language: dbha_log_language_custom

    });

}
