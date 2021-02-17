var dataUrlm  = "http://api.tianapi.com/txapi/ncovcity/index?key=51ada08c82189b4e519e27149e77e6fd";
var dataUrlBackupm  = "https://lab.isaaclin.cn/nCoV/api/area";

$(document).ready(function () {
    initChart_m();
});

var initChart_m = function () {
    $.ajax({
        url: dataUrlm,
        type: 'get',
        success: function (res) {
            if (res.msg == "success") {
                var chartData = res.newslist;
                //console.log(chartData)
                var datalist_map = [];
                datalist_map.push({
                    name: '南海诸岛',
                    value: 0
                });
                //console.log(datalist_map)
                for (var i in chartData) {
                    var provincename = chartData[i].provinceShortName;
                    var confirm = chartData[i].confirmedCount;
                    datalist_map.push({
                        name: provincename,
                        value: confirm
                    });

                }
                console.log(datalist_map);
                initChart_map(datalist_map);
                return;
            }
            alert("map获取数据失败");
        }, 
        error: function (res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackupm)) {
                this.url = this.url.replace(dataUrlm,dataUrlBackupm);
                $.ajax(this);
            }
        }
    });
}

var initChart_map = function (datalist) {
    var myChart_leftmap = echarts.init(document.getElementById('map'));      
    var option = {
        title: {
            text: '累计确诊数',
        },
        tooltip: {
            formatter: function(e, t, n) {
                return .5 == e.value ? e.name + "：有疑似病例" : e.seriesName + "<br />" + e.name + "：" + e.value
            }
        },
        visualMap: {
            min: 0,
            max: 1000,
            left: 0,
            bottom: 0,
            show: false,
            pieces: [
                {min: 2000, color: '#bf360c'}, 
                {min: 1200, max: 2000, color: '#E64A19'},
                {min: 900, max: 1200, color: '#FF5722'},
                {min: 600, max: 900, color: '#FF7043'},
                {min: 400, max: 600, color: '#FF8A65'},
                {min: 100, max: 400, color: '#FFAB91'},
                {min: 50, max: 100, color: '#FFCCBC'},
                {min: 10, max: 50, color: '#FBE9E7'},
                {value: 0, color: '#fff'},
            ]
        },
        geo: {
            center: [104, 25],
            map: "china",
            roam: !1,
            scaleLimit: {
                min: 1,
                max: 2
            },
            zoom: 1.23,
            top: 120,
            label: {
                show: false
            },
            itemStyle: {
                normal: {
                    borderColor: "rgba(0, 0, 0, 0.2)"
                },
                emphasis: {
                    areaColor: "#b71c1c",
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    borderWidth: 0
                }
            }
        },
        series: [{
            name: "确诊病例",
            type: "map",
            geoIndex: 0,
            data: datalist,
        }]
    };
    myChart_leftmap.setOption(option);
}
