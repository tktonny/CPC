$(document).ready(function () {

    var order = echarts.init(document.getElementById('R4'));
    order.showLoading({
        text: '加载中...',
        effect: 'whirling'
    });
    var data_ex = [
      {
        "Infected": 3579,
        "Acc_Infected": 13034
      },
      {
        "Infected": 3279,
        "Acc_Infected": 13076
      },
      {
        "Infected": 2987,
        "Acc_Infected": 13112
      },
      {
        "Infected": 2720,
        "Acc_Infected": 13143
      },
      {
        "Infected": 2475,
        "Acc_Infected": 13170
      },
      {
        "Infected": 2250,
        "Acc_Infected": 13193
      },
      {
        "Infected": 2045,
        "Acc_Infected": 13213
      },
      {
        "Infected": 1858,
        "Acc_Infected": 13230
      },
      {
        "Infected": 1687,
        "Acc_Infected": 13245
      }
    ];
    var data_hb = [
        {
          "Infected": 39755,
          "Acc_Infected": 65596
        },
        {
          "Infected": 38242,
          "Acc_Infected": 65890
        },
        {
          "Infected": 36757,
          "Acc_Infected": 66143
        },
        {
          "Infected": 35302,
          "Acc_Infected": 66360
        },
        {
          "Infected": 33883,
          "Acc_Infected": 66545
        },
        {
          "Infected": 32502,
          "Acc_Infected": 66704
        },
        {
          "Infected": 31161,
          "Acc_Infected": 66841
        },
        {
          "Infected": 29862,
          "Acc_Infected": 66958
        },
        {
          "Infected": 28605,
          "Acc_Infected": 67058
        }
    ];
    var data = [];
    var dataacc = [];
    for (var i = 0; i < 8; i++) {
        dataacc.push(data_hb[i].Infected);
        data.push(data_ex[i].Infected);
    }
    echartsOption  = {
        title: {
            text: '湖北/全国 现有确诊七日预测(02-27)',
            textStyle: {
                fontWeight: 'normal',
                color: '#123555'
            },
            left: '0px'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        },
        legend: {
            top:30,
            itemGap: 1,
            data: ['湖北患者','全国患者'],
            right: '2%',
            textStyle: {
                fontSize: 12,
                color: '#123555'
            }
        },
        grid: {
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: '#57617B'
                }
            },
            data: [0,1,2,3,4,5,6,7]
        }
        ],
        yAxis: [{
            type: 'value',
            axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'gray'
                }
            },
            axisLabel: {
                margin: 4,
                textStyle: {
                    fontSize: 8
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#57617B'
                }
            }
        }],
        series: [
        {
            name: '湖北患者',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(137, 189, 27, 0.8)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(137, 189, 27, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: '#f1a325',
                    borderColor: 'rgba(137,189,2,0.27)',
                    borderWidth: 12
                }
            },
            data: dataacc
        },{
            name: '全国患者',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 5,
            showSymbol: true,
            lineStyle: {
                normal: {
                    width: 1
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                            color: 'rgba(0, 136, 212, 0.8)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(0, 136, 212, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: '#123555',
                    borderColor: 'rgba(0,136,212,0.2)',
                    borderWidth: 12

                }
            },
            data: data
        }]
    };
    order.hideLoading();
    order.setOption(echartsOption);
    });