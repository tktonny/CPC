var dataUrl3 = "http://api.tianapi.com/txapi/ncov/index?key=51ada08c82189b4e519e27149e77e6fd";
var dataUrlBackup3 = "http://api.tianapi.com/txapi/ncov/index?key=51ada08c82189b4e519e27149e77e6fd";
var dataUrl4 = "https://covidtracking.com/api/v1/us/current.json";
var dataUrlBackup4 = "https://covidtracking.com/api/v1/us/current.json";
$(document).ready(function() {
    $.ajax({
        url: dataUrl3,
        type: 'get',
        success: function(res) {
            if (res.msg === "success") {
                var chartData = res.newslist;
                //console.log(chartData);
                chartData = chartData[0];
                //console.log(chartData);
                chartData = chartData.desc;
                console.log(chartData);
                document.getElementById("china_currentConfirmedCount").innerHTML = chartData.currentConfirmedCount;
                if (chartData.currentConfirmedIncr >= 0) {
                    document.getElementById("china_currentConfirmedIncr").innerHTML = "+" + chartData.currentConfirmedIncr;
                } else {
                    document.getElementById("china_currentConfirmedIncr").innerHTML = chartData.currentConfirmedIncr;
                }

                document.getElementById("china_confirmedCount").innerHTML = chartData.confirmedCount;
                if (chartData.confirmedIncr >= 0) {
                    document.getElementById("china_confirmedIncr").innerHTML = "+" + chartData.confirmedIncr;
                } else {
                    document.getElementById("china_confirmedIncr").innerHTML = chartData.confirmedIncr;
                }

                document.getElementById("china_suspectedCount").innerHTML = chartData.suspectedCount;
                if (chartData.suspectedIncr >= 0) {
                    document.getElementById("china_suspectedIncr").innerHTML = "+" + chartData.suspectedIncr;
                } else {
                    document.getElementById("china_suspectedIncr").innerHTML = chartData.suspectedIncr;
                }

                document.getElementById("china_curedCount").innerHTML = chartData.curedCount;
                if (chartData.curedIncr >= 0) {
                    document.getElementById("china_curedIncr").innerHTML = "+" + chartData.curedIncr;
                } else {
                    document.getElementById("china_curedIncr").innerHTML = chartData.curedIncr;
                }

                document.getElementById("china_deadCount").innerHTML = chartData.deadCount;
                if (chartData.deadIncr >= 0) {
                    document.getElementById("china_deadIncr").innerHTML = "+" + chartData.deadIncr;
                } else {
                    document.getElementById("china_deadIncr").innerHTML = chartData.deadIncr;
                }

                document.getElementById("china_seriousCount").innerHTML = chartData.seriousCount;
                if (chartData.seriousIncr >= 0) {
                    document.getElementById("china_seriousIncr").innerHTML = "+" + chartData.seriousIncr;
                } else {
                    document.getElementById("china_seriousIncr").innerHTML = chartData.seriousIncr;
                }

                document.getElementById("oversea_confirmedCount").innerHTML = chartData.foreignStatistics.confirmedCount;
                if (chartData.foreignStatistics.confirmedIncr >= 0) {
                    document.getElementById("oversea_confirmedIncr").innerHTML = "+" + chartData.foreignStatistics.confirmedIncr;
                } else {
                    document.getElementById("oversea_confirmedIncr").innerHTML = chartData.foreignStatistics.confirmedIncr;
                }

                document.getElementById("oversea_deadCount").innerHTML = chartData.foreignStatistics.deadCount;
                if (chartData.foreignStatistics.deadIncr >= 0) {
                    document.getElementById("oversea_deadIncr").innerHTML = "+" + chartData.foreignStatistics.deadIncr;
                } else {
                    document.getElementById("oversea_deadIncr").innerHTML = chartData.foreignStatistics.deadIncr;
                }

                chartData = chartData.globalStatistics;
                document.getElementById("global_currentConfirmedCount").innerHTML = chartData.currentConfirmedCount;
                if (chartData.currentConfirmedIncr >= 0) {
                    document.getElementById("global_currentConfirmedIncr").innerHTML = "+" + chartData.currentConfirmedIncr;
                } else {
                    document.getElementById("global_currentConfirmedIncr").innerHTML = chartData.currentConfirmedIncr;
                }

                document.getElementById("global_confirmedCount").innerHTML = chartData.confirmedCount;
                if (chartData.confirmedIncr >= 0) {
                    document.getElementById("global_confirmedIncr").innerHTML = "+" + chartData.confirmedIncr;
                } else {
                    document.getElementById("global_confirmedIncr").innerHTML = chartData.confirmedIncr;
                }

                document.getElementById("global_curedCount").innerHTML = chartData.curedCount;
                if (chartData.curedIncr >= 0) {
                    document.getElementById("global_curedIncr").innerHTML = "+" + chartData.curedIncr;
                } else {
                    document.getElementById("global_curedIncr").innerHTML = chartData.curedIncr;
                }

                document.getElementById("global_deadCount").innerHTML = chartData.deadCount;
                if (chartData.deadIncr >= 0) {
                    document.getElementById("global_deadIncr").innerHTML = "+" + chartData.deadIncr;
                } else {
                    document.getElementById("global_deadIncr").innerHTML = chartData.deadIncr;
                }
                return;
            }
            alert("获取数据失败");
        },
        error: function(res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup3)) {
                this.url = this.url.replace(dataUrl3, dataUrlBackup3);
                $.ajax(this);
            }
        }
    });

    $.ajax({
        url: dataUrl4,
        type: 'get',
        success: function(res) {
            var chartData = res[0];
            //console.log(chartData.positive);
            document.getElementById("usa_positive").innerHTML = chartData.positive;

            document.getElementById("usa_inIcuCurrently").innerHTML = chartData.inIcuCurrently;

            document.getElementById("usa_recovered").innerHTML = chartData.recovered;

            document.getElementById("usa_death").innerHTML = chartData.death;
        },
        error: function(res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup4)) {
                this.url = this.url.replace(dataUrl4, dataUrlBackup4);
                $.ajax(this);
            }
        }
    });

    $.ajax({
        url: dataUrl3,
        type: 'get',
        success: function(res) {
            if (res.msg === "success") {
                var chartData = res.newslist;
                //console.log(chartData);
                chartData = chartData[0];
                //console.log(chartData);
                chartData = chartData.news;
                //console.log(chartData);
                document.getElementById("news_1").innerHTML = chartData[0].title;
                document.getElementById("news_2").innerHTML = chartData[1].title;
                document.getElementById("news_3").innerHTML = chartData[2].title;
                document.getElementById("news_4").innerHTML = chartData[3].title;
                document.getElementById("news_1").href = chartData[0].sourceUrl;
                document.getElementById("news_2").href = chartData[1].sourceUrl;
                document.getElementById("news_3").href = chartData[2].sourceUrl;
                document.getElementById("news_4").href = chartData[3].sourceUrl;
                return;
            }
            alert("获取数据失败");
        },
        error: function(res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup3)) {
                this.url = this.url.replace(dataUrl3, dataUrlBackup3);
                $.ajax(this);
            }
        }
    });
});

function predict() {
    var input = document.getElementById('predict_date').value;
    console.log(input);
    $.ajax({
        url: "/data/global_total_predict_2020_07.json",
        type: 'get',
        success: function(res) {
            var chartData = res;
            for (var i in chartData) {
                //console.log(chartData[i]);
                if (chartData[i].Date == input) {
                    document.getElementById("predict_ConfirmedCases").innerHTML = Math.round(chartData[i].ConfirmedCases);
                    document.getElementById("predict_Fatalities").innerHTML = Math.round(chartData[i].Fatalities);
                    return;
                }
            }
            document.getElementById("predict_ConfirmedCases").innerHTML = "--";
            document.getElementById("predict_Fatalities").innerHTML = "--";
        }
    });
}