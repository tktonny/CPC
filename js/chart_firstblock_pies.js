var dataUrlp  = "http://api.tianapi.com/txapi/ncov/index?key=51ada08c82189b4e519e27149e77e6fd";
var dataUrlBackupp  = "https://lab.isaaclin.cn/nCoV/api/overall";

$(document).ready(function () {
    initChart1();
});

var initChart1 = function () {
    $.ajax({
        url: dataUrlp,
        type: 'get',
        success: function (res) {
            if (res.msg === "success") {
                var chartData = res.newslist;
                //console.log(chartData);
                chartData = chartData[0];
                //console.log(chartData);
                chartData = chartData.desc;
                var chinaconfirm = chartData.confirmedCount;
                var dead = chartData.deadCount;
                var cure = chartData.curedCount;
                var suspect = chartData.suspectedCount;
                initChart2(chinaconfirm,dead,cure,suspect);
                return;
            }
            alert("获取数据失败pie");
        }
    });
}

var initChart2 = function (chinaconfirm,dead,cure,suspect) {
    $.ajax({ 
        url: "http://api.tianapi.com/txapi/ncovcity/index?key=51ada08c82189b4e519e27149e77e6fd",
        type: 'get',
        success: function (res) {
            if (res.msg === "success") {
                var provincedata = res.newslist;
                for (i in provincedata) {
                    if (provincedata[i].provinceShortName == "湖北") {
                        var hubeiconfirm = provincedata[i].confirmedCount;
                        var cityData = provincedata[i].cities;
                        for (var j in cityData) {
                            if (cityData[j].cityName==="武汉"){
                                var wuhanconfirm = cityData[j].confirmedCount;
                                initChart(chinaconfirm,dead,cure,suspect,hubeiconfirm,wuhanconfirm);
                            }
                        }
                    }
                }
                return;
            }
            alert("获取数据失败-hubei");
        }
    });
}

    var initChart = function (chinaconfirm,dead,cure,suspect,hubeiconfirm,wuhanconfirm) {
        var myChart1 = echarts.init(document.getElementById('LD1')); 
        var option = {
            title: {
                text: "致命性",
                x: "center"
            },
            tooltip: {
                trigger: "item",
                formatter: "{b} : {c} ({d}%)"
            },
            calculable: true,
            series: [
                {
                    name: "致命性",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    minAngle: 5,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: "{b}"
                            }
                        }
                    },
                    data: [
                        {
                            value: chinaconfirm,
                            name: "确诊",
                            itemStyle:{
                                color: '#123555',
                            }
                        },
                        {
                            value: cure,
                            name: "治愈",
                            itemStyle:{
                                color: '#60aea8',
                            }
                        },
                        {
                            value: suspect,
                            name: "疑似",
                            itemStyle:{
                                color: '#ff8741',
                            }
                        },
                        {
                            value: dead,
                            name: "死亡",
                            itemStyle:{
                                color: '#d9534f',
                            }
                        },
                    ]
                }
            ]
        }
        myChart1.setOption(option);

        var myChart2 = echarts.init(document.getElementById('LD2')); 
        var option = {
            title: {
                text: "性别比例",
                x: "center"
            },
            tooltip: {
                trigger: "item",
                formatter: "{b} : {c} ({d}%)"
            },
            calculable: true,
            series: [
                {
                    name: "性别比例",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    minAngle: 5,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: "{b}"
                            }
                        }
                    },
                    data: [
                        {
                            value: 0.5314,
                            name: "男",
                            itemStyle:{
                                color: '#123555',
                            }
                        },
                        {
                            value: 0.4886,
                            name: "女",
                        },
                    ]
                }
            ]
        }
        myChart2.setOption(option);

        var myChart3 = echarts.init(document.getElementById('LD4')); 
        var option = {
            title: {
                text: "年龄构成",
                x: "center"
            },
            tooltip: {
                trigger: "item",
                formatter: "{b} : ({d}%)"
            },
            calculable: true,
            series: [
                {
                    name: "年龄构成",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    minAngle: 5,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: "{b}"
                            }
                        }
                    },
                    data: [
                        {
                            value: 0.028748341441839895,
                            name: "0-10",
                        },
                        {
                            value: 0.03582485625829279,
                            name: "10-20",
                        },
                        {
                            value: 0.3838,
                            name: "20-40",
                        },
                        {
                            value: 0.40689,
                            name: "40-60",
                        },
                        {
                            value: 0.14,
                            name: "60-",
                        },
                    ]
                }
            ]
        }
        myChart3.setOption(option);

        var myChart4 = echarts.init(document.getElementById('LD3')); 
        var option = {
            title: {
                text: "地区构成",
                x: "center"
            },
            tooltip: {
                trigger: "item",
                formatter: "{b} : {c} ({d}%)"
            },
            calculable: true,
            series: [
                {
                    name: "地区构成",
                    type: "pie",
                    radius: "55%",
                    center: ["50%", "60%"],
                    minAngle: 5,
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                formatter: "{b}"
                            }
                        }
                    },
                    data: [
                        {
                            value:wuhanconfirm,
                            name: "湖北\n武汉",
                        },
                        {
                            value:hubeiconfirm-wuhanconfirm,
                            name: "湖北\n其他",
                        },
                        {
                            value:chinaconfirm-hubeiconfirm,
                            name: "全国\n其他",
                        },
                    ]
                }
            ]
        }
        myChart4.setOption(option);
    }