var dataUrl = "./data/shanghai.json";
var dataUrlBackup = "https://tktonny.github.io/CPC/data/shanghai.json";

$(document).ready(function() {
    init();
});
$(".add-city").click(function() {
    add_sight();
});
$(".item").click(function() {
    add_sight();
});
$(".remove").click(function() {
    remove_sight();
});
var sight;
var sightList = [];

var init = function() {
    $.ajax({
        url: dataUrl,
        type: 'get',
        success: function(res) {
            if (res.msg === "success") {
                sights = res.sightslist;
                //console.log(sights)
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

var add_sight = function() {
    console.log(this);
    console.log("123")
}

var remove_sighs = function() {
    console.log(this.parent)
    console.log("456")
}