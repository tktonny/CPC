var dataUrlBackup2 = "data/every12h/usa_current.json";
var dataUrl2 = "https://covidtracking.com/api/v1/states/current.json";
var w = window.innerWidth;
var w2 = 4.5 * w / 12;
//console.log(w2)
document.getElementById('america').style.width = w + "px";
document.getElementById('usa-chart').style.width = w2 + "px";
var myChart2 = echarts.init(document.getElementById('america'));
var usachart = echarts.init(document.getElementById('usa-chart'));
myChart2.resize();
usachart.resize();
myChart2.showLoading({
    animation: 'QuarticIn',
    text: 'Loading',
});

var geoCoordMap2 = {
    "AL": [-86.50249, 33.606379],
    "AK": [-120.7828, 27.916799],
    "AZ": [-110.2123, 36.990184],
    "AR": [-89.86945, 35.629555],
    "CA": [-120.03012, 39.523693],
    "CO": [-105.0981, 39.795006],
    "CT": [-72.86431, 41.789698],
    "DE": [-75.69945, 39.598203],
    "FL": [-82.91032, 29.928691],
    "GA": [-84.26491, 33.772122],
    "HI": [-105.3091, 26.389167],
    "ID": [-111.0932, 43.001889],
    "IL": [-91.00612, 41.413372],
    "IN": [-85.673, 40.257082],
    "IA": [-93.41494, 41.363615],
    "KS": [-95.13472, 39.553786],
    "KY": [-89.50472, 36.513386],
    "LA": [-90.16902, 29.984096],
    "ME": [-70.84559, 43.29016],
    "MD": [-76.86008, 38.634306],
    "MA": [-72.62029, 42.07061],
    "MI": [-82.554, 42.631359],
    "MN": [-92.81904, 44.903133],
    "MS": [-89.47412, 34.489297],
    "MO": [-90.63155, 38.646981],
    "MT": [-109.48875, 45.522248],
    "NE": [-96.94965, 41.334744],
    "NV": [-115.31502, 37.381946],
    "NH": [-71.6082, 42.854886],
    "NJ": [-74.27987, 40.578996],
    "NM": [-106.54291, 31.789109],
    "NY": [-72.00708, 41.261936],
    "NC": [-80.44132, 35.954679],
    "ND": [-96.73165, 46.448462],
    "OH": [-82.61225, 40.091576],
    "OK": [-97.5331, 35.681402],
    "OR": [-122.79749, 45.234609],
    "PA": [-80.22181, 40.593917],
    "RI": [-71.32031, 41.746834],
    "SC": [-81.03203, 33.272026],
    "SD": [-96.74702, 43.726266],
    "TN": [-86.01978, 36.076635],
    "TX": [-96.62447, 33.092846],
    "UT": [-110.27969, 40.395531],
    "VT": [-72.36825, 43.662892],
    "VA": [-77.99031, 38.683116],
    "WA": [-122.21602, 47.304221],
    "WV": [-81.0032, 37.448532],
    "WI": [-88.36432, 43.461969],
    "WY": [-104.80582, 41.101731],
}

$(document).ready(function () {
    initChart2();
    initusa_chart();
});

var initusa_chart = function () {
    var option = {
        title: {
            text: "基本再生数R0预测",
            textStyle: {
                fontSize: 10,
                color: "rgb(255, 255, 255)"
            }
        },
        tooltip: {
            trigger: "axis"
        },
        legend: {
            data: ["ML", "Low_90", "High_90"],
            x: "right",
            textStyle: {
                color: '#fff'
            }
        },
        toolbox: {
            show: false,
        },
        calculable: true,
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                data: ["2020-03-04", "2020-03-05", "2020-03-06", "2020-03-07", "2020-03-08", "2020-03-09", "2020-03-10", "2020-03-11", "2020-03-12", "2020-03-13", "2020-03-14", "2020-03-15", "2020-03-16", "2020-03-17", "2020-03-18", "2020-03-19", "2020-03-20", "2020-03-21", "2020-03-22", "2020-03-23", "2020-03-24", "2020-03-25", "2020-03-26", "2020-03-27", "2020-03-28", "2020-03-29", "2020-03-30", "2020-03-31", "2020-04-01", "2020-04-02", "2020-04-03", "2020-04-04", "2020-04-05", "2020-04-06", "2020-04-07", "2020-04-08", "2020-04-09", "2020-04-10", "2020-04-11", "2020-04-12", "2020-04-13", "2020-04-14", "2020-04-15", "2020-04-16", "2020-04-17", "2020-04-18", "2020-04-19", "2020-04-20", "2020-04-21", "2020-04-22", "2020-04-23", "2020-04-24", "2020-04-25", "2020-04-26", "2020-04-27", "2020-04-28", "2020-04-29", "2020-04-30", "2020-05-01", "2020-05-02", "2020-05-03", "2020-05-04", "2020-05-05", "2020-05-06", "2020-05-07"],
                nameTextStyle: {
                    color: "rgb(255, 255, 255)"
                },
                axisLabel: {
                    textStyle: {
                        color: "rgb(255, 255, 255)"
                    }
                }
            }
        ],
        yAxis: [
            {
                type: "value",
                axisLabel: {
                    textStyle: {
                        color: "rgb(255, 255, 255)"
                    }
                }
            }
        ],
        series: [
            {
                name: "ML",
                type: "line",
                data: [0, 2.08, 2.09, 2.06, 2.24, 2.5, 2.79, 2.84, 2.86, 2.75, 2.77, 2.75, 3.47, 3.59, 3.58, 3.44, 3.45, 2.79, 2.37, 2.12, 2.07, 2.09, 2.11, 1.94, 1.88, 1.66, 1.53, 1.74, 1.77, 1.58, 1.34, 1.19, 0.93, 0.9500000000000001, 1.06, 1.22, 1.19, 1.03, 0.84, 0.8300000000000001, 0.9, 0.92, 1.06, 1.13, 0.96, 0.85, 0.92, 0.78, 1.09, 1.31, 1.34, 1.29, 1.02, 0.7000000000000001, 0.63, 0.62, 0.92, 1.23, 1.27, 1.04, 0.8300000000000001, 0.6, 0.6, 0.66, 0.8200000000000001]
            },
            {
                name: "Low_90",
                type: "line",
                data: [0, 0.63, 1.11, 1.21, 1.5, 1.85, 2.22, 2.32, 2.37, 2.31, 2.37, 2.4, 3.15, 3.32, 3.34, 3.23, 3.27, 2.62, 2.23, 1.99, 1.93, 1.98, 1.99, 1.82, 1.77, 1.56, 1.44, 1.66, 1.68, 1.49, 1.26, 1.11, 0.85, 0.86, 0.97, 1.15, 1.12, 0.9500000000000001, 0.77, 0.75, 0.8200000000000001, 0.84, 0.98, 1.06, 0.88, 0.76, 0.84, 0.7000000000000001, 1.01, 1.23, 1.26, 1.22, 0.9400000000000001, 0.62, 0.54, 0.53, 0.84, 1.15, 1.18, 0.9500000000000001, 0.74, 0.52, 0.52, 0.5700000000000001, 0.73]
            },
            {
                type: "line",
                name: "High_90",
                data: [10.81, 3.33, 3.02, 2.78, 2.87, 3.07, 3.31, 3.3, 3.26, 3.12, 3.11, 3.07, 3.74, 3.82, 3.77, 3.6, 3.59, 2.91, 2.49, 2.23, 2.16, 2.19, 2.19, 2.01, 1.95, 1.73, 1.6, 1.81, 1.83, 1.63, 1.4, 1.25, 0.99, 1, 1.11, 1.28, 1.25, 1.08, 0.9, 0.89, 0.96, 0.98, 1.12, 1.19, 1.02, 0.9, 0.98, 0.84, 1.15, 1.37, 1.39, 1.35, 1.07, 0.75, 0.68, 0.67, 0.98, 1.29, 1.32, 1.09, 0.88, 0.66, 0.66, 0.72, 0.88]
            }
        ],
        grid: {
            x: 50,
            x2: 30,
            y: 10,
            y2: 30
        },
        backgroundColor: "rgb(0, 0, 0)",
        color: ["#ff7f50", "#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3", "#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a", "#ffd700", "#6699FF", "#ff6666", "#3cb371", "#b8860b"]
    }
    usachart.setOption(option);
}

var initChart2 = function () {
    $.ajax({
        url: dataUrl2,
        type: 'get',
        success: function (res) {
            //console.log(res)
            var chartData = res;
            //console.log(chartData)
            var datalist = [];
            for (var i in chartData) {
                var name1 = chartData[i].state;
                var confirmedCount1 = chartData[i].positive ? chartData[i].positive : chartData[i].confirmed;
                datalist.push({
                    name: name1,
                    value: confirmedCount1
                });
            }
            console.log(datalist);
            if (w < 1000) {
                initChart2_small(datalist);
            }
            else {
                initChart2_big(datalist);
            }
            return;
        }
        , error: function (res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup2)) {
                this.url = this.url.replace(dataUrl2, dataUrlBackup2);
                $.ajax(this);
            }
        }
    });

    var initChart2_small = function (datalist) {
        var convertData2 = function (datalist) {
            var res = [];
            for (var i = 0; i < datalist.length; i++) {
                var geoCoord2 = geoCoordMap2[datalist[i].name];
                if (geoCoord2) {
                    res.push({
                        name: datalist[i].name,
                        value: geoCoord2.concat(datalist[i].value)
                    });
                }
            }
            return res;
        };

        var convertedData2 = [
            convertData2(datalist),
            convertData2(datalist.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6))
        ];

        var option = {
            backgroundColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{                      //渐变
                    offset: 0, color: '#1e1e1e'     // 0% 处的颜色
                },
                {
                    offset: 0.5, color: '#111111'
                },
                {
                    offset: 1, color: '#000000'     // 100% 处的颜色
                }],
            },

            title: {
                left: 'center',
                padding: 30,
                text: '美国各地疫情状况累计确诊地图',
                textStyle: {
                    color: '#fff'
                },
            },

            graphic: [
                {//区域选择说明
                    type: 'text',
                    right: 'center',
                    top: '8%',
                    style: {
                        fill: '#fff',
                        text: '关闭热图以使用区域选择',
                        font: 'bold 13px Microsoft YaHei'
                    }
                },
                {
                    type: 'text',
                    right: 'center',
                    top: '10.5%',
                    style: {
                        fill: '#fff',
                        text: '更多可视化分析请点击上方\n   疫情地图与可视化分析',
                        font: 'bold 13px Microsoft YaHei'
                    }
                },
            ],

            legend: {
                icon: 'circle',
                orient: 'vertical',
                top: '8%',
                right: '20px',
                data: [
                    {
                        name: '热图',
                    },
                    {
                        name: '散点',
                    }],
                textStyle: {
                    color: '#fff'
                }
            },

            brush: {
                outOfBrush: {
                    color: 'gray'
                },
                brushStyle: {
                    borderWidth: 2,
                    color: 'rgba(255,255,255,0.2)',
                    borderColor: 'rgba(0,0,0,0.5)',
                },
                seriesIndex: [1],
                brushMode: 'multiple',
                throttleType: 'debounce',
                throttleDelay: 300,
                geoIndex: 0
            },

            toolbox: {
                iconStyle: {
                    normal: {
                        borderColor: '#fff'
                    },
                    emphasis: {
                        borderColor: '#abc'
                    }
                },
                feature: {
                    restore: {},
                    saveAsImage: {}
                },
                left: 'center'
            },

            tooltip: {
                trigger: 'item'
            },

            grid: {
                right: '2%',
                top: '20%',
                bottom: '15%',
                width: '15%'
            },

            xAxis: {
                type: 'value',
                scale: true,
                position: 'top',
                boundaryGap: false,
                splitNumber: 4,
                splitLine: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { margin: 2, textStyle: { color: '#aaa' } },
            },

            yAxis: {
                type: 'category',
                nameGap: 95,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { interval: 0, textStyle: { color: '#fff' } },
                data: []
            },

            visualMap: {
                pieces: [
                    { min: 30000 },
                    { min: 20000, max: 30000 },
                    { min: 10000, max: 20000 },
                    { min: 6000, max: 10000 },
                    { min: 3000, max: 6000 },
                    { min: 1000, max: 3000 },
                    { min: 100, max: 1000 },
                    { max: 100 }
                ],
                seriesIndex: [0, 1, 2],
                inRange: {
                    color: ['aqua', '#eac736', '#ff3300']
                },
                textStyle: {
                    color: '#fff'
                }
            },

            geo: {
                roam: true,//缩放平移

                zoom: 3,

                center: [-80.031229, 35],

                scaleLimit: {
                    min: 1,
                    max: 10,
                },

                map: 'USA',

                itemStyle: {
                    areaColor: '#333333',
                    borderColor: '#000',
                },

                emphasis: {
                    itemStyle: {
                        areaColor: '#123555',
                        shadowColor: '#000',
                        shadowBlur: 10
                    },
                    label: {
                        show: false
                    }
                },
            },

            series: [{
                name: '热图',
                type: 'heatmap',
                coordinateSystem: 'geo',
                data: convertedData2[0]
            },
            {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertedData2[0],
                symbolSize: function (val) {
                    if (val[2] > 100 && val[2]<10000) {
                        return (3 + 1.5 * Math.log2(val[2]));
                    }
                    if (val[2] >= 10000) {
                        return (6 + Math.log2(val[2]));
                    }
                    if (val[2] <= 100) {
                        return (5 + val[2] / 25)
                    }
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        return params.name + ' : ' + params.value[2];
                    }
                },
            },
            {
                name: 'Top',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData2(datalist.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 2)),
                symbolSize: function (val) {
                    return (Math.log2(val[2]));
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        return params.name + ' : ' + params.value[2];
                    }
                },
                zlevel: 1
            },
            {
                id: 'bar',
                zlevel: 2,
                type: 'bar',
                symbol: 'none',
                itemStyle: {
                    color: '#ddd',
                },
                emphasis: {
                    color: '#fff',
                    shadowColor: 'rgba(255, 0, 0, 0.5)',
                    shadowBlur: 10
                },
                data: []
            }
            ]
        }

        $.getJSON("incubator-echarts-4.6.0/map/json/USA.json", function (usaJson) {
            echarts.registerMap('USA', usaJson, {
                Alaska: {              // 把阿拉斯加移到美国主大陆左下方
                    left: -131,
                    top: 25,
                    width: 15
                },
                Hawaii: {
                    left: -110,        // 夏威夷
                    top: 26,
                    width: 5
                },
                'Puerto Rico': {       // 波多黎各
                    left: -76,
                    top: 26,
                    width: 2
                }
            });
            myChart2.hideLoading();
            myChart2.setOption(option);
            myChart2.on('brushselected', renderBrushed);
            setTimeout(function () {
                myChart2.dispatchAction({
                    type: 'brush',
                    areas: [{
                        geoIndex: 0,
                        brushType: 'polygon',
                        coordRange: [
                            [-75,46],
                            [-60,46],
                            [-60,40],
                            [-75,40]
                        ]
                    }]
                });
            }, 0);
        })

        function renderBrushed(params) {
            var mainSeries = params.batch[0].selected[0];
            var selectedItems = [];
            var categoryData = [];
            var barData = [];
            var maxBar = 30;
            var sum = 0;
            var count = 0;

            for (var i = 0; i < mainSeries.dataIndex.length; i++) {
                var rawIndex = mainSeries.dataIndex[i];
                var dataItem = convertedData2[0][rawIndex];
                var Value = dataItem.value[2];
                sum += Value;
                count++;
                selectedItems.push(dataItem);
            }

            selectedItems.sort(function (a, b) {
                return a.value[2] - b.value[2];
            });

            for (var i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
                categoryData.push(selectedItems[i].name);
                barData.push(selectedItems[i].value[2]);
            }

            this.setOption({
                yAxis: {
                    data: categoryData,
                },

                xAxis: {
                    axisLabel: {
                        show: !!count,
                    }
                },

                title: {
                    id: 'statistic',
                    right: '4%',
                    top: '20%',
                    text: count ? '区域内总和: ' + (sum) : '',
                    textStyle: {
                        color: '#fff'
                    },
                },

                series: {
                    id: 'bar',
                    data: barData
                }
            });
        }
    }

    var initChart2_big = function (datalist) {
        var convertData2 = function (datalist) {
            var res = [];
            for (var i = 0; i < datalist.length; i++) {
                var geoCoord2 = geoCoordMap2[datalist[i].name];
                if (geoCoord2) {
                    res.push({
                        name: datalist[i].name,
                        value: geoCoord2.concat(datalist[i].value)
                    });
                }
            }
            return res;
        };

        var convertedData2 = [
            convertData2(datalist),
            convertData2(datalist.sort(function (a, b) {
                return b.value - a.value;
            }).slice(0, 6))
        ];

        var option = {
            backgroundColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{                      //渐变
                    offset: 0, color: '#1e1e1e'     // 0% 处的颜色
                },
                {
                    offset: 0.5, color: '#111111'
                },
                {
                    offset: 1, color: '#000000'     // 100% 处的颜色
                }],
            },

            title: {
                left: 'left',
                padding: 20,
                text: '美国各地疫情状况实时地图',
                textStyle: {
                    color: '#fff',
                    fontSize: 23
                },
            },

            graphic: [
                {//区域选择说明
                    type: 'text',
                    right: 'center',
                    top: '4%',
                    style: {
                        fill: '#fff',
                        text: '关闭热图以使用区域选择',
                        font: 'bold 13px Microsoft YaHei'
                    }
                },
                {
                    type: 'text',
                    right: 'center',
                    top: '6.5%',
                    style: {
                        fill: '#fff',
                        text: '更多可视化分析请点击导航栏\n   疫情地图与可视化分析',
                        font: 'bold 13px Microsoft YaHei'
                    }
                },
            ],

            legend: {
                icon: 'circle',
                orient: 'vertical',
                top: '5%',
                right: '17%',
                selected: {
                    '热图': false
                },
                data: [
                    {
                        name: '热图',
                    },
                    {
                        name: '散点',
                    },
                    {
                        name: '求助',
                    }],
                textStyle: {
                    color: '#fff'
                }
            },

            brush: {
                outOfBrush: {
                    color: 'gray'
                },
                brushStyle: {
                    borderWidth: 2,
                    color: 'rgba(255,255,255,0.2)',
                    borderColor: 'rgba(0,0,0,0.5)',
                },
                seriesIndex: [1],
                brushMode: 'multiple',
                throttleType: 'debounce',
                throttleDelay: 300,
                geoIndex: 0
            },

            toolbox: {
                iconStyle: {
                    normal: {
                        borderColor: '#fff'
                    },
                    emphasis: {
                        borderColor: '#abc'
                    }
                },
                feature: {
                    restore: {},
                    saveAsImage: {}
                },
                right: '17%'
            },

            tooltip: {
                trigger: 'item'
            },

            grid: {
                right: '2%',
                top: '25%',
                bottom: '15%',
                width: '15%'
            },

            xAxis: {
                type: 'value',
                scale: true,
                position: 'top',
                boundaryGap: false,
                splitNumber: 4,
                splitLine: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { margin: 2, textStyle: { color: '#aaa' } },
            },

            yAxis: {
                type: 'category',
                nameGap: 95,
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: { interval: 0, textStyle: { color: '#fff' } },
                data: []
            },

            visualMap: {
                pieces: [
                    { min: 30000 },
                    { min: 20000, max: 30000 },
                    { min: 10000, max: 20000 },
                    { min: 6000, max: 10000 },
                    { min: 3000, max: 6000 },
                    { min: 1000, max: 3000 },
                    { min: 100, max: 1000 },
                    { max: 100 }
                ],
                seriesIndex: [0, 1, 2],
                inRange: {
                    color: ['aqua', '#eac736', '#ff3300']
                },
                textStyle: {
                    color: '#fff'
                }
            },

            geo: {
                roam: true,//缩放平移

                zoom: 1,

                center: [-92.13472, 39.553786],

                scaleLimit: {
                    min: 1,
                    max: 10,
                },

                map: 'USA',

                itemStyle: {
                    areaColor: '#333333',
                    borderColor: '#000',
                },

                emphasis: {
                    itemStyle: {
                        areaColor: '#123555',
                        shadowColor: '#000',
                        shadowBlur: 10
                    },
                    label: {
                        show: false
                    }
                },
            },

            series: [{
                name: '热图',
                type: 'heatmap',
                coordinateSystem: 'geo',
                data: convertedData2[0]
            },
            {
                name: '散点',
                type: 'scatter',
                coordinateSystem: 'geo',
                data: convertedData2[0],
                symbolSize: function (val) {
                    if (val[2] > 100 && val[2]<10000) {
                        return (3 + 1.5 * Math.log2(val[2]));
                    }
                    if (val[2] >= 10000) {
                        return (6 + Math.log2(val[2]));
                    }
                    if (val[2] <= 100) {
                        return (5 + val[2] / 25)
                    }
                },
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: false
                    },
                    emphasis: {
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#ddb926'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        return params.name + ' : ' + params.value[2];
                    }
                },
            },
            {
                name: 'Top',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: convertData2(datalist.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 2)),
                symbolSize: function (val) {
                    return (2 * Math.log2(val[2]) - 5);
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                hoverAnimation: true,
                label: {
                    normal: {
                        formatter: '{b}',
                        position: 'right',
                        show: true
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#f4e925',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        return params.name + ' : ' + params.value[2];
                    }
                },
                zlevel: 1
            },
            {
                id: 'bar',
                zlevel: 2,
                type: 'bar',
                symbol: 'none',
                itemStyle: {
                    color: '#ddd',
                },
                emphasis: {
                    color: '#fff',
                    shadowColor: 'rgba(255, 0, 0, 0.5)',
                    shadowBlur: 10
                },
                data: []
            }
            ]
        }

        $.getJSON("incubator-echarts-4.6.0/map/json/USA.json", function (usaJson) {
            echarts.registerMap('USA', usaJson, {
                Alaska: {              // 把阿拉斯加移到美国主大陆左下方
                    left: -131,
                    top: 25,
                    width: 15
                },
                Hawaii: {
                    left: -110,        // 夏威夷
                    top: 26,
                    width: 5
                },
                'Puerto Rico': {       // 波多黎各
                    left: -76,
                    top: 26,
                    width: 2
                }
            });
            myChart2.hideLoading();
            myChart2.setOption(option);
            myChart2.on('brushselected', renderBrushed);
            setTimeout(function () {
                myChart2.dispatchAction({
                    type: 'brush',
                    areas: [{
                        geoIndex: 0,
                        brushType: 'polygon',
                        coordRange: [
                            [-75,46],
                            [-60,46],
                            [-60,40],
                            [-75,40]
                        ]
                    }]
                });
            }, 0);
        })

        function renderBrushed(params) {
            var mainSeries = params.batch[0].selected[0];
            var selectedItems = [];
            var categoryData = [];
            var barData = [];
            var maxBar = 30;
            var sum = 0;
            var count = 0;

            for (var i = 0; i < mainSeries.dataIndex.length; i++) {
                var rawIndex = mainSeries.dataIndex[i];
                var dataItem = convertedData2[0][rawIndex];
                var Value = dataItem.value[2];
                sum += Value;
                count++;
                selectedItems.push(dataItem);
            }

            selectedItems.sort(function (a, b) {
                return a.value[2] - b.value[2];
            });

            for (var i = 0; i < Math.min(selectedItems.length, maxBar); i++) {
                categoryData.push(selectedItems[i].name);
                barData.push(selectedItems[i].value[2]);
            }

            this.setOption({
                yAxis: {
                    data: categoryData,
                },

                xAxis: {
                    axisLabel: {
                        show: !!count,
                    }
                },

                title: {
                    id: 'statistic',
                    right: '8%',
                    top: '15%',
                    text: count ? '区域内总和: ' + (sum) : '',
                    textStyle: {
                        color: '#fff'
                    },
                },

                series: {
                    id: 'bar',
                    data: barData
                }
            });
        }
    }
}