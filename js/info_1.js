var dataUrl  = "https://lab.isaaclin.cn/nCoV/";
var dataUrlBackup  = "https://lab.isaaclin.cn/nCoV/";

$(document).ready(function () {
    initRumors();
});

var initRumors = function() {
    $.ajax({
        url: dataUrl + 'api/rumors?rumorType=1&num=100',
        type: 'get',
        success: function (res) {
            if (res.success===true ){
                var rumors = res.results;
                var html = "";
                for (var i in rumors) {
                        html +='<div class="item">\n' +
                        '            <div class="item-heading">\n' +
                        '                <div class="pull-right label label-info news-province">证实</div>\n' +
                        '                <h4><a href="https://ncov.dxy.cn/ncovh5/view/pneumonia_rumors?target=5&from=dxy" class="news-title" target="_blank">'+ rumors[i].title+'</a></h4>\n' +
                        '            </div>\n' +
                        '            <div class="item-content news-detail" ><div style="color:#283593;font-weight: bolder">' + rumors[i].mainSummary+'</div><div style="color: #2a3c4a;">详情：' +rumors[i].body+'</div>'+
                        '            </div>\n' +
                        '        </div>';
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