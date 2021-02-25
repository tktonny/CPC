<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8" import="algo.*"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>Insert title here</title>
<script type="text/javascript" src="./js/jquery.min.js"></script>
<script type="text/javascript" src="./js/长征.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		alert("document ready!");
	});
	
	function show(){
		var cities=geo_line_Data["citys"];
		var ct=document.getElementById("ct");
		for (idx in cities){
			var ctt=document.createElement("div");
			var t=document.createTextNode(cities[idx]["name"]);
			ctt.appendChild(t);
			var ct=document.getElementById("ct");
			ct.appendChild(ctt);
		}
		$.ajax({
			url:"./calcStrr.jsp",
			type:"get",
			data:{cities:JSON.stringify(cities)},
			success:function(res){
				alert(res);
			},
			error: function(res) {
	            $.ajax(this);
	        }
		});
	}
</script>
</head>
<body>
	<div class="container" id="ct">
		<button type="button" onclick="show()">点击查看内容</button><br>
	</div>
</body>
</html>