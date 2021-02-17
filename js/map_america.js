var dataUrl = "https://covidtracking.com/api/v1/states/daily.csv";
var dataUrlBackup = "./data/USA-2019-nCoV-20200705.csv";
var predictUrl = "./data/US_state_pre_2020_07.csv";
var w = window.innerWidth;
var myChart = echarts.init(document.getElementById('america'));
myChart.showLoading({
    animation: 'QuarticIn',
    text: 'Loading',
});

$(document).ready(function() {
    initChart0();
});

var initChart0 = function() {
    $.ajax({
        url: dataUrl,
        type: 'get',
        success: function(res) {
            var chartData = res;
            var datalist = [];
            var Data = [];
            var relArr = chartData.split("\n");
            //console.log(relArr);
            if (!$.isEmptyObject(relArr) && relArr.length > 1) {
                for (var key = 1, len = relArr.length; key < len; key++) {
                    var values = relArr[key];
                    if (!$.isEmptyObject(values)) {
                        //console.log(values);
                        var obj = {};
                        var objArr = values.split(",");
                        //var dataTime = new Date(objArr[0]);
                        //var dateTime = new Date(2020,3,15);
                        //function formatDate(date){                 
                        //    var m = date.getMonth() + 1;                           
                        //    m = m < 10 ? ('0' + m) : m;                         
                        //    var d = date.getDate();                           
                        //    d = d < 10 ? ('0' + d) : d;                         
                        //    return (m + '-' + d);
                        //}
                        obj["province"] = objArr[1];
                        obj["confirmedCount"] = objArr[2];
                        obj["updateTime"] = objArr[0];
                        //obj["updateTime"] = formatDate(dataTime);
                        //if (dateTime.getTime()<=dataTime.getTime()){
                        //    Data.push(obj);
                        //}
                        if (objArr[0] >= 20200315) {
                            Data.push(obj);
                            //console.log(obj);
                        }
                    }
                }
            }

            for (var i in Data) {
                var showtime = Data[i].updateTime;
                if ($.isEmptyObject(datalist[showtime])) {
                    datalist[showtime] = [];
                }
                var name = Data[i].province;
                var confirmedCount = Data[i].confirmedCount ? Data[i].confirmedCount : Data[i].confirmedCount;
                datalist[showtime].push({
                    name: name,
                    value: confirmedCount
                });
            }
            //console.log(datalist[20200330][0]);
            //console.log(datalist[20200330][2]);
            //console.log(datalist[20200330][11]);
            //console.log(datalist[20200330][55]);
            //console.log(datalist[20200330]);
            //date = date.reverse;
            //console.log(date);
            initChart2(datalist);
            return;
        },
        error: function(res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup)) {
                this.url = this.dataUrlBackup;
                $.ajax(this);
            }
        }
    });
}

var initChart2 = function(datalist) {
    $.ajax({
        url: predictUrl,
        type: 'get',
        success: function(res) {
            //console.log(datalist)
            var chartData = res;
            var date = [];
            var data = [];
            var relArr = chartData.split("\n");
            if (!$.isEmptyObject(relArr) && relArr.length > 1) {
                for (var key = 1, len = relArr.length; key < len; key++) {
                    var values = relArr[key];
                    if (!$.isEmptyObject(values)) {
                        //console.log(values);
                        var obj = {};
                        var objArr = values.split(",");
                        obj["province"] = objArr[1];
                        obj["confirmedCount"] = objArr[2];
                        obj["updateTime"] = objArr[0];
                        data.push(obj);
                        //console.log(obj);
                    }
                }
            }
            //console.log(data);
            var now;
            for (var i in datalist) {
                now = i;
            }
            for (var i in data) {

                var showtime = data[i].updateTime;
                if ($.isEmptyObject(datalist[showtime])) {
                    datalist[showtime] = [];
                }
                var confirmedCount = data[i].confirmedCount;
                var name = data[i].province;
                if (showtime > now) {
                    datalist[showtime].push({
                        name: name,
                        value: confirmedCount
                    });
                }
            }
            console.log(datalist);
            //console.log(datalist[20200601][0]);
            //console.log(datalist[20200501]);
            //console.log(datalist[20200601]);
            for (var i in datalist) {
                date.push(i);
            }
            //date = date.reverse;
            //console.log(date);
            if (w < 1000) {
                initChart_small(date, datalist);
            } else {
                initChart_big(date, datalist);
            }
            return;
        }
    });
}

var initChart_small = function(date, datalist) {
    //console.log(datalist);

    function getOffsetDays(time1, time2) {
        var offsetTime = Math.abs(time1 - time2);
        return Math.floor(offsetTime / (3600 * 24 * 1e3));
    };

    function getdaynow() {
        var date = new Date();
        var mytime = date.toLocaleDateString();
        if (mytime[6] == "/") {
            var m = '0' + mytime[5];
            if (mytime[8] == "0" || mytime[8] == "1" || mytime[8] == "2" || mytime[8] == "3" || mytime[8] == "4" || mytime[8] == "5" || mytime[8] == "6" || mytime[8] == "7" || mytime[8] == "8" || mytime[8] == "9") {
                var d = mytime[7] + mytime[8];
            } else {
                var d = '0' + mytime[7];
            }
        } else {
            var m = mytime[5] + mytime[6];
            if (mytime[9] == "0" || mytime[9] == "1" || mytime[9] == "2" || mytime[9] == "3" || mytime[9] == "4" || mytime[9] == "5" || mytime[9] == "6" || mytime[9] == "7" || mytime[9] == "8" || mytime[9] == "9") {
                var d = mytime[8] + mytime[9];
            } else {
                var d = '0' + mytime[8];
            }
        }
        return m + '-' + d;
    };

    var geoCoordMap = {
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

    var convertData = function(data) {
        var res = [];
        for (var i in data) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        //console.log(res);
        return res;
    };

    var option = {
        baseOption: {
            timeline: {
                axisType: 'category',
                realtime: true,
                loop: true,
                autoPlay: false,
                rewind: false,
                currentIndex: getOffsetDays(Date.now(), (new Date(2020, 2, 15)).getTime()),
                playInterval: 1000,
                left: 0,
                top: '10%',
                bottom: 0,
                orient: 'vertical',
                data: date,
                label: {
                    position: 12,
                    interval: 7,
                    rotate: -90,
                    color: '#fff',
                },
                itemStyle: {
                    color: '#fff',
                    borderColor: '#123555'
                },
                checkpointStyle: {
                    symbol: 'diamond',
                },
                controlStyle: {
                    color: '#fff',
                }
            },

            backgroundColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{ //渐变
                        offset: 0,
                        color: '#1e1e1e' // 0% 处的颜色
                    },
                    {
                        offset: 0.5,
                        color: '#111111'
                    },
                    {
                        offset: 1,
                        color: '#000000' // 100% 处的颜色
                    }
                ],
            },

            animationDurationUpdate: 1000,

            title: {
                subtext: '时间跨度为03.15-08.30(今日之后为预测数据)\n点击左下方播放按钮可循环播放',
                sublink: 'https://covidtracking.com',
                x: 'left',
                textStyle: {
                    color: '#fff'
                },
                subtextStyle: {
                    color: '#fff',
                    fontSize: '100%'
                }
            },

            legend: {
                selected: {
                    '热图': false,
                },
                icon: 'circle',
                orient: 'vertical',
                top: '4%',
                left: 'right',
                data: [{
                        name: '热图',
                    },
                    {
                        name: 'Top',
                    },
                    {
                        name: '散点',
                    },
                ],
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
                seriesIndex: 1,
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
                }
            },

            tooltip: {
                trigger: 'item'
            },

            grid: {
                right: '0%',
                top: '60%',
                bottom: '0%',
                width: '72%'
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
                    { min: 200000 },
                    { min: 100000, max: 200000 },
                    { min: 50000, max: 100000 },
                    { min: 10000, max: 50000 },
                    { min: 1000, max: 10000 },
                    { min: 500, max: 1000 },
                    { min: 100, max: 500 },
                    { max: 100 }
                ],
                seriesIndex: [0, 1, 2],
                inRange: {
                    color: ['aqua', '#eac736', '#ff3300']
                },
                textStyle: {
                    color: '#fff'
                },
                left: 'right',
                bottom: '0%'
            },

            geo: {
                center: [-79.031229, 32],

                roam: true, //缩放平移

                zoom: 2,

                scaleLimit: {
                    min: 1,
                    max: 16,
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
                    id: '1',
                    type: 'heatmap',
                    coordinateSystem: 'geo',
                    data: []
                },
                {
                    name: '散点',
                    id: '2',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: function(val) {
                        if (val[2] > 100 && val[2] < 10000) {
                            return (3 + Math.log2(val[2]));
                        }
                        if (val[2] >= 10000 && val[2] < 100000) {
                            return (3 + 1.5 * Math.log2(val[2]));
                        }
                        if (val[2] <= 100) {
                            return (5 + val[2] / 25)
                        }
                        if (val[2] > 100000) {
                            return (3 + 2 * Math.log2(val[2]));
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
                            color: 'aqua'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params) {
                            return params.name + ' : ' + params.value[2];
                        }
                    },
                },
                {
                    name: 'Top',
                    id: '3',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: function(val) {
                        return (2 * Math.log2(val[2] - 1));
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
                        formatter: function(params) {
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
        },
        options: []
    }

    var convertedData = [];
    for (var n in datalist) {
        //console.log(n);
        //console.log(datalist[n])
        convertedData[n] = [
            convertData(datalist[n]),
            convertData(datalist[n].sort(function(a, b) {
                return b.value - a.value;
            }).slice(0, 5))
        ];
        //console.log(convertedData[n]);
        option.options.push({
            title: {
                top: 10,
                text: n.slice(4, 6) + '-' + n.slice(-2) + '患者总量状况',
                textStyle: {
                    color: '#fff',
                    fontSize: '130%'
                },
            },
            series: [{
                id: '1',
                data: convertedData[n][0]
            }, {
                id: '2',
                data: convertedData[n][0]
            }, {
                id: '3',
                data: convertedData[n][1]
            }]
        });
    }

    $.getJSON("../incubator-echarts-4.6.0/map/json/USA.json", function(usaJson) {
        echarts.registerMap('USA', usaJson, {
            Alaska: { // 把阿拉斯加移到美国主大陆左下方
                left: -131,
                top: 25,
                width: 15
            },
            Hawaii: {
                left: -110, // 夏威夷
                top: 26,
                width: 5
            },
            'Puerto Rico': { // 波多黎各
                left: -76,
                top: 26,
                width: 2
            }
        });
        myChart.hideLoading();
        myChart.setOption(option);
        myChart.on('brushselected', renderBrushed);
        myChart.on('timelineplaychanged', jojo);
        myChart.on('timelinechanged', notice);
        myChart.on('click', sufe);
        window.timelineIndex = getOffsetDays(Date.now(), (new Date(2020, 2, 15)).getTime());
        myChart.on('timelinechanged', function(params) {
            timelineIndex = params.currentIndex;
        });
        setTimeout(function() {
            myChart.dispatchAction({
                type: 'brush',
                areas: [{
                    geoIndex: 0,
                    brushType: 'polygon',
                    coordRange: [
                        [-75, 46],
                        [-60, 46],
                        [-60, 40],
                        [-75, 40]
                    ]
                }]
            });
        }, 0);
    })


    function dateAddDays(dateStr, dayCount) {
        dateStr = dateStr.substring(0, 4) + "-" + dateStr.substring(5, 7) + "-" + dateStr.slice(-2);
        //console.log(dateStr);
        var tempDate = new Date(dateStr.replace(/-/g, "/")); //把日期字符串转换成日期格式
        var resultDate = new Date((tempDate / 1000 + (86400 * dayCount)) * 1000); //增加n天后的日期
        var date = resultDate.getDate();
        if (date < 10) {
            date = "0" + date;
        }
        var resultDateStr = resultDate.getFullYear() + "0" + (resultDate.getMonth() + 1) + date; //将日期转化为字符串格式
        return resultDateStr;
    }

    function renderBrushed(params) {
        console.log(timelineIndex);
        var mainSeries = params.batch[0].selected[0];
        var selectedItems = [];
        var categoryData = [];
        var barData = [];
        var maxBar = 30;
        var sum = 0;
        var count = 0;
        for (var i = 0; i < mainSeries.dataIndex.length; i++) {
            var rawIndex = mainSeries.dataIndex[i];
            //console.log(rawIndex);
            var a = dateAddDays('2020-03-15', timelineIndex);
            console.log(a);

            function getday(mytime) {
                if (mytime[6] == "-") {
                    var m = '0' + mytime[5];
                    if (mytime[8] == "0" || mytime[8] == "1" || mytime[8] == "2" || mytime[8] == "3" || mytime[8] == "4" || mytime[8] == "5" || mytime[8] == "6" || mytime[8] == "7" || mytime[8] == "8" || mytime[8] == "9") {
                        var d = mytime[7] + mytime[8];
                    } else {
                        var d = '0' + mytime[7];
                    }
                } else {
                    var m = mytime[5] + mytime[6];
                    if (mytime[9] == "0" || mytime[9] == "1" || mytime[9] == "2" || mytime[9] == "3" || mytime[9] == "4" || mytime[9] == "5" || mytime[9] == "6" || mytime[9] == "7" || mytime[9] == "8" || mytime[9] == "9") {
                        var d = mytime[8] + mytime[9];
                    } else {
                        var d = '0' + mytime[8];
                    }
                }
                return m + '-' + d;
            };
            var dataItem = convertedData[a][0][rawIndex];
            //console.log(dataItem);
            var Value = parseInt(dataItem.value[2], 10);
            sum = sum + Value;
            count++;
            selectedItems.push(dataItem);
        }
        //console.log(selectedItems);
        selectedItems.sort(function(a, b) {
            return a.value[2] - b.value[2];
        });
        //console.log(selectedItems);
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
                right: '25%',
                bottom: '3%',
                text: count ? '区域内总和:\n  ' + sum : '',
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

    function sufe(params) {
        if (params.componentType === 'graphic') {
            window.open('http://www.shufe.edu.cn/');
        }
    }

    function notice(params) {
        if (params.currentIndex == getOffsetDays(Date.now(), (new Date(2020, 2, 15)).getTime()) + 1) {
            window.alert(getdaynow() + '之后地图所示为预测数据仅做参考。\n中国加油 武汉加油')
        }
    }

    function jojo() {
        var x = document.getElementById('myAudio');
        x.play();
    }
}

var initChart_big = function(date, datalist) {
    function getOffsetDays(time1, time2) {
        var offsetTime = Math.abs(time1 - time2);
        return Math.floor(offsetTime / (3600 * 24 * 1e3));
    };

    function getdaynow() {
        var date = new Date();
        var mytime = date.toLocaleDateString();
        if (mytime[6] == "/") {
            var m = '0' + mytime[5];
            if (mytime[8] == "0" || mytime[8] == "1" || mytime[8] == "2" || mytime[8] == "3" || mytime[8] == "4" || mytime[8] == "5" || mytime[8] == "6" || mytime[8] == "7" || mytime[8] == "8" || mytime[8] == "9") {
                var d = mytime[7] + mytime[8];
            } else {
                var d = '0' + mytime[7];
            }
        } else {
            var m = mytime[5] + mytime[6];
            if (mytime[9] == "0" || mytime[9] == "1" || mytime[9] == "2" || mytime[9] == "3" || mytime[9] == "4" || mytime[9] == "5" || mytime[9] == "6" || mytime[9] == "7" || mytime[9] == "8" || mytime[9] == "9") {
                var d = mytime[8] + mytime[9];
            } else {
                var d = '0' + mytime[8];
            }
        }
        return m + '-' + d;
    };

    var geoCoordMap = {
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

    var convertData = function(datalist) {
        var res = [];
        for (var i = 0; i < datalist.length; i++) {
            var geoCoord = geoCoordMap[datalist[i].name];
            if (geoCoord) {
                res.push({
                    name: datalist[i].name,
                    value: geoCoord.concat(datalist[i].value)
                });
            }
        }
        //console.log(res);
        return res;
    };

    var option = {
        baseOption: {
            timeline: {
                axisType: 'category',
                realtime: true,
                loop: true,
                autoPlay: false,
                rewind: false,
                currentIndex: getOffsetDays(Date.now(), (new Date(2020, 2, 15)).getTime()),
                playInterval: 1000,
                left: 0,
                right: 0,
                bottom: '2%',
                data: date,
                label: {
                    position: 'bottom',
                    interval: 7,
                    rotate: -30,
                    color: '#fff',
                },
                itemStyle: {
                    color: '#fff',
                    borderColor: '#123555'
                },
                checkpointStyle: {
                    symbol: 'diamond',
                },
                controlStyle: {
                    color: '#fff',
                }
            },

            backgroundColor: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{ //渐变
                        offset: 0,
                        color: '#1e1e1e' // 0% 处的颜色
                    },
                    {
                        offset: 0.5,
                        color: '#111111'
                    },
                    {
                        offset: 1,
                        color: '#000000' // 100% 处的颜色
                    }
                ],
            },

            animationDurationUpdate: 1000,

            title: {
                x: 'left',
                textStyle: {
                    color: '#fff'
                },
                subtextStyle: {
                    color: '#fff',
                    fontSize: '100%'
                }
            },

            graphic: [{ //区域选择说明
                    type: 'text',
                    right: '9',
                    top: '4%',
                    style: {
                        fill: '#fff',
                        text: '关闭热图以使用区域选择',
                        font: 'bold 13px Microsoft YaHei'
                    }
                },
                {
                    type: 'text',
                    left: '12',
                    top: '8%',
                    style: {
                        fill: '#fff',
                        text: '时间跨度为03.15-08.30(今日之后为预测数据)',
                        font: 'bold 13px Microsoft YaHei'
                    }
                },
                {
                    type: 'text',
                    left: '12',
                    top: '10.5%',
                    style: {
                        fill: '#fff',
                        text: '数据来自covidtracking',
                        font: 'bold 13px Microsoft YaHei'
                    }
                },
                {
                    type: 'text',
                    left: '14',
                    top: '14%',
                    style: {
                        fill: '#fff',
                        text: '(点击左下方播放按钮可循环播放)',
                        font: 'bold 13px Microsoft YaHei'
                    }
                },
            ],

            legend: {
                selected: {
                    '热图': false,
                },
                icon: 'circle',
                orient: 'vertical',
                top: '6%',
                left: 'right',
                data: [{
                        name: '热图',
                    },
                    {
                        name: 'Top',
                    },
                    {
                        name: '散点',
                    },
                ],
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
                seriesIndex: 1,
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
                }
            },

            tooltip: {
                trigger: 'item'
            },

            grid: {
                right: '2%',
                top: '22%',
                bottom: '10%',
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
                    { min: 200000 },
                    { min: 100000, max: 200000 },
                    { min: 50000, max: 100000 },
                    { min: 10000, max: 50000 },
                    { min: 1000, max: 10000 },
                    { min: 500, max: 1000 },
                    { min: 100, max: 500 },
                    { max: 100 }
                ],
                seriesIndex: [0, 1, 2],
                inRange: {
                    color: ['aqua', '#eac736', '#ff3300']
                },
                textStyle: {
                    color: '#fff'
                },
                bottom: '10%'
            },

            geo: {
                center: [-90.5331, 37.681402],

                roam: true, //缩放平移

                scaleLimit: {
                    min: 0.5,
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
                    id: '1',
                    type: 'heatmap',
                    coordinateSystem: 'geo',
                    data: []
                },
                {
                    name: '散点',
                    id: '2',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: function(val) {
                        if (val[2] > 100 && val[2] < 10000) {
                            return (3 + Math.log2(val[2]));
                        }
                        if (val[2] >= 10000 && val[2] < 100000) {
                            return (3 + 1.5 * Math.log2(val[2]));
                        }
                        if (val[2] <= 100) {
                            return (5 + val[2] / 25)
                        }
                        if (val[2] > 100000) {
                            return (3 + 2 * Math.log2(val[2]));
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
                            color: 'aqua'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: function(params) {
                            return params.name + ' : ' + params.value[2];
                        }
                    },
                },
                {
                    name: 'Top',
                    id: '3',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: [],
                    symbolSize: function(val) {
                        return (2 * Math.log2(val[2] - 1));
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
                        formatter: function(params) {
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
        },
        options: []
    }
    var convertedData = [];
    for (var n in datalist) {
        convertedData[n] = [
            convertData(datalist[n]),
            convertData(datalist[n].sort(function(a, b) {
                return b.value - a.value;
            }).slice(0, 5))
        ];
        option.options.push({
            title: {
                top: 10,
                left: 10,
                text: n.slice(4, 6) + '-' + n.slice(-2) + '新冠患者总量状况',
                textStyle: {
                    color: '#fff',
                    fontSize: 26
                },
            },
            series: [{
                id: '1',
                data: convertedData[n][0]
            }, {
                id: '2',
                data: convertedData[n][0]
            }, {
                id: '3',
                data: convertedData[n][1]
            }]
        });
    }

    $.getJSON("../incubator-echarts-4.6.0/map/json/USA.json", function(usaJson) {
        echarts.registerMap('USA', usaJson, {
            Alaska: { // 把阿拉斯加移到美国主大陆左下方
                left: -131,
                top: 25,
                width: 15
            },
            Hawaii: {
                left: -110, // 夏威夷
                top: 26,
                width: 5
            },
            'Puerto Rico': { // 波多黎各
                left: -76,
                top: 26,
                width: 2
            }
        });
        myChart.hideLoading();
        myChart.setOption(option);
        myChart.on('brushselected', renderBrushed);
        myChart.on('timelineplaychanged', jojo);
        myChart.on('timelinechanged', notice);
        myChart.on('click', sufe);
        window.timelineIndex = getOffsetDays(Date.now(), (new Date(2020, 2, 15)).getTime());
        myChart.on('timelinechanged', function(params) {
            timelineIndex = params.currentIndex;
        });
        setTimeout(function() {
            myChart.dispatchAction({
                type: 'brush',
                areas: [{
                    geoIndex: 0,
                    brushType: 'polygon',
                    coordRange: [
                        [-75, 46],
                        [-60, 46],
                        [-60, 40],
                        [-75, 40]
                    ]
                }]
            });
        }, 0);
    })

    function dateAddDays(dateStr, dayCount) {
        dateStr = dateStr.substring(0, 4) + "-" + dateStr.substring(5, 7) + "-" + dateStr.slice(-2);
        //console.log(dateStr);
        var tempDate = new Date(dateStr.replace(/-/g, "/")); //把日期字符串转换成日期格式
        var resultDate = new Date((tempDate / 1000 + (86400 * dayCount)) * 1000); //增加n天后的日期
        var date = resultDate.getDate();
        if (date < 10) {
            date = "0" + date;
        }
        var resultDateStr = resultDate.getFullYear() + "0" + (resultDate.getMonth() + 1) + date; //将日期转化为字符串格式
        return resultDateStr;
    }

    function renderBrushed(params) {
        console.log(timelineIndex);
        var mainSeries = params.batch[0].selected[0];
        var selectedItems = [];
        var categoryData = [];
        var barData = [];
        var maxBar = 30;
        var sum = 0;
        var count = 0;
        for (var i = 0; i < mainSeries.dataIndex.length; i++) {
            var rawIndex = mainSeries.dataIndex[i];
            //console.log(rawIndex);
            var a = dateAddDays('2020-03-15', timelineIndex);
            console.log(a);

            function getday(mytime) {
                if (mytime[6] == "-") {
                    var m = '0' + mytime[5];
                    if (mytime[8] == "0" || mytime[8] == "1" || mytime[8] == "2" || mytime[8] == "3" || mytime[8] == "4" || mytime[8] == "5" || mytime[8] == "6" || mytime[8] == "7" || mytime[8] == "8" || mytime[8] == "9") {
                        var d = mytime[7] + mytime[8];
                    } else {
                        var d = '0' + mytime[7];
                    }
                } else {
                    var m = mytime[5] + mytime[6];
                    if (mytime[9] == "0" || mytime[9] == "1" || mytime[9] == "2" || mytime[9] == "3" || mytime[9] == "4" || mytime[9] == "5" || mytime[9] == "6" || mytime[9] == "7" || mytime[9] == "8" || mytime[9] == "9") {
                        var d = mytime[8] + mytime[9];
                    } else {
                        var d = '0' + mytime[8];
                    }
                }
                return m + '-' + d;
            };
            var dataItem = convertedData[a][0][rawIndex];
            //console.log(dataItem);
            var Value = parseInt(dataItem.value[2], 10);
            sum = sum + Value;
            count++;
            selectedItems.push(dataItem);
        }
        //console.log(selectedItems);
        selectedItems.sort(function(a, b) {
            return a.value[2] - b.value[2];
        });
        //console.log(selectedItems);
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
                text: count ? '区域内总和: ' + sum : '',
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

    function sufe(params) {
        if (params.componentType === 'graphic') {
            window.open('https://covidtracking.com');
        }
    }

    function notice(params) {
        if (params.currentIndex == getOffsetDays(Date.now(), (new Date(2020, 2, 15)).getTime()) + 1) {
            window.alert(getdaynow() + '之后地图所示为预测数据仅做参考。\n山川异域风月同天')
        }
    }

    function jojo() {
        var x = document.getElementById('myAudio');
        x.play();
    }
}