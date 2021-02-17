var dataUrl  = "https://lab.isaaclin.cn/nCoV/";
var dataUrlBackup  = "https://lab.isaaclin.cn/nCoV/";

$(document).ready(function () {
    initChart1();
});

var initChart1 = function () {
    $.ajax({
        url: dataUrl + 'api/overall',
        type: 'get',
        success: function (res) {
            if (res.success === true) {
                var chartData = res.results[0];
                var chinaconfirm = chartData.confirmedCount;
                var dead = chartData.deadCount;
                var cure = chartData.curedCount;
                var suspect = chartData.suspectedCount;
                initChart2(chinaconfirm,dead,cure,suspect);
                return;
            }
            alert("pies获取数据失败");
        }, 
        error: function (res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup)) {
                this.url = this.url.replace(dataUrl,dataUrlBackup);
                $.ajax(this);
            }
        }
    });
    var initChart2 = function (chinaconfirm,dead,cure,suspect) {
    $.ajax({ 
        url: dataUrl + 'api/area?province=湖北省',
        type: 'get',
        success: function (res) {
            if (res.success === true) {
                var cityData = res.results[0].cities;
                var hubeiconfirm = res.results[0].confirmedCount;

                for (var i in cityData) {
                    if (cityData[i].cityName==="武汉"){
                        var wuhanconfirm = cityData[i].confirmedCount;
                        break;
                    }
                }
                console.log(chinaconfirm,dead,cure,suspect,hubeiconfirm,wuhanconfirm);
                initChart(chinaconfirm,dead,cure,suspect,hubeiconfirm,wuhanconfirm);
                return;
            }
            alert("pies_wuhan获取数据失败");
        }, 
        error: function (res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup)) {
                this.url = this.url.replace(dataUrl,dataUrlBackup);
                $.ajax(this);
            }
        }
    });
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
}
}