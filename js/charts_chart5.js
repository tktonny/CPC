var dataUrl  = "https://lab.isaaclin.cn/nCoV/";
var dataUrlBackup  = "https://lab.ahusmart.com/nCoV/";

$(document).ready(function () {
    initChart2();
});

var initChart2 = function () {
    $.ajax({
        url: dataUrl + 'api/area',
        type: 'get',
        success: function (res) {
            if (res.success === true) {
                var chartData = res.results;
                var datalist1 = [];
                var datalist2 = [];
                count1 = 0;
                count2 = 0;
                for (var i in chartData) {
                    if (chartData[i].countryName == '中国'||chartData[i].country == '中国'){
                        var provincename = chartData[i].provinceShortName;
                        var confirm = chartData[i].confirmedCount;
                        var cure = chartData[i].curedCount;
                        var dead = chartData[i].deadCount;
                        var curerate = cure/confirm;
                        var deathrate = dead/confirm;
                        datalist1[count1]=[
                            curerate,
                            deathrate,
                            confirm,
                            dead,
                            provincename,]
                        count1++;
                    }
                }
                for (var i in chartData) {
                    if (chartData[i].countryName != '中国'&&chartData[i].country != '中国'){
                        var countryname = chartData[i].provinceShortName;
                        var confirm = chartData[i].confirmedCount;
                        var cure = chartData[i].curedCount;
                        var dead = chartData[i].deadCount;
                        var curerate = cure/confirm;
                        var deathrate = dead/confirm;
                        datalist2[count2]=[
                            curerate,
                            deathrate,
                            confirm,
                            dead,
                            countryname,]
                            count2++;
                    }
                }
                console.log(datalist1);
                console.log(datalist2);
                initChart2(datalist1,datalist2);
                return;
            }
            alert("获取数据失败");
        }, 
        error: function (res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup)) {
                alert("cure-death_chart获取数据失败\n启用备份数据");
                this.url = this.url.replace(dataUrl,dataUrlBackup);
                $.ajax(this);
            }
        }
    });
    var initChart2 = function (datalist1,datalist2) {
        var myChart = echarts.init(document.getElementById('R5')); 

        var schema = [{
                name: '治愈率',
                index: 0,
                text: '治愈率'
            },
            {
                name: '致死率',
                index: 1,
                text: '致死率'
            },
            {
                name: '感染人数',
                index: 2,
                text: '感染人数'
            },
            {
                name: '死亡人数',
                index: 3,
                text: '死亡人数'
            }
        ];
        
        
        var itemStyle = {
            normal: {
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0)'
            }
        };
        
        option = {
            legend: {
                top: 40,
                data: ['china', 'oversea']
            },
            title: {
                text: '治愈率-致死率 分布图',
                subtext: '横坐标为治愈率 纵坐标为致死率 半径为感染人数',
                left: 'center',
            },
            grid: {
                x: '6%',
                x2: '10%',
                y: '7%',
                y2: '12%'
            },
            tooltip: {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,
                formatter: function(obj) {
                    var value = obj.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                        value[4] +
                        '</div>' +
                        schema[0].text + '：' + value[0] + '<br>' +
                        schema[1].text + '：' + value[1] + '<br>' +
                        schema[2].text + '：' + value[2] + '<br>' +
                        schema[3].text + '：' + value[3] + '<br>';
                }
            },
            xAxis: {
                type: 'value',
                name: '治愈率',
                nameGap: 16,
                nameTextStyle: {
                    color: '#123555',
                    fontSize: 14
                },
                max: 1,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#777'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#777'
                    }
                },
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#123555'
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '致死率',
                nameLocation: 'end',
                nameGap: 14,
                nameTextStyle: {
                    color: '#000',
                    fontSize: 16
                },
                axisLine: {
                    lineStyle: {
                        color: '#777'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#777'
                    }
                },
                splitLine: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    start: 1,
                    end: 100
                },
                {
                    type: 'slider',
                    show: true,
                    yAxisIndex: [0],
                    left: '93%',
                    start: 0,
                    end: 65
                },
                {
                    type: 'inside',
                    xAxisIndex: [0],
                },
                {
                    type: 'inside',
                    yAxisIndex: [0],
                    start: 0,
                    end: 15
                }
            ],
            visualMap: [
                {
                    right: '6%',
                    top: '10%',
                    dimension: 2,
                    min: 0,
                    max: 100000,
                    text: ['2000+','0'],
                    itemWidth: 30,
                    itemHeight: 120,
                    calculable: true,
                    precision: 0.1,
                    text: ['圆形大小\n感染人数'],
                    textGap: 30,
                    textStyle: {
                        color: '#123555'
                    },
                    inRange: {
                        symbolSize: [10, 70]
                    },
                    outOfRange: {
                        symbolSize: [10, 70],
                        color: ['rgba(255,255,255,.2)']
                    },
                    controller: {
                        inRange: {
                            color: ['#c23531']
                        },
                        outOfRange: {
                            color: ['#444']
                        }
                    }
                }
            ],
            series: [{
                name: 'china',
                type: 'scatter',
                itemStyle: itemStyle,
                data: datalist1,
                symbolSize: function(val) {
                    return (2 + Math.log2(val[2]));
                },
            },{
                name: 'oversea',
                type: 'scatter',
                itemStyle: itemStyle,
                data: datalist2,
                itemStyle:{
                    color: '#123555'
                },
                symbolSize: function(val) {
                    return (2 + Math.log2(val[2]));
                },
            }
        ]
        };
        myChart.setOption(option);
    }
}
