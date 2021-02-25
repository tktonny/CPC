package algo;

import java.util.*;

public class bestPath {
	private String startName;
	private String startCoor;
	private List<String> names;
	private List<String> coors;
	private String endName;
	private String endCoor;
	private double mindist;
	private List<Node> bestpath;
	
	public bestPath(String startName, String startCoor, List<String> names,
			List<String> coors, String endName, String endCoor) {
		this.startName = startName;
		this.startCoor = startCoor;
		this.names = names;
		this.coors = coors;
		this.endName = endName;
		this.endCoor = endCoor;
		mindist = 2<<20;
		bestpath = null;
	}
	
	public void train() {
		System.out.println(names);
		for (int i=0;i<names.size();i++) {
			System.out.println(names.get(i));
		}
		Strr strr = new Strr(startName, startCoor, names, coors, endName, endCoor);
		int size = coors.size();
		if (size<10) {
			strr.train();
			mindist = strr.getMinDist();
			bestpath = strr.getPath();
			return;
		}
		for (int i=0;i<200;i++) {
			strr.train();
			double dist = strr.getMinDist();
			if (dist<mindist) {
				mindist = dist;
				bestpath = strr.getPath();
			}
		}
	}
	
	public double getMinDist() {
		return mindist;
	}
	
	public List<Node> getBestPath(){
		return bestpath;
	}
}
