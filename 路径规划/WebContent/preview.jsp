<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <script src="js/html2canvas.js"></script>
    <script src="js/jquery.min.js"></script>
    <script src="js/FileSaver.min.js"></script>
    <script src="js/jquery.wordexport.js"></script>
    <script src="dist/echarts.min.js"></script>
    <script src="http://api.map.baidu.com/api?v=3.0&ak=24iwY51tDWfEiOyE7kjtZo6kG54pN5Lm"></script>
    <script src="dist/extension/bmap.min.js"></script>
    <script src="js/shanghai.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <style>
        * {
            padding: 0;
            font-family: "Helvetica Neue", Helvetica, "Avenir Next", Avenir, "Lantinghei SC", "Hiragino Sans GB", "Microsoft YaHei", "å¯°î¿èéå´ç²¦", STHeiti, "WenQuanYi Micro Hei", SimSun, sans-serif;
            -webkit-font-smoothing: antialiased;
        }

        html,
        body {
            position: relative;
            height: 100%;
        }

        .container {
            width: 100%;
        }

        header {
            position: fixed;
            height: 60px;
            background-color: rgba(0, 0, 0, 0.3);
            color: white;
            line-height: 60px;
            font-size: 18px;
            z-index: 999;
        }

        #map {
            position: relative;
            height: 100%;
        }

        .coors {
            display: none;
        }

        .navi {
            float: left;
            margin-left: 2%;
            width: 90%;
            height: 60px;
        }

        .color {
            float: left;
            width: 16.6%;
            height: 30px;
            padding-right: 1%;
            line-height: 30px;
        }

        .export {
            float: right;
            padding: 0 15px;
            text-align: center;
            line-height: 60px;
            font-size: 20px;
            font-weight: 700;
            cursor: pointer;
        }
    </style>
    <script type="text/javascript">
        var colors = ["#E60012", "#EB6100", "#F39800", "#FCC800", "#FFF100", "#CFDB00",
            "#8FC31F", "#22AC38", "#009944", "#009B6B", "#009E96", "#00A0C1",
            "#00A0E9", "#0086D1", "#0068B7", "#00479D", "#1D2088", "#601986",
            "#920783", "#BE0081", "#E4007F", "#E5006A", "#E5004F", "#E60033"];
        var points = [];
        var names = []
        var contents = [];
        var durations = [];
        var addrs = [];
        var len = 0;
        // 创建地理编码实例, 并配置参数获取乡镇级数据
        var myGeo = new BMap.Geocoder({ extensions_town: true });

        $(document).ready(function () {
            var coors = $(".coors")[0].innerHTML.trim().split(",");
            names = $(".names")[0].innerHTML.trim().split(",");
            len = coors.length / 2;
            for (let i = 0; i < coors.length; i += 2) {
                var x = coors[i];
                var y = coors[i + 1];
                points.push(new BMap.Point(x, y));
            }
            var interval = parseInt(24 / (coors.length / 2 - 1));
            for (let i = 0; i < points.length - 1; i++) {
                var driving = new BMap.DrivingRoute(bmap, {
                    renderOptions: { map: bmap, autoViewport: true }, onSearchComplete: function (result) {
                        var plan = result.getPlan(0);
                        var t = plan.getDuration(true)+"&"+i;
                        durations.push(t);
                        var route = plan.getRoute(0);
                        var steps = route.getNumSteps();
                        var discript = []
                        for (let j = 0; j < steps; j++) {
                            (function (j, steps) {
                                var step = route.getStep(j);
                                var dist = step.getDistance(true);
                                var point = step.getPosition();
                                // 根据坐标得到地址描述    
                                myGeo.getLocation(point, function (result) {
                                    if (result) {
                                        discript.push(result.address + "(" + dist + ")&" + j);
                                        if (j == steps - 1) {
                                            discript = "，经"+asyncSort(discript, "，", true);
                                            addrs.push(discript);
                                            $(".export")[0].style.display = "block";
                                        }
                                    }
                                });
                            })(j, steps);
                        }
                    }, onPolylinesSet: function (routes) {
                        var p = routes[0].getPolyline();
                        p.setStrokeColor(colors[i * interval]);
                        var content = '<div class="color">' +
                            '<span style="float:left">Step' + (i + 1) + '：</span>' +
                            '<div style="float:left; margin:10px 0; width:60%; height:10px; background-color:' + colors[i * interval] + '"></div>' +
                            '</div>' + "&" + i;
                        contents.push(content);
                        if (contents.length == points.length - 1) {
                            contents = asyncSort(contents, "", true);
                            $(".navi")[0].innerHTML = contents;

                            bmap.setViewport(points);
                        }
                    }
                });
                driving.search(points[i], points[i + 1]);
            }
        });

        function exportImg() {
            /* $(".export")[0].style.display = "none";
            new html2canvas($("#main")[0], {
                useCORS: true,          //允许跨域
                proxy: "http://api.map.baidu.com/images",
                scale: 1
            }).then(canvas => {
                // canvas为转换后的Canvas对象
                let img = new Image();
                img.src = canvas.toDataURL();  // 导出图片
                //调用下载方法 
                if (browserIsIe()) { //假如是ie浏览器    
                    DownLoadReportIMG(img.src);
                }
                else {
                    download(img.src);
                }
            });
            $(".export")[0].style.display = "block"; */

            var content = "";
           	durations = asyncSort(durations, "", false);
            for (let i = 0; i < len - 1; i++) {
                content += "<div>Step" + (i + 1) + "：从" + names[i] + addrs[i] + "，到" + names[i + 1] + "，需要" + durations[i] + "</div>" + "<div><br></div>";
            }
            $("#word")[0].innerHTML = content;
            $("#word").wordExport("路径规划");
        }
		
        function asyncSort(items, seperator, flag){
        	items = items.sort(function (a, b) {
                var idxa = a.split("&")[1];
                var idxb = b.split("&")[1];
                return idxa - idxb;
            });
            items = items.map(function (item) {
                return item.split("&")[0];
            })
            if (flag){
            	return items.join(seperator);
            }
            return items;
        }
        
        /* function DownLoadReportIMG(imgPathURL) {
            //如果隐藏IFRAME不存在，则添加
            if (!document.getElementById("IframeReportImg"))
                $('<iframe style="display:none;" id="IframeReportImg" name="IframeReportImg" onload="DoSaveAsIMG();" width="0" height="0" src="about:blank"></iframe>').appendTo("body");
            if (document.all.IframeReportImg.src != imgPathURL) {
                //加载图片
                document.all.IframeReportImg.src = imgPathURL;
            }
            else {
                //图片直接另存为
                DoSaveAsIMG();
            }
        }

        function DoSaveAsIMG() {
            if (document.all.IframeReportImg.src != "about:blank")
                window.frames["IframeReportImg"].document.execCommand("SaveAs");
        }

        // 另存为图片
        function download(src) {
            var $a = $("<a></a>").attr("href", src).attr("download", "img.png");
            $a[0].click();
        }

        //判断是否为ie浏览器
        function browserIsIe() {
            if (!!window.ActiveXObject || "ActiveXObject" in window)
                return true;
            else
                return false;
        } */

    </script>
    <title>薪火之路</title>
</head>

<body id="main">
	<%
    	String coors = request.getParameter("coors"); 
    	String names = new String(request.getParameter("names").getBytes("ISO-8859-1"),"utf-8");
    %>
    <header class="container">
        <div class="navi"></div>
        <div class="export" style="display:none" onclick="exportImg()">导出</div>
    </header>

    <div class="map" id="map"></div>
    <div id="word" style="display:none"></div>
    <div class="coors">
        <%=coors %>
    </div>
    <div class="names">
        <%=names %>
    </div>

    <script>
        var chartDom = document.getElementById('map');
        var myChart = echarts.init(chartDom);

        var option = {
            tooltip: {
                trigger: 'item'
            },
            bmap: {
                center: [121.504437, 31.309766],
                zoom: 18,
                roam: true
            }
        };
        myChart.setOption(option);
        var bmap = myChart.getModel().getComponent('bmap').getBMap();
    </script>
</body>

</html>