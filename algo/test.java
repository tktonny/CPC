package algo;

import java.util.*;

public class test {
	public static void main(String[] args) {
		
		String scoor = "[107.037942, 27.726422]";
		String sname = "????";
		
		List<String> coors = new ArrayList<String>(12);
		coors.add("[116.04394, 25.879955]");
		coors.add("[113.685385, 25.558262]");
		coors.add("[112.958692, 25.39752]");
		coors.add("[110.679727, 25.60248]");
		coors.add("[109.759862, 26.143425]");
		coors.add("[107.499025, 27.38104]");
		coors.add("[106.829212, 28.131018]");
		coors.add("[106.867282, 28.541284]");
		coors.add("[106.215041, 28.318063]");
		coors.add("[106.01497, 28.264703]");
//		coors.add("[105.432356, 27.791506]");
		
		List<String> names = new ArrayList<String>(12);
		names.add("???");
		names.add("???");
		names.add("????");
		names.add("???");
		names.add("???");
		names.add("????");
		names.add("???");
		names.add("???");
		names.add("??");
		names.add("????");
//		names.add("?????");
		
		String ecoor = "[109.143553, 26.222275]";
		String ename = "???";
		
		System.out.println("......");
		
		//????????????????????????????????????????????????????????????????????
		bestPath bp = new bestPath(sname, scoor, names, coors, ename, ecoor);
		//???
		bp.train();
		//??????
		System.out.println();
		System.out.println(bp.getMinDist());
		List<Node> path = bp.getBestPath();
		for (int i=0;i<path.size();i++) {
			System.out.print(path.get(i).getName()+",");
		}
	}
}
