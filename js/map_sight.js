var dataUrl = "./data/shanghai.json";
var dataUrlBackup = "https://tktonny.github.io/CPC/data/shanghai.json";
var sight;
var sightList = [];
var count = 0;
var remove_count = 0;
var geo_X, geo_Y
var city
$(document).ready(function() {
    initsights();
    initgeo();
});
var initgeo = function() {
    $.ajax({
        url: 'http://api.map.baidu.com/location/ip?ak=AgOfu3ySh60dOf4sFHgEZDClheWAP1ah',
        type: 'POST',
        dataType: 'jsonp',
        success: function(data) {
            geo_X = data.content.point.x;
            geo_Y = data.content.point.y;
            city = JSON.stringify(data.content.address_detail.city)
        }
    });
    var map = new BMap.Map("container");
    // 创建地图实例  
    var point = new BMap.Point(121.35, 31.25);
    // 创建点坐标  
    map.centerAndZoom(point, 12);
    // 初始化地图，设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
    var scaleCtrl = new BMapGL.ScaleControl(); // 添加比例尺控件
    map.addControl(scaleCtrl);
    var zoomCtrl = new BMapGL.ZoomControl(); // 添加比例尺控件
    map.addControl(zoomCtrl);
    map.addEventListener('tilesloaded', function() {
        alert('地图加载完成！');
    })
}

var initsights = function() {
    $.ajax({
        url: dataUrl,
        type: 'get',
        success: function(res) {
            if (res.msg === "success") {
                sights = res.sightslist;
                //console.log(sights)
                var html = "";

                for (var i in sights) {
                    html += '<div class="item">' +
                        '       <div class="card more-arrow">' +
                        '           <div class="el-image pic">' +
                        '              <img src="' + sights[i].img_url + '" alt=""class="el-image__inner" style="object-fit: cover;">' +
                        '           </div>' +
                        '           <div class="title_">' +
                        '               <span class="cn"><a href=' + sights[i].link + '>' + sights[i].name + '</a></span>' +
                        '               <span class="en">' + sights[i].open + '</span>' +
                        '           </div>' +
                        '       <div class="beento">票价：' + sights[i].ticket + '</div>' +
                        '       <div class="add-city" onclick="add_sights(this,event)" id ="' + i + '"><span>添加行程</span></div>' +
                        '       </div>' +
                        '   </div>';
                }
                //console.log(html)
                $("#sight").html(html);

                return;
            }
            alert("获取数据失败");
        },
        error: function(res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup)) {
                this.url = this.url.replace(dataUrl, dataUrlBackup);
                $.ajax(this);
            }
        }
    })
};

function add_sights(add1, add2) {
    $(".plan-panel").addClass('show');
    //console.log(add1);
    //console.log(add2);
    //console.log(add1.id);
    var id = add1.id;
    sightList.push(sights[id]);
    //console.log(sightList);
    var html = '';
    html += '<div class="plan-city handle" id = "remove' + count + '">' +
        '       <span class="remove" onclick="remove_sights(this,event)" id ="' + count + '"></span>' +
        '       <div class="city-name">' + sights[id].name + '</div>' +
        '       <div class="staydays">' +
        '       </div>' +
        '   </div>';
    $("#sight-list").append(html);
    //console.log(sightList[count]);
    count++;
    remove_count++;
}

var remove_sights = function(remove1, remove2) {
    remove_count--;
    //console.log(remove1);
    //console.log(remove2);
    //console.log(remove1.id);
    $("#remove" + remove1.id).remove();
    delete sightList[remove1.id];
    //console.log(sightList);
}