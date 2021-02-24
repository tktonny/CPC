var place = {
    "华东": ["上海", "丽水", "衢州", "台州", "宁波", "杭州", "金华", "温州", "绍兴", "嘉兴", "湖州", "舟山", "镇江", "常州", "南通", "泰州", "南京", "苏州", "盐城", "宿迁", "无锡", "连云港", "徐州", "淮安", "扬州", "抚州", "九江", "宜春", "上饶", "赣州", "南昌", "吉安", "景德镇", "潍坊", "日照", "济宁", "聊城", "德州", "临沂", "枣庄", "莱芜", "烟台", "淄博", "滨州", "泰安", "荷泽", "济南", "威海", "青岛", "东营", "亳州", "蚌埠", "黄山", "六安", "滁州", "合肥", "芜湖", "马鞍山", "宿州", "巢湖", ],
    "华北": ["北京", "天津", "廊坊", "衡水", "秦皇岛", "承德", "沧州", "张家口", "石家庄", "保定", "唐山", "邢台", "邯郸", "运城", "忻州", "晋城", "临汾", "阳泉", "长治", "吕梁", "太原", "大同", "朔州", "晋中", ],
    "华南": ["香港", "澳门", "台湾", "三明", "厦门", "龙岩", "莆田", "南平", "宁德", "泉州", "漳州", "福州", "海南", "韶关", "惠州", "揭阳", "云浮", "深圳", "潮州", "清远", "梅州", "广州", "东莞", "江门", "肇庆", "茂名", "阳江", "汕尾", "河源", "中山", "佛山", "汕头", "湛江", "珠海", ],
    "华中": ["邵阳", "张家界", "益阳", "怀化", "郴州", "衡阳", "永州", "株洲", "岳阳", "长沙", "湘潭", "常德", "娄底", "焦作", "南阳", "三门峡", "平顶山", "驻马店", "新乡", "许昌", "洛阳", "开封", "安阳", "周口", "信阳", "郑州", "濮阳", "商丘", "漯河", "鹤壁", "武汉", "黄石", "十堰", "襄阳", "宜昌", "荆州", "荆门", "鄂州", "孝感", "黄冈", "咸宁", "随州", "恩施州", "仙桃", "天门", "潜江"],
    "东北": ["双鸭山", "绥化", "佳木斯", "黑河", "哈尔滨", "大庆", "七台河", "伊春", "牡丹江", "鸡西", "齐齐哈尔", "鹤岗", "长春", "通化", "吉林市", "白山", "松原", "延边", "辽源", "白城", "四平市", "公主岭", "梅河口", "鞍山", "本溪", "营口", "大连", "铁岭", "抚顺", "丹东", "葫芦岛", "锦州", "沈阳", "辽阳", "阜新", ],
    "西北": ["安康", "咸阳", "渭南", "汉中", "延安", "榆林", "西安", "铜川", "宝鸡", "商洛", "韩城", "杨凌", "果洛", "西宁", "黄南", "玉树", "银川", "吴忠", "中卫", "石嘴山", "固原", "宁东", "乌海市", "鄂尔多斯", "兴安盟", "锡林郭勒盟", "巴彦淖尔", "赤峰", "乌兰察布", "呼伦贝尔", "通辽", "阿拉善盟", "包头", "呼和浩特", "克拉玛依", "乌鲁木齐", "巴音郭楞州", "伊犁州", "吐鲁番市", "阿勒泰", "哈密", "阿克苏地区", "昌吉州", "喀什", "和田", "塔城", "定西", "嘉峪关", "庆阳", "酒泉", "张掖", "白银", "陇南", "天水", "兰州", "武威", "平凉", "甘南", ],
    "西南": ["重庆", "贵阳", "铜仁", "遵义", "毕节", "六盘水", "安顺", "遂宁", "怒江", "迪庆", "昭通", "西双版纳", "玉溪", "临沧", "大理州", "丽江", "楚雄州", "红河州", "文山州", "昆明", "曲靖", "保山", "思茅", "德宏州", "普洱", "雅安", "巴中", "攀枝花", "自贡", "凉山州", "广元", "广安", "宜宾", "达州", "南充", "成都", "内江", "资阳", "阿坝州", "甘孜州", "绵阳", "乐山", "泸州", "德阳", "眉山", "柳州", "百色", "南宁", "梧州", "北海", "桂林", "钦州", "防城港", "贺州", "玉林", "山南", "那曲", "阿里", "拉萨", "昌都", "林芝", "日喀则", ],
}

$(document).ready(function() {
    initsights();
});

var initsights = function() {
    //console.log(place)
    var html = "";
    html += '<ul class="des_center cities" id="huadong">\n';
    for (var i in place.华东) {
        if (place.华东[i] == "上海") {
            html += '<li>\n' +
                '   <span class="item">\n' +
                '       <a href="dest/shanghai.html"><span>' + place.华东[i] + '</span></a>\n' +
                '   </span>\n' +
                '   </li>\n';
        } else {
            html += '<li>\n' +
                '   <span class="item">\n' +
                '       <span>' + place.华东[i] + '</span>\n' +
                '   </span>\n' +
                '   </li>\n';
        }

    }
    html += '</ul>\n';
    html += '<ul  class="cities des_center" id="huabei">\n';
    for (var i in place.华北) {
        html += '<li>\n' +
            '   <span class="item">\n' +
            '       <span>' + place.华北[i] + '</span>\n' +
            '   </span>\n' +
            '   </li>\n';
    }
    html += '</ul>\n';
    html += '<ul  class="cities des_center" id="huanan">\n';
    for (var i in place.华南) {
        html += '<li>\n' +
            '   <span class="item">\n' +
            '       <span>' + place.华南[i] + '</span>\n' +
            '   </span>\n' +
            '   </li>\n';
    }
    html += '</ul>\n';
    html += '<ul class="cities des_center"  id="huazhong">\n';
    for (var i in place.华中) {
        html += '<li>\n' +
            '   <span class="item">\n' +
            '       <span>' + place.华中[i] + '</span>\n' +
            '   </span>\n' +
            '   </li>\n';
    }
    html += '</ul>\n';
    html += '<ul class="cities des_center"  id="dongbei">\n';
    for (var i in place.东北) {
        html += '<li>\n' +
            '   <span class="item">\n' +
            '       <span>' + place.东北[i] + '</span>\n' +
            '   </span>\n' +
            '   </li>\n';
    }
    html += '</ul>\n';
    html += '<ul  class="cities des_center" id="xibei">\n';
    for (var i in place.西北) {
        html += '<li>\n' +
            '   <span class="item">\n' +
            '       <span>' + place.西北[i] + '</span>\n' +
            '   </span>\n' +
            '   </li>\n';
    }
    html += '</ul>\n';
    html += '<ul  class="cities des_center" id="xinan">\n';
    for (var i in place.西南) {
        html += '<li>\n' +
            '   <span class="item">\n' +
            '       <span>' + place.西南[i] + '</span>\n' +
            '   </span>\n' +
            '   </li>\n';
    }
    html += '</ul>\n';
    //console.log(html)
    $("#cities").html(html);

    return;
};