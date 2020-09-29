window.onload = function () {
        var disX = disY = 0;                         // 鼠标距离div的左距离和上距离
        var drag = document.getElementById("drag");  // 得到drag对象

        // 鼠标按下drag时
        drag.onmousedown = function (e) {
            var evnt = e || event;                   // 得到鼠标事件
            disX = evnt.clientX - drag.offsetLeft;   // 鼠标横坐标 - drag的left
            disY = evnt.clientY - drag.offsetTop;    // 鼠标纵坐标 - drag的top

            // 鼠标移动时
            document.onmousemove = function (e) {
                var evnt = e || event;
                var x = evnt.clientX - disX;
                var y = evnt.clientY - disY;
                var window_width = document.documentElement.clientWidth - drag.offsetWidth;
                var window_height = document.documentElement.clientHeight - drag.offsetHeight;

                x = (x < 0) ? 0 : x;                          // 当drag到窗口最左边时
                x = (x > window_width) ? window_width : x;    // 当drag到窗口最右边时
                y = (y < 0) ? 0 : y;                          // 当drag到窗口最上边时
                y = (y > window_height) ? window_height : y;  // 当drag到窗口最下边时

                drag.style.left = x + "px";
                drag.style.top = y + "px";
            };

            // 鼠标抬起时
            document.onmouseup = function () {
                document.onmousemove = null;
                document.onmouup = null;
            };

            return false;
        };
    };