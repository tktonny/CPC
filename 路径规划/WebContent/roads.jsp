<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <script src="js/jquery.min.js"></script>
    <script src="dist/echarts.min.js"></script>
    <script src="http://api.map.baidu.com/api?v=3.0&ak=24iwY51tDWfEiOyE7kjtZo6kG54pN5Lm"></script>
    <script src="dist/extension/bmap.min.js"></script>
    <script src="js/shanghai.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/roads.css" rel="stylesheet">
    <script type="text/javascript">
    	var sights = sightsList.slice(0, 5);
    	var sightsSname = sights[0].name;
        var sightsScoor = sights[0].value;
        var sightsNames = []
        var sightsCoors = []
        var parseCoors = []
        parseCoors.push(sightsScoor);
        for (let i=1;i<4;i++){
        	sightsNames.push(sights[i].name);
        	sightsCoors.push(sights[i].value);
        	parseCoors.push(sights[i].value);
        }
        var sightsEname = sights[4].name;
        var sightsEcoor = sights[4].value;
        parseCoors.push(sightsEcoor);
        
        var stats = [1];
        for (let i=1;i<4;i++){
        	stats.push(0);
        }
        
        $(document).ready(function () {         
            $.post("path.jsp", {
                sname: sightsSname, scoor: JSON.stringify(sightsScoor),
                names: JSON.stringify(sightsNames), coors: JSON.stringify(sightsCoors),
                ename: sightsEname, ecoor: JSON.stringify(sightsEcoor)
            }, function (res) {
                names = res.trim().replace("[", "").replace("]", "").split(", ");
                var num = names.length;
                
                $("#as")[0].innerHTML = "起点："+names[0];
                $("#ae")[0].innerHTML = "终点："+names[num-1];
                
                var ul = $(".planner ul");
                var content = "";
                for (var i = 0; i < num - 1; i++) {
                    content += '<li>' +
                        '<h2 onclick="changeStep(this)">S' + (i + 1) + '</h2>' +
                        '</li>';
                }
                ul[0].innerHTML = content;

                var div = $(".start-header .name")[0];
                content = '<h4>' + names[0] + '</h4>' +
                    '<button class="btn" onclick="viewSurroundings(this)">查看周边&nbsp;&nbsp;<font size="4">+</font></button>' +
                    '<img src="img/shanghai_sight/'+names[0]+'.png" class="view">' +
                    '<p class="discription">'+queryIntro(names[0])+'</p>';
                div.innerHTML = content;
                
                $(".start-header .importance")[0].innerHTML = queryImp(names[0]);

                div = $(".end-header .name")[0];
                content = '<h4>' + names[1] + '</h4>' +
                    '<button class="btn" onclick="viewSurroundings(this)">查看周边&nbsp;&nbsp;<font size="4">+</font></button>' +
                    '<img src="img/shanghai_sight/'+names[1]+'.png" class="view">' +
                    '<p class="discription">'+queryIntro(names[1])+'</p>';
                div.innerHTML = content;
				
                $(".end-header .importance")[0].innerHTML = queryImp(names[1]);
                
                $(".planner li").first().css("background-color", "#ccc");

                var from = queryData(names[0]);
                var to = queryData(names[1]);
                from = new BMap.Point(from[0], from[1]);
                to = new BMap.Point(to[0], to[1]);
                search(from, to, 0);
                
                $(".start-surroundings, .end-surroundings").css("display", "none");
            });
        });


        function search(from, to, stat) {
        	//网速不佳，我闭包大法天下无敌
            (function (stat){
            	var driving = new BMap.DrivingRoute(bmap, {
                    renderOptions: { map: bmap, autoViewport: true }, onSearchComplete: function (result){
                    	var t = result.getPlan(0).getDuration(true);
                    	$(".dura")[0].innerHTML = t;
                    }, onPolylinesSet: function (routes) {
                        var p = routes[0].getPolyline();
                        p.setStrokeColor("red");
                        if (stats[stat] == 0){
                        	bmap.removeOverlay(p);
                        }
                    }, onMarkersSet: function (pois) {
                    	if (stats[stat] == 0){
                    		var ms = pois[0].marker;
                            var me = pois[1].marker;
                            bmap.removeOverlay(ms);
                            bmap.removeOverlay(me);
                    	}
                    }
                });

                // 不知道坐标时用此方法
                // start = false;
                // end = false;

                // var localStart = new BMap.LocalSearch(bmap, {
                //     renderOptions: { map: bmap, autoViewport: false }, onSearchComplete: function (result) {
                //         var center = result.getPoi(0);
                //         var point = center.point;
                //         start = point;
                //     }, onMarkersSet: function (pois) {
                //         var ms = pois[0].marker;
                //         var me = pois[1].marker;
                //         bmap.removeOverlay(ms);
                //         bmap.removeOverlay(me);
                //     }
                // });

                // var localEnd = new BMap.LocalSearch(bmap, {
                //     renderOptions: { map: bmap, autoViewport: false }, onSearchComplete: function (result) {
                //         var center = result.getPoi(0);
                //         var point = center.point;
                //         end = point;
                //     }, onMarkersSet: function (pois) {
                //         var ms = pois[0].marker;
                //         var me = pois[1].marker;
                //         bmap.removeOverlay(ms);
                //         bmap.removeOverlay(me);
                //     }
                // });

                // localStart.search(from);
                // localEnd.search(to);

                // timer = setInterval(function () {
                //     if (start && end) {
                //         driving.search(start, end);
                //         clearInterval(timer);
                //     }
                // }, 100);

                var nearbyStart = new BMap.LocalSearch(bmap, {
                    renderOptions: { map: bmap, autoViewport: false, selectFirstResult: false }, onSearchComplete: function (result) {
                        var num = result.getNumPois();
                        document.getElementById("us").innerHTML = "";
                        for (var i = 0; i < num; i++) {
                        	if (i == 10){
                            	break;
                            }
                            var poi = result.getPoi(i);
                            var title = poi.title;
                            var address = poi.address; 
                            var phone = poi.phoneNumber;
                            var url = poi.detailUrl;
                            if (phone == undefined) {
                                phone = "暂无";
                            }
                            var content = '<li>' +
                                '<h5><img src="img/景点.png"><span class="surroundings-view">' + title + '</span></h5>' +
                                '<div class="clearfix">' +
                                '<div class="address"><Strong>地址：</Strong></div>' +
                                '<div class="street">' + address + '</div>' +
                                '</div>' +
                                '<div class="clearfix">' +
                                '<div class="tele"><Strong>电话：</Strong></div>' +
                                '<div class="telephone">' + phone + '</div>' +
                                '</div>' +
                                '<a href="' + url + '"><strong>详情：</strong>&nbsp;&nbsp;点击查看&nbsp;>></a>' +
                                '</li>';
                            $("#us").append(content);
                        }
                    }, onMarkersSet: function (pois) {
                        var lis = $("#us li");
                        for (var i = 0; i < lis.length; i++) {
                        	if (i == 10){
                            	break;
                            }
                            //闭包，太坑了，研究了一个小时
                            (function (i) {
                                var li = lis[i];
                                var span = $(li).children(":first").children().eq(1);
                                var marker = pois[i].marker;
                                span.bind("click", function () {
                                    marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                                    setTimeout(function () {
                                        marker.setAnimation(null);
                                    }, 2000);
                                });
                            })(i);
                        }
                        
                        if (stats[stat] == 0){
                        	for (var i=0;i<pois.length;i++){
                        		bmap.removeOverlay(pois[i].marker);
                        	}
                        }
                    }
                });
                var nearbyEnd = new BMap.LocalSearch(bmap, {
                    renderOptions: { map: bmap, autoViewport: false, selectFirstResult: false }, onSearchComplete: function (result) {
                        var num = result.getNumPois();
                        document.getElementById("ue").innerHTML = "";
                        for (var i = 0; i < num; i++) {
                        	if (i == 10){
                            	break;
                            }
                            var poi = result.getPoi(i);
                            var title = poi.title;
                            var address = poi.address;
                            var phone = poi.phoneNumber;
                            var url = poi.detailUrl;
                            if (phone == undefined) {
                                phone = "暂无";
                            }
                            var content = '<li>' +
                                '<h5><img src="img/景点.png"><span class="surroundings-view">' + title + '</span></h5>' +
                                '<div class="clearfix">' +
                                '<div class="address"><Strong>地址：</Strong></div>' +
                                '<div class="street">' + address + '</div>' +
                                '</div>' +
                                '<div class="clearfix">' +
                                '<div class="tele"><Strong>电话：</Strong></div>' +
                                '<div class="telephone">' + phone + '</div>' +
                                '</div>' +
                                '<a href="' + url + '"><strong>详情：</strong>&nbsp;&nbsp;点击查看&nbsp;>></a>' +
                                '</li>';
                            $("#ue").append(content);
                        }
                    }, onMarkersSet: function (pois) {
                        var lis = $("#ue li");
                        for (var i = 0; i < lis.length; i++) {
                        	if (i == 10){
                            	break;
                            }
                            //闭包，太坑了，研究了一个小时
                            (function (i) {
                                var li = lis[i];
                                var span = $(li).children(":first").children().eq(1);
                                var marker = pois[i].marker;
                                span.bind("click", function () {
                                    marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                                    setTimeout(function () {
                                        marker.setAnimation(null);
                                    }, 2000);
                                });
                            })(i);
                        }
                        
                        if (stats[stat] == 0){
                        	for (var i=0;i<pois.length;i++){
                        		bmap.removeOverlay(pois[i].marker);
                        	}
                        }
                    }
                });
                nearbyStart.searchNearby("景点", from, 2000);
                nearbyEnd.searchNearby("景点", to, 2000);
                
                //知道坐标时用此方法
                driving.search(from, to);
            })(stat);
        }

        function queryData(name) {
            var sight = sights.filter(function (sight) {
                return sight.name == name;
            });
            return sight[0].value;
        };
        
        function queryIntro(name) {
        	var sight = sights.filter(function (sight) {
                return sight.name == name;
            });
        	return sight[0].introduction;
        }
        
        function queryImp(name) {
        	var sight = sights.filter(function (sight) {
                return sight.name == name;
            });
        	return sight[0].important;
        }
        
        function changeStep(obj) {
            bmap.clearOverlays();
            $(".planner li").css("background-color", "white");
            $(obj).parent().css("background-color", "#ccc");
            var i = obj.innerHTML.slice(1);
			
            $("#as")[0].innerHTML = names[i-1];
            $("#ae")[0].innerHTML = names[i];
            
            $(".start-surroundings, .end-surroundings").css("display", "none");

            var div = $(".start-header .name")[0];
            content = '<h4>' + names[i - 1] + '</h4>' +
                '<button class="btn" onclick="viewSurroundings(this)">查看周边&nbsp;&nbsp;<font size="4">+</font></button>' +
                '<img src="img/shanghai_sight/'+names[i-1]+'.png" class="view">' +
                '<p class="discription">'+queryIntro(names[i-1])+'</p>';
            div.innerHTML = content;
			
            $(".start-header .importance")[0].innerHTML = queryImp(names[i-1]);
            
            div = $(".end-header .name")[0];
            content = '<h4>' + names[i] + '</h4>' +
                '<button class="btn" onclick="viewSurroundings(this)">查看周边&nbsp;&nbsp;<font size="4">+</font></button>' +
                '<img src="img/shanghai_sight/'+names[i]+'.png" class="view">' +
                '<p class="discription">'+queryIntro(names[i])+'</p>';
                
            $(".end-header .importance")[0].innerHTML = queryImp(names[i]);
                
            div.innerHTML = content;

            var from = queryData(names[i - 1]);
            var to = queryData(names[i]);
            from = new BMap.Point(from[0], from[1]);
            to = new BMap.Point(to[0], to[1]);
            
            for (var j=0;j<stats.length;j++){
            	stats[j] = 0;
            }
            stats[i-1] = 1;
            search(from, to, i-1);
        }

        function viewSurroundings(obj) {
            var clz = $(obj).parent().parent().attr("class");
            var content = $(obj).html();
            var signal = content.slice(-8, -7);
            if (clz == "start-header") {
                if (signal == "+") {
                    obj.innerHTML = '查看周边&nbsp;&nbsp;<font size="4">-</font>';
                    $("#ss").css("display", "block");
                }
                else {
                    obj.innerHTML = '查看周边&nbsp;&nbsp;<font size="4">+</font>';
                    $("#ss").css("display", "none");
                }
            }
            else {
                if (signal == "+") {
                    obj.innerHTML = '查看周边&nbsp;&nbsp;<font size="4">-</font>';
                    $("#es").css("display", "block");
                }
                else {
                    obj.innerHTML = '查看周边&nbsp;&nbsp;<font size="4">+</font>';
                    $("#es").css("display", "none");
                }
            }
        }
        
        function preview(){
        	var tempForm = document.createElement("form");
        	tempForm.method = "post";
        	tempForm.action = "preview.jsp";
        	tempForm.target = "_blank";
        	var hiddenInput1 = document.createElement("input");
        	hiddenInput1.type = "hidden";
        	hiddenInput1.name = "coors";
        	hiddenInput1.value = parseCoors;
        	tempForm.appendChild(hiddenInput1);
        	var hiddenInput2 = document.createElement("input");
        	hiddenInput2.type = "hidden";
        	hiddenInput2.name = "names";
        	hiddenInput2.value = names;
        	tempForm.appendChild(hiddenInput2);
        	
        	if(document.all){ 
        		tempForm.attachEvent("onsubmit",function(){});        //IE 
        	}else{ 
        	    var subObj = tempForm.addEventListener("submit",function(){},false);    //firefox 
        	} 
        	document.body.appendChild(tempForm); 
        	if(document.all){ 
        	    tempForm.fireEvent("onsubmit"); 
        	}else{ 
        	    tempForm.dispatchEvent(new Event("submit")); 
        	} 
        	tempForm.submit(); 
        	document.body.removeChild(tempForm); 
        }
    </script>
    <title>薪火之路</title>
</head>

<body>
    <header class="container">
        <div class="row">
            <div class="col-md-9 col-md-offset-1">
                <ul class="more clearfix">
                    <li><a href="#" id="as">起点</a></li>
                    <div class="vertical-line"></div>
                    <li><a href="#" id="ae">终点</a></li>
                </ul>
            </div>
            <div class="col-md-2">
                <ul class="preview-export clearfix">
                    <li><span style="cursor:pointer" onclick="preview()">预览</span></li>
                    <div class="vertical-line"></div>
                    <li><span style="cursor:pointer" onclick="preview()">导出</a></li>
                </ul>
            </div>
        </div>
    </header>

    <div class="container main">
        <div class="row content">
            <aside class="col-md-1 col-sm-1">
                <div class="planner">
                    <ul>
                        <li>
                            <h2 onclick="changeStep(this)">S1</h2>
                        </li>
                    </ul>
                </div>
            </aside>
            <section class="col-md-3 col-sm-3">
                <div class="details">
                    <div class="details-header">
                        <div class="col-md-4 col-sm-4 start">
                            <h4>出发地</h4>
                        </div>
                        <div class="col-md-4 col-sm-4 duration">
                            <div class="dura">0</div>
                            <img src="img/汽车.png" class="car">
                        </div>
                        <div class="col-md-4 col-sm-4 end">
                            <h4>目的地</h4>
                        </div>
                    </div>
                    <div class="surroundings">
                        <div class="start-header">
                            <div class="name">
                                <h4></h4>
                                <button class="btn" onclick="viewSurroundings(this)">查看周边&nbsp;&nbsp;<font size="4">+
                                    </font></button>
                                <img src="img/shanghai_sight/上海毛泽东故居.png" class="view">
                                <p class="discription"></p>
                            </div>
                            <p class="importance"></p>
                        </div>
                        <div class="start-surroundings" id="ss">
                            <h5>周边景点（点击名字有特殊效果哦）</h5>
                            <ul class="ul-start" id="us">
                            </ul>
                        </div>
                        <div class="end-header">
                            <div class="name">
                                <h4></h4>
                                <button class="btn" onclick="viewSurroundings(this)">查看周边&nbsp;&nbsp;<font size="4">+
                                    </font></button>
                                <img src="img/shanghai_sight/上海毛泽东故居.png" class="view">
                                <p class="discription"></p>
                            </div>
                            <p class="importance"></p>
                        </div>
                        <div class="end-surroundings" id="es">
                        	<h5>周边景点（点击名字有特殊效果哦）</h5>
                            <ul class="ul-end" id="ue">
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <div class="col-md-8 map-container">
                <div class="map" id="map"></div>
            </div>
        </div>
    </div>

    <script>
        var chartDom = document.getElementById('map');
        var myChart = echarts.init(chartDom);

        var option = {
            title: {
                text: '路径规划与推荐',
                left: 'center'
            },
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
        // 获取百度地图实例，使用百度地图自带的控件
        var bmap = myChart.getModel().getComponent('bmap').getBMap();
        bmap.addControl(new BMap.MapTypeControl());
    </script>
</body>

</html>