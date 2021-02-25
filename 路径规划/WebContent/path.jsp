<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8" import="algo.*,com.alibaba.fastjson.*,java.util.*"%>
<%
	String namesStr = request.getParameter("names");
	String coorsStr = request.getParameter("coors");
	List<String> names = new ArrayList<String>();
	List<String> coors = new ArrayList<String>();
	List lt = JSON.parseArray(namesStr);
    for (int i=0;i<lt.size();i++){
    	names.add(lt.get(i).toString());
    }
	lt = JSON.parseArray(coorsStr);
	for (int i=0;i<lt.size();i++){
    	coors.add(lt.get(i).toString());
    }
	
    String sname = request.getParameter("sname");
    String scoor = request.getParameter("scoor");
    String ename = request.getParameter("ename");
    String ecoor = request.getParameter("ecoor");
    
    System.out.println("......");
	
	//出发地名，出发地坐标，途径地名（集合），途径地坐标（集合），目的地名，目的地坐标
	bestPath bp = new bestPath(sname, scoor, names, coors, ename, ecoor);
	//训练
	bp.train();
	//结果显示
	List<Node> path = bp.getBestPath();
	List<String> paths = new ArrayList<String>();
	paths.add(sname);
	for (int i=0;i<path.size();i++) {
		paths.add(path.get(i).getName());
	}
	paths.add(ename);
	
	//将结果返回
	out.println(paths);
	
	/* JSONArray params = JSON.parseArray(names);
	StringBuffer s = new StringBuffer(); 
	List<String> coors = new ArrayList<String>(params.size());
	for (int i = 0; i< params.size();i++) {
        JSONObject paramjson = (JSONObject) params.get(i);
        String value = paramjson.getString("value");
        s.append(value+'\n');
        coors.add(value);
    } */
%>
