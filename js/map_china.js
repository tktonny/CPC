var dataUrl = "https://raw.githubusercontent.com/canghailan/Wuhan-2019-nCoV/master/Wuhan-2019-nCoV.csv";
var dataUrlBackup = "./data/Wuhan-2019-nCoV-20200514.csv";
var w = window.innerWidth;
$(document).ready(function() {
    initChart();
});
var myChart = echarts.init(document.getElementById('china'));
myChart.showLoading({
    animation: 'QuarticIn',
    text: 'Loading',
});

var initChart = function() {
    $.ajax({
        url: dataUrlBackup,
        type: 'get',
        success: function(res) {
            var chartData = res;
            var datalist = [];
            var Data = [];
            var relArr = chartData.split("\n");
            console.log(relArr);
            if (!$.isEmptyObject(relArr) && relArr.length > 1) {
                for (var key = 1, len = relArr.length; key < len; key++) {
                    var values = relArr[key];
                    if (!$.isEmptyObject(values)) {
                        //console.log(values);
                        var obj = {};
                        var objArr = values.split(",");
                        var dataTime = new Date(objArr[0]);
                        var dateTime = new Date(2020, 0, 26);

                        function formatDate(date) {
                            var m = date.getMonth() + 1;
                            m = m < 10 ? ('0' + m) : m;
                            var d = date.getDate();
                            d = d < 10 ? ('0' + d) : d;
                            return (m + '-' + d);
                        }
                        obj["province"] = objArr[3];
                        obj["cityName"] = objArr[5];
                        obj["confirmedCount"] = objArr[7] - objArr[9] - objArr[10];
                        obj["updateTime"] = formatDate(dataTime);
                        if (dateTime.getTime() <= dataTime.getTime()) {
                            Data.push(obj);
                        }
                    }
                }
            }

            for (var i in Data) {
                var showtime = Data[i].updateTime;
                if ($.isEmptyObject(datalist[showtime]))
                    datalist[showtime] = [];
                var name1 = Data[i].province;
                var confirmedCount = Data[i].confirmedCount ? Data[i].confirmedCount : Data[i].confirmedCount;
                var name2 = Data[i].cityName;
                datalist[showtime].push({
                    name: name2,
                    value: confirmedCount
                });
                if ((name1 == "上海市" || name1 == "北京市" || name1 == "天津市" || name1 == "重庆市") && (name2 == '')) {
                    datalist[showtime].push({
                        name: name1,
                        value: confirmedCount
                    });
                }

            }
            //console.log(datalist['02-10'][0]);
            //console.log(datalist['02-10']);
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
        url: "/prevents_2020_07/data/predict_.csv",
        type: 'get',
        success: function(res) {
            var chartdata = res;
            var data = [];
            var city = [];
            var date = [];
            var firstline = [];
            var relArr = chartdata.split("\n");
            console.log(relArr);
            if (!$.isEmptyObject(relArr)) {
                firstline = relArr[0];
                city = firstline.split(",");
                //console.log(city);
                for (var key = 1, len = relArr.length; key < len; key++) {
                    var values = relArr[key];
                    if (!$.isEmptyObject(values)) {
                        //console.log(values);
                        var objArr = values.split(",");
                        var dataTime = new Date(objArr[0]);
                        //console.log(objArr[0]);
                        var dateTime = new Date(Date.now());
                        //console.log(dataTime);
                        //console.log(dateTime);
                        function formatDate(date) {
                            var m = date.getMonth() + 1;
                            m = m < 10 ? ('0' + m) : m;
                            var d = date.getDate();
                            d = d < 10 ? ('0' + d) : d;
                            return (m + '-' + d);
                        }
                        for (var j = 1, len = objArr.length; j < len; j++) {
                            var value = objArr[j];
                            if (!$.isEmptyObject(value)) {
                                var obj = {};
                                obj["cityName"] = city[j];
                                obj["confirmedCount"] = value;
                                obj["updateTime"] = formatDate(dataTime);
                                if (dateTime.getTime() < dataTime.getTime()) {
                                    data.push(obj);
                                }
                            }
                        }
                    }
                }
            }
            //console.log(data);
            for (var i in data) {
                var showtime = data[i].updateTime;
                if ($.isEmptyObject(datalist[showtime])) {
                    datalist[showtime] = [];
                }
                var confirmedCount = data[i].confirmedCount ? data[i].confirmedCount : data[i].confirmedCount;
                var name = data[i].cityName;
                datalist[showtime].push({
                    name: name,
                    value: confirmedCount
                });
            }
            //console.log(datalist['02-28'][0]);
            //console.log(datalist['02-28']);
            //console.log(datalist['02-27']);
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
            "北京市": [116.395645, 39.929986],
            "天津市": [117.210813, 39.14393],
            "上海市": [121.487899, 31.249162],
            "重庆市": [106.530635, 29.544606],
            "香港": [114.186124, 22.293586],
            "澳门": [113.557519, 22.204118],
            "台湾": [120.961454, 23.80406],
            // 湖北省
            "武汉市": [114.3162, 30.581084],
            "黄石市": [115.050683, 30.216127],
            "十堰市": [110.801229, 32.636994],
            "襄阳市": [112.176326, 32.094934],
            "宜昌市": [111.310981, 30.732758],
            "荆州市": [112.241866, 30.332591],
            "荆门市": [112.21733, 31.042611],
            "鄂州市": [114.895594, 30.384439],
            "孝感市": [113.935734, 30.927955],
            "黄冈市": [114.906618, 30.446109],
            "咸宁市": [114.300061, 29.880657],
            "随州市": [113.379358, 31.717858],
            "恩施土家族苗族自治州": [109.517433, 30.308978],
            "仙桃市": [113.443107, 30.327249],
            "天门市": [113.168020, 30.663312],
            "潜江市": [112.900485, 30.401380],
            "神农架林区": [110.487231, 31.595768],
            //新疆维吾尔自治区
            "克拉玛依市": [84.88118, 45.594331],
            "乌鲁木齐市": [87.564988, 43.84038],
            "巴音郭楞蒙古自治州": [86.121688, 41.771362],
            "伊犁哈萨克自治州": [81.297854, 43.922248],
            "吐鲁番市": [89.181595, 42.96047],
            "阿勒泰地区": [88.137915, 47.839744],
            "哈密市": [93.528355, 42.858596],
            "博尔塔拉蒙古族自治州": [82.052436, 44.913651],
            "阿克苏地区": [80.269846, 41.171731],
            "克孜勒苏柯尔克孜自治州": [76.137564, 39.750346],
            "昌吉回族自治州": [87.296038, 44.007058],
            "喀什地区": [75.992973, 39.470627],
            "和田地区": [79.930239, 37.116774],
            "塔城地区": [82.974881, 46.758684],
            "第四师": [85.564988, 40.84038],
            "第九师": [81.28, 40.55],
            "第十二师": [86.03, 47],
            "石河子市": [86.03, 44.3],
            "五家渠市": [87.53, 44.17],
            "第七师": [79.13, 39.85],
            //广西壮族自治区
            "崇左市": [107.357322, 22.415455],
            "柳州市": [109.422402, 24.329053],
            "百色市": [106.631821, 23.901512],
            "南宁市": [108.297234, 22.806493],
            "梧州市": [111.305472, 23.485395],
            "北海市": [109.122628, 21.472718],
            "桂林市": [110.26092, 25.262901],
            "河池市": [108.069948, 24.699521],
            "贵港市": [109.613708, 23.103373],
            "钦州市": [108.638798, 21.97335],
            "来宾市": [109.231817, 23.741166],
            "防城港市": [108.351791, 21.617398],
            "贺州市": [111.552594, 24.411054],
            "玉林市": [110.151676, 22.643974],
            // 西藏自治区
            "山南地区": [91.750644, 29.229027],
            "那曲地区": [92.067018, 31.48068],
            "阿里地区": [81.107669, 30.404557],
            "拉萨市": [91.111891, 29.662557],
            "昌都市": [97.185582, 31.140576],
            "林芝市": [94.349985, 29.666941],
            "日喀则市": [88.891486, 29.269023],
            //宁夏回族自治区
            "银川市": [106.206479, 38.502621],
            "吴忠市": [106.208254, 37.993561],
            "中卫市": [105.196754, 37.521124],
            "石嘴山市": [106.379337, 39.020223],
            "固原市": [106.285268, 36.021523],
            "宁东": [106.6, 38.45],
            // 内蒙古自治区
            "乌海市": [106.831999, 39.683177],
            "鄂尔多斯": [109.993706, 39.81649],
            "兴安盟": [122.048167, 46.083757],
            "锡林郭勒盟": [116.02734, 43.939705],
            "巴彦淖尔市": [107.423807, 40.76918],
            "赤峰市": [118.930761, 42.297112],
            "乌兰察布市": [113.112846, 41.022363],
            "呼伦贝尔市": [119.760822, 49.201636],
            "通辽市": [122.260363, 43.633756],
            "阿拉善盟": [105.695683, 38.843075],
            "包头市": [109.846239, 40.647119],
            "呼和浩特市": [111.660351, 40.828319],
            //四川省
            "遂宁市": [105.564888, 30.557491],
            "雅安市": [103.009356, 29.999716],
            "巴中市": [106.757916, 31.869189],
            "攀枝花市": [101.722423, 26.587571],
            "自贡市": [104.776071, 29.359157],
            "凉山彝族自治州": [102.259591, 27.892393],
            "广元市": [105.819687, 32.44104],
            "广安市": [106.63572, 30.463984],
            "宜宾市": [104.633019, 28.769675],
            "达州市": [107.494973, 31.214199],
            "南充市": [106.105554, 30.800965],
            "成都市": [104.067923, 30.679943],
            "内江市": [105.073056, 29.599462],
            "资阳市": [104.633019, 28.769675],
            "阿坝藏族羌族自治州": [102.228565, 31.905763],
            "甘孜藏族自治州": [101.969232, 30.055144],
            "绵阳市": [104.705519, 31.504701],
            "乐山市": [103.760824, 29.600958],
            "泸州市": [105.44397, 28.89593],
            "德阳市": [104.402398, 31.13114],
            "眉山市": [103.84143, 30.061115],
            //陕西省
            "安康市": [109.038045, 32.70437],
            "咸阳市": [108.707509, 34.345373],
            "渭南市": [109.483933, 34.502358],
            "汉中市": [107.045478, 33.081569],
            "延安市": [109.50051, 36.60332],
            "榆林市": [109.745926, 38.279439],
            "西安市": [108.953098, 34.2778],
            "铜川市": [108.968067, 34.908368],
            "宝鸡市": [107.170645, 34.364081],
            "商洛市": [109.934208, 33.873907],
            "韩城市": [110.44, 35.48],
            "杨凌示范区": [108, 34.3],
            // 河南省
            "焦作市": [113.211836, 35.234608],
            "南阳市": [112.542842, 33.01142],
            "三门峡市": [111.181262, 34.78332],
            "平顶山市": [113.300849, 33.745301],
            "驻马店市": [114.049154, 32.983158],
            "新乡市": [113.91269, 35.307258],
            "许昌市": [113.835312, 34.02674],
            "洛阳市": [112.447525, 34.657368],
            "开封市": [114.351642, 34.801854],
            "安阳市": [114.351807, 36.110267],
            "周口市": [114.654102, 33.623741],
            "信阳市": [114.085491, 32.128582],
            "郑州市": [113.649644, 34.75661],
            "濮阳市": [115.026627, 35.753298],
            "商丘市": [115.641886, 34.438589],
            "漯河市": [114.046061, 33.576279],
            "鹤壁市": [114.29777, 35.755426],
            //浙江省
            "丽水市": [119.929576, 28.4563],
            "衢州市": [118.875842, 28.95691],
            "台州市": [121.440613, 28.668283],
            "宁波市": [121.579006, 29.885259],
            "杭州市": [120.219375, 30.259244],
            "金华市": [119.652576, 29.102899],
            "温州市": [120.690635, 28.002838],
            "绍兴市": [120.592467, 30.002365],
            "嘉兴市": [120.760428, 30.773992],
            "湖州市": [120.137243, 30.877925],
            "舟山市": [122.169872, 30.03601],
            "省十里丰监狱": [119, 29],
            // 海南省
            "海口市": [110.330802, 20.022071],
            "三亚市": [109.522771, 18.257776],
            "万宁市": [109.9267865, 19.1399235],
            "五指山": [109.52, 18.78],
            "琼海市": [110.47, 19.52],
            "昌江黎族自治县": [109.05, 19.25],
            "儋州市": [109.57, 19.52],
            "澄迈县": [110, 19.73],
            "保亭": [109.7, 18.63],
            "临高县": [109.68, 19.92],
            "东方市": [108.63, 19.1],
            "陵水黎族自治县": [110.03, 18.5],
            "定安县": [110.32, 19.7],
            "文昌": [110.8, 19.55],
            "乐东黎族自治县": [109.17, 18.75],
            "琼中黎族苗族自治县": [109.83, 19.03],
            // 山西省
            "运城市": [111.006854, 35.038859],
            "忻州市": [112.727939, 38.461031],
            "晋城市": [112.867333, 35.499834],
            "临汾市": [111.538788, 36.099745],
            "阳泉市": [113.569238, 37.869529],
            "长治市": [113.120292, 36.201664],
            "吕梁市": [111.143157, 37.527316],
            "太原市": [112.550864, 37.890277],
            "大同市": [113.290509, 40.113744],
            "朔州市": [112.479928, 39.337672],
            "晋中市": [112.738514, 37.693362],
            // 广东省
            "韶关市": [113.594461, 24.80296],
            "惠州市": [114.410658, 23.11354],
            "揭阳市": [116.379501, 23.547999],
            "云浮市": [112.050946, 22.937976],
            "深圳市": [114.025974, 22.546054],
            "潮州市": [116.630076, 23.661812],
            "清远市": [113.040773, 23.698469],
            "梅州市": [116.126403, 24.304571],
            "广州市": [113.30765, 23.120049],
            "东莞市": [113.763434, 23.043024],
            "江门市": [113.078125, 22.575117],
            "肇庆市": [112.479653, 23.078663],
            "茂名市": [110.931245, 21.668226],
            "阳江市": [111.97701, 21.871517],
            "汕尾市": [115.372924, 22.778731],
            "河源市": [114.713721, 23.757251],
            "中山市": [113.42206, 22.545178],
            "佛山市": [113.134026, 23.035095],
            "汕头市": [116.72865, 23.383908],
            "湛江市": [110.365067, 21.257463],
            "珠海市": [113.562447, 22.256915],
            // 云南省
            "怒江傈僳族自治州": [98.859932, 25.860677],
            "迪庆藏族自治州": [99.713682, 27.831029],
            "昭通市": [103.725021, 27.340633],
            "西双版纳傣族自治州": [100.803038, 22.009433],
            "玉溪市": [102.545068, 24.370447],
            "临沧市": [100.092613, 23.887806],
            "大理白族州": [100.223675, 25.5969],
            "丽江市": [100.229628, 26.875351],
            "楚雄州": [101.529382, 25.066356],
            "红河哈尼族彝族自治州": [103.384065, 23.367718],
            "文山州": [104.089112, 23.401781],
            "昆明市": [102.714601, 25.049153],
            "曲靖市": [103.782539, 25.520758],
            "保山市": [99.177996, 25.120489],
            "思茅市": [100.980058, 22.788778],
            "德宏傣族景颇族州": [98.589434, 24.44124],
            "普洱市": [101, 23],
            // 贵州省
            "贵阳市": [106.709177, 26.629907],
            "黔西南布依族苗族自治州": [104.900558, 25.095148],
            "铜仁市": [109.196161, 27.726271],
            "黔东南苗族侗族州": [107.985353, 26.583992],
            "遵义市": [106.93126, 27.699961],
            "毕节市": [105.300492, 27.302612],
            "黔南布依族苗族州": [107.523205, 26.264536],
            "六盘水市": [104.852087, 26.591866],
            "安顺市": [105.92827, 26.228595],
            // 辽宁省
            "鞍山市": [123.007763, 41.118744],
            "本溪市": [123.778062, 41.325838],
            "营口市": [122.233391, 40.668651],
            "大连市": [121.593478, 38.94871],
            "铁岭市": [123.85485, 42.299757],
            "朝阳市": [120.446163, 41.571828],
            "抚顺市": [123.92982, 41.877304],
            "盘锦市": [122.073228, 41.141248],
            "丹东市": [124.338543, 40.129023],
            "葫芦岛市": [120.860758, 40.74303],
            "锦州市": [121.147749, 41.130879],
            "沈阳市": [123.432791, 41.808645],
            "辽阳市": [123.172451, 41.273339],
            "阜新市": [121.660822, 42.01925],
            // 河北省
            "廊坊市": [116.703602, 39.518611],
            "衡水市": [115.686229, 37.746929],
            "秦皇岛市": [119.604368, 39.945462],
            "承德市": [117.933822, 40.992521],
            "沧州市": [116.863806, 38.297615],
            "张家口市": [114.893782, 40.811188],
            "石家庄市": [114.522082, 38.048958],
            "保定市": [115.49481, 38.886565],
            "唐山市": [118.183451, 39.650531],
            "邢台市": [114.520487, 37.069531],
            "邯郸市": [114.482694, 36.609308],
            // 青海省
            "海南藏族自治州": [100.624066, 36.284364],
            "海西蒙古族藏族自治州": [97.342625, 37.373799],
            "海东市": [102.085207, 36.51761],
            "果洛藏族自治州": [100.223723, 34.480485],
            "西宁市": [101.767921, 36.640739],
            "海北藏族自治州": [100.879802, 36.960654],
            "黄南藏族自治州": [102.0076, 35.522852],
            "玉树藏族自治州": [97.013316, 33.00624],
            // 湖南省
            "邵阳市": [111.461525, 27.236811],
            "张家界市": [110.48162, 29.124889],
            "益阳市": [112.366547, 28.588088],
            "怀化市": [109.986959, 27.557483],
            "湘西土家族苗族自治州": [109.745746, 28.317951],
            "郴州市": [113.037704, 25.782264],
            "衡阳市": [112.583819, 26.898164],
            "永州市": [111.614648, 26.435972],
            "株洲市": [113.131695, 27.827433],
            "岳阳市": [113.146196, 29.378007],
            "长沙市": [112.979353, 28.213478],
            "湘潭市": [112.935556, 27.835095],
            "常德市": [111.653718, 29.012149],
            "娄底市": [111.996396, 27.741073],
            // 江苏省
            "镇江市": [119.455835, 32.204409],
            "常州市": [119.981861, 31.771397],
            "南通市": [120.873801, 32.014665],
            "泰州市": [119.919606, 32.476053],
            "南京市": [118.778074, 32.057236],
            "苏州市": [120.619907, 31.317987],
            "盐城市": [120.148872, 33.379862],
            "宿迁市": [118.296893, 33.95205],
            "无锡市": [120.305456, 31.570037],
            "连云港市": [119.173872, 34.601549],
            "徐州市": [117.188107, 34.271553],
            "淮安市": [119.030186, 33.606513],
            "扬州市": [119.427778, 32.408505],
            // 山东省
            "潍坊市": [119.142634, 36.716115],
            "日照市": [119.50718, 35.420225],
            "济宁市": [116.600798, 35.402122],
            "聊城市": [115.986869, 36.455829],
            "德州市": [116.328161, 37.460826],
            "临沂市": [118.340768, 35.072409],
            "枣庄市": [117.279305, 34.807883],
            "莱芜市": [117.684667, 36.233654],
            "烟台市": [121.309555, 37.536562],
            "淄博市": [118.059134, 36.804685],
            "滨州市": [117.968292, 37.405314],
            "泰安市": [117.089415, 36.188078],
            "荷泽市": [115.46336, 35.26244],
            "济南市": [117.024967, 36.682785],
            "威海市": [122.093958, 37.528787],
            "青岛市": [120.384428, 36.105215],
            "东营市": [118.583926, 37.487121],
            // 安徽省
            "宣城市": [118.752096, 30.951642],
            "阜阳市": [115.820932, 32.901211],
            "亳州市": [115.787928, 33.871211],
            "蚌埠市": [117.35708, 32.929499],
            "黄山市": [118.29357, 29.734435],
            "六安市": [116.505253, 31.755558],
            "池州市": [117.494477, 30.660019],
            "滁州市": [118.32457, 32.317351],
            "淮南市": [117.018639, 32.642812],
            "铜陵市": [117.819429, 30.94093],
            "合肥市": [117.282699, 31.866942],
            "芜湖市": [118.384108, 31.36602],
            "马鞍山市": [118.515882, 31.688528],
            "安庆市": [117.058739, 30.537898],
            "淮北市": [116.791447, 33.960023],
            "宿州市": [116.988692, 33.636772],
            "巢湖市": [117.88049, 31.608733],
            //黑龙江省
            "双鸭山市": [131.171402, 46.655102],
            "绥化市": [126.989095, 46.646064],
            "大兴安岭地区": [124.196104, 51.991789],
            "佳木斯市": [130.284735, 46.81378],
            "黑河市": [127.50083, 50.25069],
            "哈尔滨市": [126.657717, 45.773225],
            "大庆市": [125.02184, 46.596709],
            "七台河市": [131.019048, 45.775005],
            "伊春": [128.910766, 47.734685],
            "牡丹江市": [129.608035, 44.588521],
            "鸡西市": [130.941767, 45.32154 | 13],
            "齐齐哈尔市": [123.987289, 47.3477],
            "鹤岗市": [130.292472, 47.338666],
            // 福建省
            "三明市": [117.642194, 26.270835],
            "厦门市": [118.103886, 24.489231],
            "龙岩市": [117.017997, 25.078685],
            "莆田市": [119.077731, 25.44845],
            "南平市": [118.181883, 26.643626],
            "宁德市": [119.542082, 26.656527],
            "泉州市": [118.600362, 24.901652],
            "漳州市": [117.676205, 24.517065],
            "福州市": [119.330221, 26.047125],
            // 甘肃省
            "定西市": [104.626638, 35.586056],
            "嘉峪关市": [98.281635, 39.802397],
            "庆阳市": [107.644227, 35.726801],
            "酒泉市": [98.508415, 39.741474],
            "临夏回族自治州": [103.215249, 35.598514],
            "金昌市": [102.208126, 38.516072],
            "张掖市": [100.459892, 38.93932],
            "白银市": [104.171241, 36.546682],
            "陇南市": [104.934573, 33.39448],
            "天水市": [105.736932, 34.584319],
            "兰州市": [103.823305, 36.064226],
            "武威市": [102.640147, 37.933172],
            "平凉市": [106.688911, 35.55011],
            "甘南藏族自治州": [102.917442, 34.992211],
            // 吉林省
            "长春市": [125.313642, 43.898338],
            "通化市": [125.94265, 41.736397],
            "吉林市": [126.564544, 43.871988],
            "白山": [126.435798, 41.945859],
            "松原市": [124.832995, 45.136049],
            "延边朝鲜族自治州": [129.485902, 42.896414],
            "辽源": [125.133686, 42.923303],
            "白城": [122.840777, 45.621086],
            "四平市": [124.391382, 43.175525],
            "公主岭市": [124.8, 43.5],
            "梅河口": [125.7, 42.5],
            // 江西省
            "抚州市": [116.360919, 27.954545],
            "九江市": [115.999848, 29.71964],
            "宜春市": [114.400039, 27.81113],
            "上饶市": [117.955464, 28.457623],
            "赣州市": [114.935909, 25.845296],
            "南昌市": [115.893528, 28.689578],
            "吉安市": [114.992039, 27.113848],
            "景德镇市": [117.186523, 29.303563],
            "萍乡市": [113.859917, 27.639544],
            "新余市": [114.947117, 27.822322],
            "鹰潭市": [117.03545, 28.24131],
            "赣江新区": [116, 29]
        }
        /*
                    var convertData = function(datalist) {
                        var resall = [];
                        for (d in datalist){
                            var res = [];
                            for (var i = 0; i < datalist[d].length; i++) {
                                var geoCoord = geoCoordMap[datalist[d][i].name];
                                if (geoCoord) {
                                    res.push({
                                        name: datalist[d][i].name,
                                        value: geoCoord.concat(datalist[d][i].value)
                                    });
                                }
                            }
                            resall.push(res);
                        }
                        return resall;
                    };
        */
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
                currentIndex: 0,
                //getOffsetDays(Date.now(), (new Date(2020, 0, 26)).getTime()),
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
                subtext: '时间跨度为01.26-05.13\n点击左下方播放按钮可循环播放',
                sublink: 'http://www.nhc.gov.cn',
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
                    { min: 2000 },
                    { min: 1000, max: 2000 },
                    { min: 600, max: 1000 },
                    { min: 200, max: 600 },
                    { min: 100, max: 200 },
                    { min: 30, max: 100 },
                    { min: 5, max: 30 },
                    { max: 5 }
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
                center: [108.384065, 24.367718],

                roam: true, //缩放平移

                zoom: 2,

                scaleLimit: {
                    min: 1,
                    max: 16,
                },

                map: 'china',

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
                    name: '湖北',
                    itemStyle: {
                        areaColor: '#222222'
                    },
                    emphasis: {
                        itemStyle: {
                            areaColor: '#111111',
                            shadowColor: '#000',
                            shadowBlur: 10
                        },
                    }
                }],
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
                        if (val[2] > 100) {
                            return (1 + Math.log2(val[2]));
                        }
                        if (val[2] > 0 && val[2] < 100) {
                            return (1 + val[2] / 20)
                        } else {
                            return (1)
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
                text: n + '新冠患者存量状况',
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

    myChart.hideLoading();
    myChart.setOption(option);
    myChart.on('brushselected', renderBrushed);
    myChart.on('timelineplaychanged', jojo);
    myChart.on('timelinechanged', notice);
    myChart.on('click', sufe);
    window.timelineIndex = 0;
    //getOffsetDays(Date.now(), (new Date(2020, 0, 26)).getTime());
    myChart.on('timelinechanged', function(params) {
        timelineIndex = params.currentIndex;
    });

    function dateAddDays(dateStr, dayCount) {
        var tempDate = new Date(dateStr.replace(/-/g, "/")); //把日期字符串转换成日期格式
        var resultDate = new Date((tempDate / 1000 + (86400 * dayCount)) * 1000); //增加n天后的日期
        var resultDateStr = resultDate.getFullYear() + "-" + (resultDate.getMonth() + 1) + "-" + (resultDate.getDate()); //将日期转化为字符串格式
        return resultDateStr;
    }

    setTimeout(function() {
        myChart.dispatchAction({
            type: 'brush',
            areas: [{
                geoIndex: 0,
                brushType: 'polygon',
                coordRange: [
                    [115.5, 29.5],
                    [115.5, 32.8],
                    [109.2, 32.8],
                    [109.2, 29.5]
                ]
            }]
        });
    }, 0);

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
            var a = dateAddDays('2020-01-26', timelineIndex);
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
            var dataItem = convertedData[getday(a)][0][rawIndex];
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
        if (params.currentIndex == getOffsetDays(Date.now(), (new Date(2020, 0, 26)).getTime()) + 1) {
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
            "北京市": [116.395645, 39.929986],
            "天津市": [117.210813, 39.14393],
            "上海市": [121.487899, 31.249162],
            "重庆市": [106.530635, 29.544606],
            "香港": [114.186124, 22.293586],
            "澳门": [113.557519, 22.204118],
            "台湾": [120.961454, 23.80406],
            // 湖北省
            "武汉市": [114.3162, 30.581084],
            "黄石市": [115.050683, 30.216127],
            "十堰市": [110.801229, 32.636994],
            "襄阳市": [112.176326, 32.094934],
            "宜昌市": [111.310981, 30.732758],
            "荆州市": [112.241866, 30.332591],
            "荆门市": [112.21733, 31.042611],
            "鄂州市": [114.895594, 30.384439],
            "孝感市": [113.935734, 30.927955],
            "黄冈市": [114.906618, 30.446109],
            "咸宁市": [114.300061, 29.880657],
            "随州市": [113.379358, 31.717858],
            "恩施土家族苗族自治州": [109.517433, 30.308978],
            "仙桃市": [113.443107, 30.327249],
            "天门市": [113.168020, 30.663312],
            "潜江市": [112.900485, 30.401380],
            "神农架林区": [110.487231, 31.595768],
            //新疆维吾尔自治区
            "克拉玛依市": [84.88118, 45.594331],
            "乌鲁木齐市": [87.564988, 43.84038],
            "巴音郭楞蒙古自治州": [86.121688, 41.771362],
            "伊犁哈萨克自治州": [81.297854, 43.922248],
            "吐鲁番市": [89.181595, 42.96047],
            "阿勒泰地区": [88.137915, 47.839744],
            "哈密市": [93.528355, 42.858596],
            "博尔塔拉蒙古族自治州": [82.052436, 44.913651],
            "阿克苏地区": [80.269846, 41.171731],
            "克孜勒苏柯尔克孜自治州": [76.137564, 39.750346],
            "昌吉回族自治州": [87.296038, 44.007058],
            "喀什地区": [75.992973, 39.470627],
            "和田地区": [79.930239, 37.116774],
            "塔城地区": [82.974881, 46.758684],
            "第四师": [85.564988, 40.84038],
            "第九师": [81.28, 40.55],
            "第十二师": [86.03, 47],
            "石河子市": [86.03, 44.3],
            "五家渠市": [87.53, 44.17],
            "第七师": [79.13, 39.85],
            //广西壮族自治区
            "崇左市": [107.357322, 22.415455],
            "柳州市": [109.422402, 24.329053],
            "百色市": [106.631821, 23.901512],
            "南宁市": [108.297234, 22.806493],
            "梧州市": [111.305472, 23.485395],
            "北海市": [109.122628, 21.472718],
            "桂林市": [110.26092, 25.262901],
            "河池市": [108.069948, 24.699521],
            "贵港市": [109.613708, 23.103373],
            "钦州市": [108.638798, 21.97335],
            "来宾市": [109.231817, 23.741166],
            "防城港市": [108.351791, 21.617398],
            "贺州市": [111.552594, 24.411054],
            "玉林市": [110.151676, 22.643974],
            // 西藏自治区
            "山南地区": [91.750644, 29.229027],
            "那曲地区": [92.067018, 31.48068],
            "阿里地区": [81.107669, 30.404557],
            "拉萨市": [91.111891, 29.662557],
            "昌都市": [97.185582, 31.140576],
            "林芝市": [94.349985, 29.666941],
            "日喀则市": [88.891486, 29.269023],
            //宁夏回族自治区
            "银川市": [106.206479, 38.502621],
            "吴忠市": [106.208254, 37.993561],
            "中卫市": [105.196754, 37.521124],
            "石嘴山市": [106.379337, 39.020223],
            "固原市": [106.285268, 36.021523],
            "宁东": [106.6, 38.45],
            // 内蒙古自治区
            "乌海市": [106.831999, 39.683177],
            "鄂尔多斯": [109.993706, 39.81649],
            "兴安盟": [122.048167, 46.083757],
            "锡林郭勒盟": [116.02734, 43.939705],
            "巴彦淖尔市": [107.423807, 40.76918],
            "赤峰市": [118.930761, 42.297112],
            "乌兰察布市": [113.112846, 41.022363],
            "呼伦贝尔市": [119.760822, 49.201636],
            "通辽市": [122.260363, 43.633756],
            "阿拉善盟": [105.695683, 38.843075],
            "包头市": [109.846239, 40.647119],
            "呼和浩特市": [111.660351, 40.828319],
            //四川省
            "遂宁市": [105.564888, 30.557491],
            "雅安市": [103.009356, 29.999716],
            "巴中市": [106.757916, 31.869189],
            "攀枝花市": [101.722423, 26.587571],
            "自贡市": [104.776071, 29.359157],
            "凉山彝族自治州": [102.259591, 27.892393],
            "广元市": [105.819687, 32.44104],
            "广安市": [106.63572, 30.463984],
            "宜宾市": [104.633019, 28.769675],
            "达州市": [107.494973, 31.214199],
            "南充市": [106.105554, 30.800965],
            "成都市": [104.067923, 30.679943],
            "内江市": [105.073056, 29.599462],
            "资阳市": [104.633019, 28.769675],
            "阿坝藏族羌族自治州": [102.228565, 31.905763],
            "甘孜藏族自治州": [101.969232, 30.055144],
            "绵阳市": [104.705519, 31.504701],
            "乐山市": [103.760824, 29.600958],
            "泸州市": [105.44397, 28.89593],
            "德阳市": [104.402398, 31.13114],
            "眉山市": [103.84143, 30.061115],
            //陕西省
            "安康市": [109.038045, 32.70437],
            "咸阳市": [108.707509, 34.345373],
            "渭南市": [109.483933, 34.502358],
            "汉中市": [107.045478, 33.081569],
            "延安市": [109.50051, 36.60332],
            "榆林市": [109.745926, 38.279439],
            "西安市": [108.953098, 34.2778],
            "铜川市": [108.968067, 34.908368],
            "宝鸡市": [107.170645, 34.364081],
            "商洛市": [109.934208, 33.873907],
            "韩城市": [110.44, 35.48],
            "杨凌示范区": [108, 34.3],
            // 河南省
            "焦作市": [113.211836, 35.234608],
            "南阳市": [112.542842, 33.01142],
            "三门峡市": [111.181262, 34.78332],
            "平顶山市": [113.300849, 33.745301],
            "驻马店市": [114.049154, 32.983158],
            "新乡市": [113.91269, 35.307258],
            "许昌市": [113.835312, 34.02674],
            "洛阳市": [112.447525, 34.657368],
            "开封市": [114.351642, 34.801854],
            "安阳市": [114.351807, 36.110267],
            "周口市": [114.654102, 33.623741],
            "信阳市": [114.085491, 32.128582],
            "郑州市": [113.649644, 34.75661],
            "濮阳市": [115.026627, 35.753298],
            "商丘市": [115.641886, 34.438589],
            "漯河市": [114.046061, 33.576279],
            "鹤壁市": [114.29777, 35.755426],
            //浙江省
            "丽水市": [119.929576, 28.4563],
            "衢州市": [118.875842, 28.95691],
            "台州市": [121.440613, 28.668283],
            "宁波市": [121.579006, 29.885259],
            "杭州市": [120.219375, 30.259244],
            "金华市": [119.652576, 29.102899],
            "温州市": [120.690635, 28.002838],
            "绍兴市": [120.592467, 30.002365],
            "嘉兴市": [120.760428, 30.773992],
            "湖州市": [120.137243, 30.877925],
            "舟山市": [122.169872, 30.03601],
            "省十里丰监狱": [119, 29],
            // 海南省
            "海口市": [110.330802, 20.022071],
            "三亚市": [109.522771, 18.257776],
            "万宁市": [109.9267865, 19.1399235],
            "五指山": [109.52, 18.78],
            "琼海市": [110.47, 19.52],
            "昌江黎族自治县": [109.05, 19.25],
            "儋州市": [109.57, 19.52],
            "澄迈县": [110, 19.73],
            "保亭": [109.7, 18.63],
            "临高县": [109.68, 19.92],
            "东方市": [108.63, 19.1],
            "陵水黎族自治县": [110.03, 18.5],
            "定安县": [110.32, 19.7],
            "文昌": [110.8, 19.55],
            "乐东黎族自治县": [109.17, 18.75],
            "琼中黎族苗族自治县": [109.83, 19.03],
            // 山西省
            "运城市": [111.006854, 35.038859],
            "忻州市": [112.727939, 38.461031],
            "晋城市": [112.867333, 35.499834],
            "临汾市": [111.538788, 36.099745],
            "阳泉市": [113.569238, 37.869529],
            "长治市": [113.120292, 36.201664],
            "吕梁市": [111.143157, 37.527316],
            "太原市": [112.550864, 37.890277],
            "大同市": [113.290509, 40.113744],
            "朔州市": [112.479928, 39.337672],
            "晋中市": [112.738514, 37.693362],
            // 广东省
            "韶关市": [113.594461, 24.80296],
            "惠州市": [114.410658, 23.11354],
            "揭阳市": [116.379501, 23.547999],
            "云浮市": [112.050946, 22.937976],
            "深圳市": [114.025974, 22.546054],
            "潮州市": [116.630076, 23.661812],
            "清远市": [113.040773, 23.698469],
            "梅州市": [116.126403, 24.304571],
            "广州市": [113.30765, 23.120049],
            "东莞市": [113.763434, 23.043024],
            "江门市": [113.078125, 22.575117],
            "肇庆市": [112.479653, 23.078663],
            "茂名市": [110.931245, 21.668226],
            "阳江市": [111.97701, 21.871517],
            "汕尾市": [115.372924, 22.778731],
            "河源市": [114.713721, 23.757251],
            "中山市": [113.42206, 22.545178],
            "佛山市": [113.134026, 23.035095],
            "汕头市": [116.72865, 23.383908],
            "湛江市": [110.365067, 21.257463],
            "珠海市": [113.562447, 22.256915],
            // 云南省
            "怒江傈僳族自治州": [98.859932, 25.860677],
            "迪庆藏族自治州": [99.713682, 27.831029],
            "昭通市": [103.725021, 27.340633],
            "西双版纳傣族自治州": [100.803038, 22.009433],
            "玉溪市": [102.545068, 24.370447],
            "临沧市": [100.092613, 23.887806],
            "大理白族州": [100.223675, 25.5969],
            "丽江市": [100.229628, 26.875351],
            "楚雄州": [101.529382, 25.066356],
            "红河哈尼族彝族自治州": [103.384065, 23.367718],
            "文山州": [104.089112, 23.401781],
            "昆明市": [102.714601, 25.049153],
            "曲靖市": [103.782539, 25.520758],
            "保山市": [99.177996, 25.120489],
            "思茅市": [100.980058, 22.788778],
            "德宏傣族景颇族州": [98.589434, 24.44124],
            "普洱市": [101, 23],
            // 贵州省
            "贵阳市": [106.709177, 26.629907],
            "黔西南布依族苗族自治州": [104.900558, 25.095148],
            "铜仁市": [109.196161, 27.726271],
            "黔东南苗族侗族州": [107.985353, 26.583992],
            "遵义市": [106.93126, 27.699961],
            "毕节市": [105.300492, 27.302612],
            "黔南布依族苗族州": [107.523205, 26.264536],
            "六盘水市": [104.852087, 26.591866],
            "安顺市": [105.92827, 26.228595],
            // 辽宁省
            "鞍山市": [123.007763, 41.118744],
            "本溪市": [123.778062, 41.325838],
            "营口市": [122.233391, 40.668651],
            "大连市": [121.593478, 38.94871],
            "铁岭市": [123.85485, 42.299757],
            "朝阳市": [120.446163, 41.571828],
            "抚顺市": [123.92982, 41.877304],
            "盘锦市": [122.073228, 41.141248],
            "丹东市": [124.338543, 40.129023],
            "葫芦岛市": [120.860758, 40.74303],
            "锦州市": [121.147749, 41.130879],
            "沈阳市": [123.432791, 41.808645],
            "辽阳市": [123.172451, 41.273339],
            "阜新市": [121.660822, 42.01925],
            // 河北省
            "廊坊市": [116.703602, 39.518611],
            "衡水市": [115.686229, 37.746929],
            "秦皇岛市": [119.604368, 39.945462],
            "承德市": [117.933822, 40.992521],
            "沧州市": [116.863806, 38.297615],
            "张家口市": [114.893782, 40.811188],
            "石家庄市": [114.522082, 38.048958],
            "保定市": [115.49481, 38.886565],
            "唐山市": [118.183451, 39.650531],
            "邢台市": [114.520487, 37.069531],
            "邯郸市": [114.482694, 36.609308],
            // 青海省
            "海南藏族自治州": [100.624066, 36.284364],
            "海西蒙古族藏族自治州": [97.342625, 37.373799],
            "海东市": [102.085207, 36.51761],
            "果洛藏族自治州": [100.223723, 34.480485],
            "西宁市": [101.767921, 36.640739],
            "海北藏族自治州": [100.879802, 36.960654],
            "黄南藏族自治州": [102.0076, 35.522852],
            "玉树藏族自治州": [97.013316, 33.00624],
            // 湖南省
            "邵阳市": [111.461525, 27.236811],
            "张家界市": [110.48162, 29.124889],
            "益阳市": [112.366547, 28.588088],
            "怀化市": [109.986959, 27.557483],
            "湘西土家族苗族自治州": [109.745746, 28.317951],
            "郴州市": [113.037704, 25.782264],
            "衡阳市": [112.583819, 26.898164],
            "永州市": [111.614648, 26.435972],
            "株洲市": [113.131695, 27.827433],
            "岳阳市": [113.146196, 29.378007],
            "长沙市": [112.979353, 28.213478],
            "湘潭市": [112.935556, 27.835095],
            "常德市": [111.653718, 29.012149],
            "娄底市": [111.996396, 27.741073],
            // 江苏省
            "镇江市": [119.455835, 32.204409],
            "常州市": [119.981861, 31.771397],
            "南通市": [120.873801, 32.014665],
            "泰州市": [119.919606, 32.476053],
            "南京市": [118.778074, 32.057236],
            "苏州市": [120.619907, 31.317987],
            "盐城市": [120.148872, 33.379862],
            "宿迁市": [118.296893, 33.95205],
            "无锡市": [120.305456, 31.570037],
            "连云港市": [119.173872, 34.601549],
            "徐州市": [117.188107, 34.271553],
            "淮安市": [119.030186, 33.606513],
            "扬州市": [119.427778, 32.408505],
            // 山东省
            "潍坊市": [119.142634, 36.716115],
            "日照市": [119.50718, 35.420225],
            "济宁市": [116.600798, 35.402122],
            "聊城市": [115.986869, 36.455829],
            "德州市": [116.328161, 37.460826],
            "临沂市": [118.340768, 35.072409],
            "枣庄市": [117.279305, 34.807883],
            "莱芜市": [117.684667, 36.233654],
            "烟台市": [121.309555, 37.536562],
            "淄博市": [118.059134, 36.804685],
            "滨州市": [117.968292, 37.405314],
            "泰安市": [117.089415, 36.188078],
            "荷泽市": [115.46336, 35.26244],
            "济南市": [117.024967, 36.682785],
            "威海市": [122.093958, 37.528787],
            "青岛市": [120.384428, 36.105215],
            "东营市": [118.583926, 37.487121],
            // 安徽省
            "宣城市": [118.752096, 30.951642],
            "阜阳市": [115.820932, 32.901211],
            "亳州市": [115.787928, 33.871211],
            "蚌埠市": [117.35708, 32.929499],
            "黄山市": [118.29357, 29.734435],
            "六安市": [116.505253, 31.755558],
            "池州市": [117.494477, 30.660019],
            "滁州市": [118.32457, 32.317351],
            "淮南市": [117.018639, 32.642812],
            "铜陵市": [117.819429, 30.94093],
            "合肥市": [117.282699, 31.866942],
            "芜湖市": [118.384108, 31.36602],
            "马鞍山市": [118.515882, 31.688528],
            "安庆市": [117.058739, 30.537898],
            "淮北市": [116.791447, 33.960023],
            "宿州市": [116.988692, 33.636772],
            "巢湖市": [117.88049, 31.608733],
            //黑龙江省
            "双鸭山市": [131.171402, 46.655102],
            "绥化市": [126.989095, 46.646064],
            "大兴安岭地区": [124.196104, 51.991789],
            "佳木斯市": [130.284735, 46.81378],
            "黑河市": [127.50083, 50.25069],
            "哈尔滨市": [126.657717, 45.773225],
            "大庆市": [125.02184, 46.596709],
            "七台河市": [131.019048, 45.775005],
            "伊春": [128.910766, 47.734685],
            "牡丹江市": [129.608035, 44.588521],
            "鸡西市": [130.941767, 45.32154 | 13],
            "齐齐哈尔市": [123.987289, 47.3477],
            "鹤岗市": [130.292472, 47.338666],
            // 福建省
            "三明市": [117.642194, 26.270835],
            "厦门市": [118.103886, 24.489231],
            "龙岩市": [117.017997, 25.078685],
            "莆田市": [119.077731, 25.44845],
            "南平市": [118.181883, 26.643626],
            "宁德市": [119.542082, 26.656527],
            "泉州市": [118.600362, 24.901652],
            "漳州市": [117.676205, 24.517065],
            "福州市": [119.330221, 26.047125],
            // 甘肃省
            "定西市": [104.626638, 35.586056],
            "嘉峪关市": [98.281635, 39.802397],
            "庆阳市": [107.644227, 35.726801],
            "酒泉市": [98.508415, 39.741474],
            "临夏回族自治州": [103.215249, 35.598514],
            "金昌市": [102.208126, 38.516072],
            "张掖市": [100.459892, 38.93932],
            "白银市": [104.171241, 36.546682],
            "陇南市": [104.934573, 33.39448],
            "天水市": [105.736932, 34.584319],
            "兰州市": [103.823305, 36.064226],
            "武威市": [102.640147, 37.933172],
            "平凉市": [106.688911, 35.55011],
            "甘南藏族自治州": [102.917442, 34.992211],
            // 吉林省
            "长春市": [125.313642, 43.898338],
            "通化市": [125.94265, 41.736397],
            "吉林市": [126.564544, 43.871988],
            "白山": [126.435798, 41.945859],
            "松原市": [124.832995, 45.136049],
            "延边朝鲜族自治州": [129.485902, 42.896414],
            "辽源": [125.133686, 42.923303],
            "白城": [122.840777, 45.621086],
            "四平市": [124.391382, 43.175525],
            "公主岭市": [124.8, 43.5],
            "梅河口": [125.7, 42.5],
            // 江西省
            "抚州市": [116.360919, 27.954545],
            "九江市": [115.999848, 29.71964],
            "宜春市": [114.400039, 27.81113],
            "上饶市": [117.955464, 28.457623],
            "赣州市": [114.935909, 25.845296],
            "南昌市": [115.893528, 28.689578],
            "吉安市": [114.992039, 27.113848],
            "景德镇市": [117.186523, 29.303563],
            "萍乡市": [113.859917, 27.639544],
            "新余市": [114.947117, 27.822322],
            "鹰潭市": [117.03545, 28.24131],
            "赣江新区": [116, 29]
        }
        /*
                    var convertData = function(datalist) {
                        var resall = [];
                        for (d in datalist){
                            var res = [];
                            for (var i = 0; i < datalist[d].length; i++) {
                                var geoCoord = geoCoordMap[datalist[d][i].name];
                                if (geoCoord) {
                                    res.push({
                                        name: datalist[d][i].name,
                                        value: geoCoord.concat(datalist[d][i].value)
                                    });
                                }
                            }
                            resall.push(res);
                        }
                        return resall;
                    };
        */
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
                currentIndex: 0,
                //getOffsetDays(Date.now(), (new Date(2020, 0, 26)).getTime()),
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
                        text: '时间跨度为01.26-05.13',
                        font: 'bold 13px Microsoft YaHei'
                    }
                },
                {
                    type: 'text',
                    left: '12',
                    top: '10.5%',
                    style: {
                        fill: '#fff',
                        text: '数据来自卫健委',
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
                    { min: 2000 },
                    { min: 1000, max: 2000 },
                    { min: 600, max: 1000 },
                    { min: 200, max: 600 },
                    { min: 100, max: 200 },
                    { min: 30, max: 100 },
                    { min: 5, max: 30 },
                    { max: 5 }
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
                center: [116.600798, 35.402122],

                roam: true, //缩放平移

                scaleLimit: {
                    min: 0.5,
                    max: 10,
                },

                map: 'china',

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
                    name: '湖北',
                    itemStyle: {
                        areaColor: '#222222'
                    },
                    emphasis: {
                        itemStyle: {
                            areaColor: '#111111',
                            shadowColor: '#000',
                            shadowBlur: 10
                        },
                    }
                }],
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
                        if (val[2] > 100) {
                            return (2 + 2 * Math.log2(val[2]));
                        }
                        if (val[2] > 0 && val[2] < 100) {
                            return (3 + val[2] / 10)
                        } else {
                            return (1)
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
                text: n + '新冠患者存量状况',
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

    myChart.hideLoading();
    myChart.setOption(option);
    myChart.on('brushselected', renderBrushed);
    myChart.on('timelineplaychanged', jojo);
    myChart.on('timelinechanged', notice);
    myChart.on('click', sufe);
    window.timelineIndex = 0;
    //getOffsetDays(Date.now(), (new Date(2020, 0, 26)).getTime());
    myChart.on('timelinechanged', function(params) {
        timelineIndex = params.currentIndex;
    });

    function dateAddDays(dateStr, dayCount) {
        var tempDate = new Date(dateStr.replace(/-/g, "/")); //把日期字符串转换成日期格式
        var resultDate = new Date((tempDate / 1000 + (86400 * dayCount)) * 1000); //增加n天后的日期
        var resultDateStr = resultDate.getFullYear() + "-" + (resultDate.getMonth() + 1) + "-" + (resultDate.getDate()); //将日期转化为字符串格式
        return resultDateStr;
    }

    setTimeout(function() {
        myChart.dispatchAction({
            type: 'brush',
            areas: [{
                geoIndex: 0,
                brushType: 'polygon',
                coordRange: [
                    [115.5, 29.5],
                    [115.5, 32.8],
                    [109.2, 32.8],
                    [109.2, 29.5]
                ]
            }]
        });
    }, 0);

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
            var a = dateAddDays('2020-01-26', timelineIndex);
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
            var dataItem = convertedData[getday(a)][0][rawIndex];
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
            window.open('http://www.nhc.gov.cn');
        }
    }

    function notice(params) {
        if (params.currentIndex == getOffsetDays(Date.now(), (new Date(2020, 0, 26)).getTime()) + 1) {
            window.alert(getdaynow() + '之后地图所示为预测数据仅做参考。\n中国加油 武汉加油')
        }
    }

    function jojo() {
        var x = document.getElementById('myAudio');
        x.play();
    }
}