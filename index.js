function run() {
	var bar = document.getElementById("bar2");
	var total = document.getElementById("total");
	bar.style.width = parseInt(window.getComputedStyle(bar).getPropertyValue('width')) + 1 + "px";
	total.innerHTML = parseInt(bar.clientWidth / 271 * 100);
	if (bar.clientWidth == "271") {
		window.clearTimeout(timeout);
		return;
	}
	var timeout = window.setTimeout("run()", 80);
}

function run2() {
	var bar = document.getElementById("bar2");
	var bar1 = document.getElementById("bar1");
	bar1.style.width = parseInt(window.getComputedStyle(bar1).getPropertyValue('width')) + 1 + "px";
	if (bar1.clientWidth == "271") {
		if (bar.clientWidth != 271) {
			bar1.style.width = 0;
			window.clearTimeout(timeout1);
			var timeout1 = window.setTimeout("run2()", 1);
		}else{
			window.clearTimeout(timeout1);
			window.setTimeout(function(){
				document.getElementById('drag').style.display = 'none'
			}, 1000);
		}
	}
	var timeout1 = window.setTimeout("run2()", 1);
}

window.onload = function () {
	run();
	run2();
	setInterval(function(){
		document.getElementById("bar1").style.width = '1px';
		document.getElementById("bar2").style.width = '1px';
		document.getElementById('drag').style.display = 'unset'
		run();
		run2();
	},40000)

	//拖拽
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
    }