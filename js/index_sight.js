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
                html += '<ul class="con_3_ul current">\n';
                for (var i in sights) {
                    if (i % 8 == 0 & i > 0) {
                        html += '</ul><ul class="con_3_ul">'
                    }
                    html += '<li>\n' +
                        '   <div class="con3_img">\n' +
                        '       <img src="' + sights[i].img_url + '" alt="">\n' +
                        '   </div>\n' +
                        '   <div class="con3_inner">\n' +
                        '       <div class="c3_inner_title">\n' +
                        '           <span class="con3_inr_hand">\n' +
                        '               <img src="' + './img/sufe.ico' + '" alt="">\n' +
                        '           </span>\n' +
                        '           <span class="con3_inr_title">上财党委</span>\n' +
                        '       </div>\n' +
                        '       <div class="con3_inner_p">\n' +
                        sights[i].name +
                        '       </div>\n' +
                        '   </div>' +
                        '</li>';
                    if (i == 39) {
                        break;
                    }
                }

                $(".items").html(html);

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