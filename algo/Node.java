package algo;

import java.util.*;

public class Node implements Cloneable {
	private String name;
	private List<Double> coor;
	private double startDist;
	private double endDist;
	
	public Node(String name,List<Double> coor) {
		this.name = new String(name);
		this.coor = new ArrayList(coor);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj==this) {
			return true;
		}
		if (!(obj instanceof Node)) {
			return false;
		}
		Node other = (Node)obj;
		return name.equals(other.name);
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getName() {
		return name;
	}
	
	public void setCoor(List<Double> coor) {
		this.coor = (List<Double>)((ArrayList<Double>)coor).clone();
	}
	
	public List<Double> getCoor(){
		return (List<Double>)((ArrayList<Double>)coor).clone();
	}
	
	public void setStartDist(double startDist) {
		this.startDist = startDist;
	}
	
	public double getStartDist() {
		return startDist;
	}
	
	public void setEndDist(double endDist) {
		this.endDist = endDist;
	}
	
	public double getEndDist() {
		return endDist;
	}
	
}
