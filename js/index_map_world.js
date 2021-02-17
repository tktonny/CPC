var dataUrl = "https://lab.isaaclin.cn/nCoV/";
var dataUrlBackup = "https://lab.isaaclin.cn/nCoV/";
var w = window.innerWidth;
document.getElementById('world').style.width = w + "px";
var myChart3 = echarts.init(document.getElementById('world'));
myChart3.resize();
myChart3.showLoading({
    animation: 'QuarticIn',
    text: 'Loading',
});

var geoCoordMap3 = {
    "阿富汗": [69.11, 34.28],
    "阿尔巴尼亚": [19.49, 41.18],
    "阿尔及利亚": [3.08, 36.42],
    "美属萨摩亚": [-170.43, -14.16],
    "安道尔": [1.32, 42.31],
    "安哥拉": [13.15, -8.5],
    "阿根廷": [-60, -36.3],
    "亚美尼亚": [44.31, 40.1],
    "阿鲁巴": [-70.02, 12.32],
    "澳大利亚": [149.08, -35.15],
    "奥地利": [16.22, 48.12],
    "阿塞拜疆": [49.56, 40.29],
    "巴哈马": [-77.2, 25.05],
    "巴林": [50.3, 26.1],
    "孟加拉国": [90.26, 23.43],
    "白俄罗斯": [27.3, 53.52],
    "比利时": [4.21, 50.51],
    "伯利兹": [-88.3, 17.18],
    "贝宁": [2.42, 6.23],
    "不丹": [89.45, 27.31],
    "玻利维亚": [-68.1, -16.2],
    "波黑": [18.26, 43.52],
    "博茨瓦纳": [25.57, -24.45],
    "巴西": [-47.55, -15.47],
    "文莱": [115, 4.52],
    "保加利亚": [23.2, 42.45],
    "布基纳法索": [-1.3, 12.15],
    "布隆迪": [29.18, -3.16],
    "柬埔寨": [104.55, 11.33],
    "喀麦隆": [11.35, 3.5],
    "加拿大": [-75.42, 45.27],
    "佛得角": [-23.34, 15.02],
    "开曼群岛": [-81.24, 19.2],
    "中非": [18.35, 4.23],
    "乍得": [14.59, 12.1],
    "智利": [-70.4, -33.24],
    "中国": [116.2, 39.55],
    "哥伦比亚": [-74, 4.34],
    "科摩罗": [43.16, -11.4],
    "刚果布": [15.12, -4.09],
    "哥斯达黎加": [-84.02, 9.55],
    "科特迪瓦": [-5.17, 6.49],
    "克罗地亚": [15.58, 45.5],
    "古巴": [-82.22, 23.08],
    "塞浦路斯": [33.25, 35.1],
    "捷克": [14.22, 50.05],
    "朝鲜": [125.3, 39.09],
    "刚果": [15.15, -4.2],
    "丹麦": [12.34, 55.41],
    "吉布提": [42.2, 11.08],
    "多米尼克": [-61.24, 15.2],
    "多米尼加": [-69.59, 18.3],
    "厄瓜多尔": [-78.35, -0.15],
    "埃及": [31.14, 30.01],
    "萨尔瓦多": [-89.1, 13.4],
    "赤道几内亚": [8.5, 3.45],
    "厄立特里亚": [38.55, 15.19],
    "爱沙尼亚": [24.48, 59.22],
    "埃塞俄比亚": [38.42, 9.02],
    "福克兰群岛": [-59.51, -51.4],
    "法罗群岛": [-6.56, 62.05],
    "斐济": [178.3, -18.06],
    "芬兰": [25.03, 60.15],
    "法国": [2.2, 48.5],
    "法属圭亚那": [-52.18, 5.05],
    "法属波利尼": [-149.34, -17.32],
    "加蓬": [9.26, 0.25],
    "冈比亚": [-16.4, 13.28],
    "格鲁吉亚": [44.5, 41.43],
    "德国": [13.25, 52.3],
    "加纳": [-0.06, 5.35],
    "希腊": [23.46, 37.58],
    "格陵兰": [-51.35, 64.1],
    "瓜德罗普": [-61.44, 16],
    "危地马拉": [-90.22, 14.4],
    "格恩西岛": [-2.33, 49.26],
    "几内亚": [-13.49, 9.29],
    "几内亚比绍": [-15.45, 11.45],
    "圭亚那": [-58.12, 6.5],
    "海地": [-72.2, 18.4],
    "赫德岛和": [74, -53],
    "洪都拉斯": [-87.14, 14.05],
    "匈牙利": [19.05, 47.29],
    "冰岛": [-21.57, 64.1],
    "印度": [77.13, 28.37],
    "印尼": [106.49, -6.09],
    "伊朗": [51.3, 35.44],
    "伊拉克": [44.3, 33.2],
    "爱尔兰": [-6.15, 53.21],
    "以色列": [35.12, 31.47],
    "意大利": [12.29, 41.54],
    "牙买加": [-76.5, 18],
    "约旦": [35.52, 31.57],
    "哈萨克斯坦": [71.3, 51.1],
    "肯尼亚": [36.48, -1.17],
    "基里巴斯": [173, 1.3],
    "科威特": [48, 29.3],
    "吉尔吉斯斯": [74.46, 42.54],
    "老挝": [102.36, 17.58],
    "拉脱维亚": [24.08, 56.53],
    "黎巴嫩": [35.31, 33.53],
    "莱索托": [27.3, -29.18],
    "利比里亚": [-10.47, 6.18],
    "利比亚": [13.07, 32.49],
    "列支敦士登": [9.31, 47.08],
    "立陶宛": [25.19, 54.38],
    "卢森堡": [6.09, 49.37],
    "澳门": [113.33, 22.12],
    "马达加斯加": [47.31, -18.55],
    "马拉维": [33.48, -14],
    "马来西亚": [101.41, 3.09],
    "马尔代夫": [73.28, 4],
    "马里": [-7.55, 12.34],
    "马耳他": [14.31, 35.54],
    "毛里塔尼亚": [57.3, -20.1],
    "墨西哥": [-99.1, 19.2],
    "密克罗尼西": [158.09, 6.55],
    "摩尔多瓦": [28.5, 47.02],
    "莫桑比克": [32.32, -25.58],
    "缅甸": [96.2, 16.45],
    "纳米比亚": [17.04, -22.35],
    "尼泊尔": [85.2, 27.45],
    "荷兰": [4.54, 52.23],
    "荷属安地列": [-69, 12.05],
    "新西兰": [174.46, -41.19],
    "尼加拉瓜": [-86.2, 12.06],
    "尼日尔": [2.06, 13.27],
    "尼日利亚": [7.32, 9.05],
    "诺福克岛": [168.43, -45.2],
    "北马里亚纳": [145.45, 15.12],
    "挪威": [10.45, 59.55],
    "阿曼": [58.36, 23.37],
    "巴基斯坦": [73.1, 33.4],
    "帕劳": [134.28, 7.2],
    "巴拿马": [-79.25, 9],
    "巴布亚新几": [147.08, -9.24],
    "巴拉圭": [-57.3, -25.1],
    "秘鲁": [-77, -12],
    "菲律宾": [121.03, 14.4],
    "波兰": [21, 52.13],
    "葡萄牙": [-9.1, 38.42],
    "波多黎各": [-66.07, 18.28],
    "卡塔尔": [51.35, 25.15],
    "朝鲜": [126.58, 37.31],
    "罗马尼亚": [26.1, 44.27],
    "俄罗斯": [37.35, 55.45],
    "卢旺达": [30.04, -1.59],
    "圣赫勒拿": [-62.43, 17.17],
    "圣皮埃尔和": [-56.12, 46.46],
    "圣文森特和": [-61.1, 13.1],
    "萨摩亚": [-171.5, -13.5],
    "圣马力诺": [12.3, 43.55],
    "圣多美和": [6.39, 0.1],
    "沙特阿拉伯": [46.42, 24.41],
    "塞内加尔": [-17.29, 14.34],
    "塞拉利昂": [-13.17, 8.3],
    "斯洛伐克": [17.07, 48.1],
    "斯洛文尼亚": [14.33, 46.04],
    "所罗门群岛": [159.57, -9.27],
    "索马里": [45.25, 2.02],
    "南非": [28.12, -25.44],
    "西班牙": [-3.45, 40.25],
    "苏丹": [32.35, 15.31],
    "苏里南": [-55.1, 5.5],
    "斯威士兰": [31.06, -26.18],
    "瑞典": [18.03, 59.2],
    "瑞士": [7.28, 46.57],
    "叙利亚": [36.18, 33.3],
    "塔吉克斯坦": [68.48, 38.33],
    "泰国": [100.35, 13.45],
    "多哥": [1.2, 6.09],
    "汤加": [-174, -21.1],
    "突尼斯": [10.11, 36.5],
    "土耳其": [32.54, 39.57],
    "土库曼斯坦": [57.5, 38],
    "图瓦卢": [179.13, -8.31],
    "乌干达": [32.3, 0.2],
    "乌克兰": [30.28, 50.3],
    "阿联酋": [54.22, 24.28],
    "英国": [-0.05, 51.36],
    "坦桑尼亚": [35.45, -6.08],
    "美国": [-77.02, 39.91],
    "美属维尔京": [-64.56, 18.21],
    "乌拉圭": [-56.11, -34.5],
    "乌兹别克斯": [69.1, 41.2],
    "瓦努阿图": [168.18, -17.45],
    "委内瑞拉": [-66.55, 10.3],
    "越南": [105.55, 21.05],
    "赞比亚": [28.16, -15.28],
    "津巴布韦": [31.02, -17.43],
}

var geoCoordMap4 = {
    "AL": [-86.50249, 33.606379],
    "AK": [-149.87828, 61.216799],
    "AZ": [-110.2123, 36.990184],
    "AR": [-89.86945, 35.629555],
    "CA": [-120.03012, 39.523693],
    "CO": [-105.0981, 39.795006],
    "CT": [-72.86431, 41.789698],
    "DE": [-75.69945, 39.598203],
    "FL": [-82.91032, 29.928691],
    "GA": [-84.26491, 33.772122],
    "HI": [-157.93091, 21.389167],
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
    initChart3();
});

var initChart3 = function () {
    $.ajax({
        url: dataUrl2,
        type: 'get',
        success: function (res) {
            //console.log(res)
            var chartData = res;
            //console.log(chartData)
            var datalist1 = [];
            for (var i in chartData) {
                var name1 = chartData[i].state;
                var confirmedCount1 = chartData[i].positive ? chartData[i].positive : chartData[i].confirmed;
                datalist1.push({
                    name: name1,
                    value: confirmedCount1
                });
            }
            console.log(datalist1);
            Init(datalist1)
        }
        , error: function (res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup2)) {
                this.url = this.url.replace(dataUrl2, dataUrlBackup2);
                $.ajax(this);
            }
        }
    })

    var Init = function(datalist1){
        $.ajax({
            url: dataUrl + 'api/area',
            type: 'get',
            success: function (res) {
                if (res.success === true) {
                    var chartData = res.results;
                    var datalist = [];
                    for (var i in chartData) {
                        var name1 = chartData[i].provinceShortName;
                        var confirmedCount1 = chartData[i].confirmedCount ? chartData[i].confirmedCount : chartData[i].confirmed;
                        var cityData = chartData[i].cities;
                        for (var j in cityData) {
                            var name2 = cityData[j].cityName;
                            var confirmedCount2 = cityData[j].confirmedCount ? cityData[j].confirmedCount : cityData[j].confirmed;
                            datalist.push({
                                name: name2,
                                value: confirmedCount2
                            });
                        }
                        datalist.push({
                            name: name1,
                            value: confirmedCount1
                        });
                    }
                    console.log(datalist);
                    if (w < 1000) {
                        initChart3_small(datalist);
                    }
                    else {
                        initChart3_big(datalist,datalist1);
                    }
                    return;
                }
                alert("获取数据失败");
            }, error: function (res) {
                if (res.state() === "rejected" && !this.url.includes(dataUrlBackup)) {
                    this.url = this.url.replace(dataUrl, dataUrlBackup);
                    $.ajax(this);
                }
            }
        });

        var initChart3_small = function (datalist) {
            var convertData3 = function (datalist) {
                var res = [];
                for (var i = 0; i < datalist.length; i++) {
                    var geoCoord3 = geoCoordMap3[datalist[i].name];
                    if (geoCoord3) {
                        res.push({
                            name: datalist[i].name,
                            value: geoCoord3.concat(datalist[i].value)
                        });
                    }
                }
                return res;
            };

            var convertedData3 = [
                convertData3(datalist),
                convertData3(datalist.sort(function (a, b) {
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
                    text: '全球各地区疫情状况累计确诊地图',
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
                        { min: 1000000 },
                        { min: 100000, max: 1000000 },
                        { min: 10000, max: 100000 },
                        { min: 3000, max: 10000 },
                        { min: 1000, max: 3000 },
                        { min: 100, max: 1000 },
                        { min: 5, max: 100 },
                        { max: 5 }
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

                    zoom: 5.5,

                    center: [14.22,50.05],


                    scaleLimit: {
                        min: 1,
                        max: 10,
                    },

                    map: 'world',

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
                    data: convertedData3[0]
                },
                {
                    name: '散点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertedData3[0],
                    symbolSize: function (val) {
                        if (val[2] > 100 && val[2]<150000) {
                            return (6 + Math.log2(val[2]));
                        }
                        if (val[2] >= 150000) {
                            return (3 + 1.5 * Math.log2(val[2]));
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
                    data: convertData3(datalist.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 3)),
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

            myChart3.hideLoading();
            myChart3.setOption(option);
            myChart3.on('brushselected', renderBrushed);

            setTimeout(function () {
                myChart3.dispatchAction({
                    type: 'brush',
                    areas: [{
                        geoIndex: 0,
                        brushType: 'polygon',
                        coordRange: [
                            [-10, 38],
                            [-10, 53],
                            [40, 53],
                            [40, 38]
                        ]
                    }]
                });
            }, 0);

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
                    var dataItem = convertedData3[0][rawIndex];
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

        var initChart3_big = function (datalist,datalist1) {
            var convertData3 = function (datalist) {
                var res = [];
                for (var i = 0; i < datalist.length; i++) {
                    var geoCoord3 = geoCoordMap3[datalist[i].name];
                    if (geoCoord3) {
                        res.push({
                            name: datalist[i].name,
                            value: geoCoord3.concat(datalist[i].value)
                        });
                    }
                }
                return res;
            };

            var convertedData3 = [
                convertData3(datalist),
                convertData3(datalist.sort(function (a, b) {
                    return b.value - a.value;
                }).slice(0, 6))
            ];

            var convertData1 = function(datalist) {
                var res = [];
                for (var i = 0; i < datalist.length; i++) {
                    var geoCoord1 = geoCoordMap1[datalist[i].name];
                    if (geoCoord1) {
                        res.push({
                            name: datalist[i].name,
                            value: geoCoord1.concat(datalist[i].value)
                        });
                    }
                }
                return res;
            };

            var convertedData1 = [
                convertData1(datalist),
                convertData1(datalist.sort(function(a, b) {
                    return b.value - a.value;
                }).slice(0, 6))
            ];

            var convertData4 = function (datalist1) {
                var res = [];
                for (var i = 0; i < datalist1.length; i++) {
                    var geoCoord4 = geoCoordMap4[datalist1[i].name];
                    if (geoCoord4) {
                        res.push({
                            name: datalist1[i].name,
                            value: geoCoord4.concat(datalist[i].value)
                        });
                    }
                }
                return res;
            };

            var convertedData4 = [
                convertData4(datalist1),
                convertData4(datalist1.sort(function (a, b) {
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
                    text: '全球各地区疫情状况实时地图',
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
                            name: '中国',
                        },
                        {
                            name: '美国',
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
                        { min: 1000000 },
                        { min: 100000, max: 1000000 },
                        { min: 10000, max: 100000 },
                        { min: 3000, max: 10000 },
                        { min: 1000, max: 3000 },
                        { min: 100, max: 1000 },
                        { min: 5, max: 100 },
                        { max: 5 }
                    ],
                    seriesIndex: [0, 1, 2, 3],
                    inRange: {
                        color: ['aqua', '#eac736', '#ff3300']
                    },
                    textStyle: {
                        color: '#fff'
                    }
                },

                geo: {
                    //center:[121.487899,31.249162],//视角的中心点为上海
                    roam: true,//缩放平移

                    zoom: 1.2,

                    center: [32.35, 18],

                    scaleLimit: {
                        min: 1,
                        max: 10,
                    },

                    map: 'world',

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

                    regions: [{
                        name: 'China',
                        emphasis: {
                            itemStyle: {
                                areaColor: '#CC9966',
                                shadowColor: '#000',
                                shadowBlur: 10
                            },
                        }
                    },{
                        name: 'United States',
                        emphasis: {
                            itemStyle: {
                                areaColor: '#669933',
                                shadowColor: '#000',
                                shadowBlur: 10
                            },
                        }
                    }],
                },

                series: [{
                    name: '热图',
                    type: 'heatmap',
                    coordinateSystem: 'geo',
                    data: convertedData3[0]
                },
                {
                    name: '散点',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertedData3[0],
                    symbolSize: function (val) {
                        if (val[2] > 100 && val[2]<150000) {
                            return (6 + Math.log2(val[2]));
                        }
                        if (val[2] >= 150000) {
                            return (3 + 1.5 * Math.log2(val[2]));
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
                            color: 'red'
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
                    name: '中国',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertedData1[0],
                    symbolSize: function(val) {
                        if (val[2]>=50000) {
                            return (2 * Math.log2(val[2]));
                        }
                        if (val[2]>100 && val[2]<50000){
                            return (Math.log2(val[2])-1);
                        }
                        if (val[2] <= 100) {
                            return (val[2]/10 - 3)
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
                            color: '#CC9966'
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
                    name: '美国',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertedData4[0],
                    symbolSize: function(val) {
                        if (val[2]>=100000) {
                            return (3+1 * Math.log2(val[2]));
                        }
                        if (val[2]>100 && val[2]<100000){
                            return (Math.log2(val[2])-3);
                        }
                        if (val[2] <= 100) {
                            return (val[2]/25 + 5)
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
                            color: '#669933'
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
                    data: convertData3(datalist.sort(function (a, b) {
                        return b.value - a.value;
                    }).slice(0, 3)),
                    symbolSize: function (val) {
                        return (2 * Math.log2(val[2]));
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
                            color: 'red',
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

            myChart3.hideLoading();
            myChart3.setOption(option);
            myChart3.on('brushselected', renderBrushed);

            setTimeout(function () {
                myChart3.dispatchAction({
                    type: 'brush',
                    areas: [{
                        geoIndex: 0,
                        brushType: 'polygon',
                        coordRange: [
                            [-10, 38],
                            [-10, 53],
                            [40, 53],
                            [40, 38]
                        ]
                    }]
                });
            }, 0);

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
                    var dataItem = convertedData3[0][rawIndex];
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
                        top: '18%',
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

}