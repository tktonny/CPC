package algo;

import java.util.*;

public class Strr {
	private List<List<Node>> posList;
	private List<List<Velocity>> velList;
	private List<List<Node>> localBest;
	private List<Node> globalBest;
	private List<Node> nodes;
	private List<List<Double>> dists;
	private int size;
	private double minDist;
	private double w;
	private double c1;
	private double c2;
	
	public Strr(String startName, String startCoor, List<String> names, List<String> coors, String endName, String endCoor) {
		size = coors.size();
		int num = 40;
		
		posList = new ArrayList(num);
		velList = new ArrayList(num);
		localBest = new ArrayList(num);
		globalBest = new ArrayList(size);
		nodes = new ArrayList(size);
		
		Iterator iterCoors = coors.iterator();
		Iterator iterNames = names.iterator();
		while (iterCoors.hasNext()&&iterNames.hasNext()) {
			String coor = (String)iterCoors.next();
			double x = Double.parseDouble(coor.split(",")[0].split("\\[")[1].trim());
			double y = Double.parseDouble(coor.split(",")[1].split("\\]")[0].trim());
			List<Double> nodeCoor = new ArrayList<Double>(2);
			nodeCoor.add(x);
			nodeCoor.add(y);
			String name = (String)iterNames.next();
			nodes.add(new Node(name, nodeCoor));
		}
		
		List<Node> pos;
		for (int i=0;i<num;i++) {
			pos = (List<Node>)((ArrayList<Node>)nodes).clone();
			Collections.shuffle(pos);
			posList.add(pos);
			
			List<Velocity> vels = new ArrayList<Velocity>(size);
			for (int j=0;j<size;j++) {
				Node start = nodes.get((int)(Math.random()*size));
				Node end = nodes.get((int)(Math.random()*size));
				vels.add(new Velocity(start, end));
			}
			velList.add(vels);
		}
		
		localBest = (List<List<Node>>)((ArrayList)posList).clone();
		globalBest = (List<Node>)((ArrayList<Node>)nodes).clone();
		minDist = 2<<20;
		
		dists = new ArrayList(size);
		double ex = Double.parseDouble(endCoor.split(",")[0].split("\\[")[1].trim());
		double ey = Double.parseDouble(endCoor.split(",")[1].split("\\]")[0].trim());
		double sx = Double.parseDouble(startCoor.split(",")[0].split("\\[")[1].trim());
		double sy = Double.parseDouble(startCoor.split(",")[1].split("\\]")[0].trim());
		for (int i=0;i<size;i++) {
			ArrayList<Double> dist = new ArrayList<Double>(size-i);
			double x1 = nodes.get(i).getCoor().get(0);
			double y1 = nodes.get(i).getCoor().get(1);
			for (int j=i;j<size;j++) {
				double x2 = nodes.get(j).getCoor().get(0);
				double y2 = nodes.get(j).getCoor().get(1);
				dist.add(Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)));
			}
			dists.add(dist);
			
			nodes.get(i).setStartDist(Math.sqrt((sx-x1)*(sx-x1)+(sy-y1)*(sy-y1)));
			nodes.get(i).setEndDist(Math.sqrt((ex-x1)*(ex-x1)+(ey-y1)*(ey-y1)));
		}
	}
	
	public List<Velocity> minus(List<Node> ends, List<Node> starts) {
		List<Velocity> minusRes = new ArrayList<Velocity>(size);
		for (int i=0;i<size;i++) {
			minusRes.add(new Velocity(starts.get(i), ends.get(i)));
		}
		return minusRes;
	}
	
	public List<Velocity> vPlusV(List<Velocity> v1, List<Velocity> v2) {
		List<Velocity> vPlusRes = new ArrayList<Velocity>(size);
		for (int i=0;i<size;i++) {
			if (v1.get(i).getEnd().equals(v2.get(i).getStart())) {
				vPlusRes.add(new Velocity(v1.get(i).getStart(), v2.get(i).getEnd()));
			}
			else if (v1.get(i).getStart().equals(v2.get(i).getEnd())) {
				vPlusRes.add(new Velocity(v2.get(i).getStart(), v1.get(i).getEnd()));
			}
			else {
				vPlusRes.add(v1.get(i));
			}
		}
		
		return vPlusRes;
	}
	
	public List<Velocity> multi(double c, List<Velocity> v) {
		List<Velocity> multiRes = new ArrayList<Velocity>(size);
		if (c>=0&&c<=1) {
			for (int i=0;i<size;i++) {
				multiRes.add(new Velocity(v.get(i).getStart(), v.get(i).getEnd()));
			}
		}
		else {
			for (int i=0;i<size;i++) {
				multiRes.add(new Velocity(v.get(i).getStart(), nodes.get((int)(Math.random()*size))));
			}
		}
		return multiRes;
	}
	
	public List<Node> pPlusV(List<Node> n, List<Velocity> v) {
		List<Node> pPlusRes = new ArrayList<Node>(size);
		for (int i=0;i<size;i++) {
			if (n.get(i).equals(v.get(i).getStart())) {
				pPlusRes.add(v.get(i).getEnd());
			}
			else {
				pPlusRes.add(n.get(i));
			}
		}
		return pPlusRes;
	}

	public double getDist(int i, int j) {
		if (i<=j) {
			return dists.get(i).get(j-i);
		}
		return dists.get(j).get(i-j);
	}
	
	public double getPathDist(List<Node> pos) {
		Iterator iter = pos.iterator();
		Node temp = null;
		Node cur = null;
		double dist = 0;
		if (iter.hasNext()) {
			temp = (Node)iter.next();
		}
		while (iter.hasNext()) {
			int i = nodes.indexOf(temp);
			if (i!=-1) {
				cur = (Node)iter.next();
				int j = nodes.indexOf(cur);
				if (j!=-1) {
					dist += getDist(i, j);
					temp = cur;
				}
			}
		}
		if (pos.size()>0) {
			dist += pos.get(0).getStartDist();
			dist += pos.get(size-1).getEndDist();
		}
		return dist;
	}
	
	public ArrayList<Integer> dropDuplicate(List<Node> pos) {
		ArrayList<Node> distinct = new ArrayList<Node>();
		ArrayList<Node> duplicate = new ArrayList<Node>();
		ArrayList<Integer> idx = new ArrayList<Integer>();
		for (int i=0;i<size;i++) {
			if (!distinct.contains(pos.get(i))) {
				distinct.add(pos.get(i));
			}
			else {
				duplicate.add(pos.get(i));
			}
		}
		for (int i=0;i<size;i++) {
			if (duplicate.contains(pos.get(i))) {
				pos.set(i, null);
				idx.add(i);
			}
		}
		return idx;
	}
	
	public double calcOptimalPath() {
		double temp = minDist;
		for (int i=0;i<posList.size();i++) {
			List<Velocity> minusResLocal = minus(localBest.get(i), posList.get(i));
			List<Velocity> minusResGlobal = minus(globalBest, posList.get(i));
			w = Math.random()*2;
			c1 = Math.random()*2;
			c2 = Math.random()*2;
			List<Velocity> velRes = vPlusV(vPlusV(multi(w, velList.get(i)),
					multi(c1, minusResLocal)), multi(c2, minusResGlobal));
			List<Node> oriPos = posList.get(i);
			List<Node> newPos = pPlusV(oriPos, velRes);
			velList.set(i, velRes);
			
			ArrayList<Integer> idx = dropDuplicate(newPos);
			
			Queue<Node> q = new PriorityQueue<Node>(new Comparator<Node>() {
				@Override
				public int compare(Node n1, Node n2) {
					if (n2.getEndDist()>n1.getEndDist()) {
						return 1;
					}
					return -1;
				}
			});
			for (int j=0;j<size;j++) {
				if (!newPos.contains(oriPos.get(j))){
					q.add(oriPos.get(j));
				}
			}
			for (int j=0;j<idx.size();j++) {
				newPos.set(idx.get(j), q.poll());
			}
			posList.set(i, newPos);
			
			double d = getPathDist(newPos);
			if (d<getPathDist(localBest.get(i))) {
				localBest.set(i, newPos);
			}
			if (d<minDist) {
				globalBest = newPos;
				minDist = d;
			}
		}
		return temp;
	}
	
	public void permutation(List<Node> pos, int start, int end) {
		if (start==end) {
			double d = getPathDist(pos);
			if (d<minDist) {
				globalBest = pos;
				minDist = d;
			}
			return;
		}
		for (int i=start;i<=end;i++) {
			Collections.swap(pos, start, i);
			permutation(pos, start+1, end);
			Collections.swap(pos, start, i);
		}
	}
	
	public void train() {
		if (size<10) {
			List<Node> pos = (List<Node>)((ArrayList<Node>)nodes).clone();
			permutation(pos, 0, size-1);
			return;
		}
		int i = 0;
		boolean flag = false;
		while (i<20||flag==true) {
			double d = calcOptimalPath();
			i++;
			if (d>minDist) {
				flag=true;
			}
			else {
				flag=false;
			}
		}
	}
	
	public List<Node> getPath() {
		return globalBest;
	}
	
	public double getMinDist() {
		return minDist;
	}
	
}