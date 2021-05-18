function CorrelatedFeatures() {
	this.feature1,feature2;  
	this.corrlation;
	this.lin_reg;
	this.threshold;
	this.cx,cy;
};

class Point{
    x;
    y;
    constructor(x, y) {
      this.x=x;
      this.y=y;
    }
}

class SimpleAnomalyDetector{
    cf=new CorrelatedFeatures();
    threshold;

    constructor() {
        this.threshold=0.9;
    }

    setCorrelationThreshold(threshold){
        this.threshold=threshold;
    }

    getNormalModel(){
		return cf;
	}
}

function toPoints(x, y){
	var ps=new Point*[x.size()];
	for(var i=0;i<x.size();i++){
		ps[i]=new Point(x[i],y[i]);
	}
	return ps;
}

function findThreshold(ps, len, rl){
	var max=0;
	for(var i=0;i<len;i++){
		var d=Math.abs(ps[i].y - rl.f(ps[i].x));
		if(d>max)
			max=d;
	}
	return max;
}


function learnNormal(ts){

    var atts=ts.gettAttributes(); // vector
    var len=ts.getRowSize();
    var vals; // array --> float vals[atts.size()][len]
	
    for(var i=0;i<atts.size();i++){
		var x=ts.getAttributeData(atts[i]); // vector
        for(var j=0;j<len;j++){
			vals[i][j]=x[j];
		}
	}

	for(var i=0;i<atts.size();i++){
		var f1=atts[i];
		var max=0;
		var jmax=0;
		for(var j=i+1;j<atts.size();j++){
			var p=Math.abs(Math.pearson(vals[i],vals[j],len));
			if(p>max){
				max=p;
				jmax=j;
			}
		}
		var f2=atts[jmax];
		var ps=toPoints(ts.getAttributeData(f1),ts.getAttributeData(f2));

		learnHelper(ts,max,f1,f2,ps);

		// delete points
		/*for(var k=0;k<len;k++)
			delete ps[k];
		delete ps;*/
	}
}

function learnHelper(ts, p/*pearson*/, f1, f2, ps){
	if(p>threshold){
		var len=ts.getRowSize();
		var c = new CorrelatedFeatures();
		c.feature1=f1;
		c.feature2=f2;
		c.corrlation=p;
		c.lin_reg=Math.linear_reg(ps,len);
		c.threshold=findThreshold(ps,len,c.lin_reg)*1.1; // 10% increase
		cf.push_back(c);
	}
}

function detect(ts){
	var v; // vector of AnomalyReport

    cf.array.forEach(element => {
        var x=ts.getAttributeData(c.feature1); //vector
		var y=ts.getAttributeData(c.feature2); //vector
		for(var i=0;i<x.size();i++){
			if(isAnomalous(x[i],y[i],c)){
				var d=c.feature1 + "-" + c.feature2;
				v.push_back(AnomalyReport(d,(i+1)));
			}
		}
    });
    return v;
}    

function isAnomalous(x, y, c){
	return (Math.abs(y - c.lin_reg.f(x))>c.threshold);
}
