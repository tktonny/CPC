package algo;

import java.util.*;

public class Velocity implements Cloneable {
	private Node start;
	private Node end;
	
	public Velocity(Node start, Node end) {
		this.start=start;
		this.end=end;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (obj==this) {
			return true;
		}
		if (!(obj instanceof Node)) {
			return false;
		}
		Velocity other = (Velocity)obj;
		return start.equals(other.getStart())&&end.equals(other.getEnd());
	}
	
	public void setStart(Node start) {
		this.start.setName(start.getName());
		this.start.setCoor(start.getCoor());
	}
	
	public Node getStart() {
		return start;
	}
	
	public void setEnd(Node end) {
		this.end.setName(end.getName());
		this.end.setCoor(end.getCoor());
	}
	
	public Node getEnd() {
		return end;
	}
	
	public double getDist() {
		double x1 = start.getCoor().get(0);
		double y1 = start.getCoor().get(1);
		double x2 = end.getCoor().get(0);
		double y2 = end.getCoor().get(1);
		double dist = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
		return dist;
	}
	
}
