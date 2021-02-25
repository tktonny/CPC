<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8" import="algo.*,com.alibaba.fastjson.*,java.util.*"%>
<%
	String cities = request.getParameter("cities");
	JSONArray params = JSON.parseArray(cities);
	StringBuffer s = new StringBuffer();
	List<String> coors = new ArrayList<String>(params.size());
	for (int i = 0; i< params.size();i++) {
        JSONObject paramjson = (JSONObject) params.get(i);
        String value = paramjson.getString("value");
        s.append(value+'\n');
        coors.add(value);
    }
	out.println(s);
	
%>