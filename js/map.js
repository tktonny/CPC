function loadJScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//api.map.baidu.com/api?type=webgl&v=1.0&ak=AgOfu3ySh60dOf4sFHgEZDClheWAP1ah&callback=init';
    document.body.appendChild(script);
}

function init() {
    var map = new BMapGL.Map('map'); // 创建Map实例
    var point = new BMapGL.Point(116.404, 39.915); // 创建点坐标
    map.centerAndZoom(point, 10);
    map.enableScrollWheelZoom(); // 启用滚轮放大缩小
}
window.onload = loadJScript; // 异步加载地图
init()