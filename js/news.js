var dataUrl  = "https://lab.isaaclin.cn/nCoV/";
var dataUrlBackup  = "http://api.tianapi.com/txapi/rumour/index?key=51ada08c82189b4e519e27149e77e6fd";

$(document).ready(function () {
    initNews();
});

var initNews = function(province) {
    $.ajax({
        url: dataUrl + 'api/news?num=100',
        type: 'get',
        success: function (res) {
            if (res.success===true ){
                var news = res.results;
                var html = "";
                for (var i in news) {
                        html +='<div class="item">\n' +
                        '            <div class="item-heading">\n' +
                        '                <div class="pull-right label label-success news-province">新闻</div>\n' +
                        '                <h4><a href="'+news[i].sourceUrl+'" class="news-title" target="_blank">'+news[i].title+'</a></h4>\n' +
                        '            </div>\n' +
                        '            <div class="item-content news-detail" >\n' + news[i].summary+
                        '            </div>\n' +
                        '            <div class="item-footer">\n' +
                        '                <span class="text-muted"><i class="icon-comments news-source"></i> '+news[i].infoSource+'</span> &nbsp; <span class="text-muted news-time">'+timestampToTime(news[i].pubDate) +'</span>\n' +
                        '            </div>\n' +
                        '        </div>';
                }

                function timestampToTime(timestamp) {
                    var date = new Date(parseInt(timestamp));
                    var Y = date.getFullYear() + '-';
                    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                    var D = date.getDate();
                    return Y + M + D;
                }

                $(".items").html(html);

                return ;
            }
            alert("获取数据失败");
        },
        error:function (res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup)) {
                this.url = this.url.replace(dataUrl, dataUrlBackup);
                $.ajax(this);
            }
        }
    })
};