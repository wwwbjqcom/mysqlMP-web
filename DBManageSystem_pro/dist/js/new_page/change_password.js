function check_password_consistency(new_passwd, old_passwd){
    if(new_passwd == old_passwd){
        return true
    }else{
        return false
    }
}

$("#check_password").blur(function () {
    var new_password =  $("#new_password").val();
    var check_password = $("#check_password").val();
    var check_ret = check_password_consistency(new_password, check_password);
    if(!check_ret){
        $(".error_check_passwd").show();
    }else{
        $(".error_check_passwd").hide();
    }
});

function check_input_null(original_password, new_password, check_password){
    if(!original_password || !new_password || !check_password){
        return false
    }else{
        return true
    }
}

$("#submit_change_password").click(function () {
    var user_name = $(".current_username").text();
    var original_password = $("#original_password").val();
    var new_password =  $("#new_password").val();
    var check_password = $("#check_password").val();

    var null_check_ret = check_input_null(original_password, new_password, check_password);
    if(!null_check_ret){
        swal("存在空值", "请输入值", "error");
        return false
    }

    var check_ret = check_password_consistency(new_password, check_password);
    if(!check_ret){
        $(".error_check_passwd").show();
        return false
    }else{
        $(".error_check_passwd").hide();
    }
    var edituser_data = {
        //"user_name": user_name,
        "user_name": user_name,
        "password": new_password
    };

    $.ajax({
        type: "post",
        url: "edituser", //填写路由地址
        //url: "./test/add_node.json", //填写路由地址
        contentType: "application/json",
        async: false,
        data: JSON.stringify(edituser_data),
        success: function (data) {
            if(data.status == 1 || data.status == "1"){
                swal("修改密码成功", "3秒后自动跳转", "success");
                setTimeout(function () {
                    window.location.href="login.html";
                }, 2500)
            }else{
                swal("修改密码失败", data.err, "error");
            }

        },
        error: function (error) {
            console.log("edit user failed");
            swal("服务器错误，请联系管理员", "", "error");

        }
    });
});
