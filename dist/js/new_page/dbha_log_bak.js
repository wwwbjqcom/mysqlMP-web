//定义
var term = null;
function initResultTerminal() {
    term = new Terminal({
        cursorBlink: false,
        screenKeys: false,
        fontFamily: 'monaco, Consolas, "Lucida Console", monospace',
        fontSize: 13,
        rows: 40,
        cols: 170,
        rightClickSelectsWord: true,
        disableStdin: true,
        theme: {
            background: '#1f1b1b'
        }
    });
    term.open(document.getElementById('term'));
    var init_xterm_data ="\r\n" + "log窗口初始化完成" + "\r\n" + "开始写入日志";
    term.write(init_xterm_data + "\r\n");

}
function get_log_data(url, data) {
    $.ajax({
        type: "post",
        url: url, //填写路由地址
        contentType: "application/json",
        async: false,
        data: JSON.stringify(data),
        success: function (data) {
            if(data.status == 3 || data.status == "3"){
                console.log("get log data ok");
                //console.log(data);
                if (!term) {
                    initResultTerminal()
                }
                term.clear();
                //term.write(data.log_data + "\r\n");
                for(var i = 0; i< data.value.log_data.length; i++){
                    term.write(JSON.stringify(data.value.log_data[i]) + "\r\n");
                }
            }else{
                console.log("get log data failed");
                if (!term) {
                    initResultTerminal()
                }
                term.clear();
                term.write(JSON.stringify(data.err) + "\r\n");
            }

        },
        error: function (error) {
            console.log("get log data failed");
            console.log(error);
            if (!term) {
                initResultTerminal()
            }
            term.clear();
            term.write("日志获取失败，服务错误" + "\r\n");

        }
    });

}

