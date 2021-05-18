const minCircle = require('./smallest-enclosing-circle')

class HybridAnomalyDetector extends SimpleAnomalyDetector{
}


function learnHelper(ts, p/*pearson*/, f1, f2, ps){
	SimpleAnomalyDetector.learnHelper(ts,p,f1,f2,ps);
	if(p>0.5 && p<threshold){
		//var cl = new minCircle(ps,ts.getRowSize());
        var cl=minCircle([ps]);
    // => { x: 10, y: 10, r: 14.142135623730951 }

		var c=new CorrelatedFeatures();
		c.feature1=f1;
		c.feature2=f2;
		c.corrlation=p;
		c.threshold=cl.radius*1.1; // 10% increase
		c.cx=cl.center.x;
		c.cy=cl.center.y;
		cf.push_back(c);
	}
}

function isAnomalous(x, y, c){
	return (c.corrlation>=threshold && SimpleAnomalyDetector.isAnomalous(x,y,c)) ||
			(c.corrlation>0.5 && c.corrlation<threshold && dist(Point(c.cx,c.cy),Point(x,y))>c.threshold);
}
