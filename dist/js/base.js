$(function () {
    'use strict';

    function get_user_info(url, data) {
        $.ajax({
            url: url,
            data: JSON.stringify(data),
            type: "post",
            contentType: "application/json",
            // head: {
            //     "X-CSRFToken": getCookie("csrftoken")
            // },
            success: function (e) {
                if (e.status == 3 || e.status == "3") {
                    var user_name = e.value.user_name;
                    var hook_id = e.value.hook_id;
                    $(".show_username").text(user_name);
                    var hook_id_val = "hook_id:  " + hook_id.toString();
                    $(".hook_id").text(hook_id_val);
                } else {
                    $(".show_username").text("Error..")
                }
            },
            error: function (err) {
                $(".show_username").text("Error..");
                $(".hook_id").text("errorHook..");
            }
        });
    }

    var get_user_info_url = "getuserinfo";
    var get_user_info_data = {};
    get_user_info(get_user_info_url, get_user_info_data)

});