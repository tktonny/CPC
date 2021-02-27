var dataUrl = "./data/shanghai.json";
var dataUrlBackup = "https://tktonny.github.io/CPC/data/shanghai.json";

$(document).ready(function() {
    initsights();
});

var initsights = function() {
    $.ajax({
        url: dataUrl,
        type: 'get',
        success: function(res) {
            if (res.msg === "success") {
                var sights = res.sightslist;
                //console.log(sights)
                var html = "";

                for (var i in sights) {
                    html += '<div class="item">' +
                        '       <div class="card more-arrow">' +
                        '           <div class="el-image pic">' +
                        '              <img src="' + sights[i].img_url + '" alt=""class="el-image__inner" style="object-fit: cover;">' +
                        '           </div>' +
                        '           <div class="title_">' +
                        '               <span class="cn"><a href=' + sights[i].link + '>' + sights[i].name + '</a></span>' +
                        '               <span class="en">' + sights[i].open + '</span>' +
                        '           </div>' +
                        '       <div class="beento">票价：' + sights[i].ticket + '</div>' +
                        '       <div class="add-city"><span>添加行程</span></div>' +
                        '       </div>' +
                        '   </div>';

                }
                //console.log(html)
                $("#sight").html(html);

                return;
            }
            alert("获取数据失败");
        },
        error: function(res) {
            if (res.state() === "rejected" && !this.url.includes(dataUrlBackup)) {
                this.url = this.url.replace(dataUrl, dataUrlBackup);
                $.ajax(this);
            }
        }
    })
};