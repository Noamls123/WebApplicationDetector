
const report = require('../model/AnomalyReport');
const util = require('../model/utils')

class CorrelatedFeatures {
    feature1;
    feature2;
    corrlation;
    lin_reg;
    threshold;
    cx;
    cy;
    constructor() {
    }
}
class SimpleAnomalyDetector{
    cf=[];
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
    var ps=[x.length];
    for(var i=0;i<x.length;i++){
        ps[i]=new util.Point(x[i],y[i]);
    }
    return ps;
}

function findThreshold(ps, len, rl){
    var max=0;
    for(var i=0;i<len;i++){
        var d=Math.abs(ps[i].y - rl.getF(ps[i].x));
        if(d>max)
            max=d;
    }
    return max;
}


function learnNormal(ts,sim){

    var atts=ts.getAttributes(); // vector
    var len=ts.getRowSize();
    var vals=[]; // array --> float vals[atts.size()][len]

    for(var i=0;i<len;i++){
        var x=ts.getAttributeData(i); // vector
        vals[i]=[]
        for(var j=0;j<x.length;j++){
            vals[i][j]=x[j];
        }
    }

    for(var i=0;i<atts.length;i++){
        var f1=i;
        var max=0;
        var jmax=0;
        for(var j=i+1;j<atts.length;j++){
            var p=Math.abs(util.pearson(vals[i],vals[j],x.length));
            if(p>max){
                max=p;
                jmax=j;
            }
        }
        var f2=jmax;
        var ps=toPoints(ts.getAttributeData(f1),ts.getAttributeData(f2));

        learnHelper(x.length,ts,max,f1,f2,ps,sim);

        // delete points
        /*for(var k=0;k<len;k++)
            delete ps[k];
        delete ps;*/
    }
}

function learnHelper(len,ts, p/*pearson*/, f1, f2, ps,sim){
    if(p>sim.threshold){
        var c = new CorrelatedFeatures();
        c.feature1=f1;
        c.feature2=f2;
        c.corrlation=p;
        c.lin_reg=util.linear_reg(ps,len);
        c.threshold=findThreshold(ps,len,c.lin_reg)*1.1; // 10% increase
        sim.cf.push(c);
    }
}

function detect(ts,sim){
    var v=[]; // vector of AnomalyReport
    sim.cf.forEach(element => {
        var x=ts.getAttributeData(element.feature1); //vector
        var y=ts.getAttributeData(element.feature2); //vector
        for(var i=0;i<x.length;i++){
            if(isAnomalous(x[i],y[i],element)){
                var d=ts.map[element.feature1].key + " : " + ts.map[element.feature2].key;
                v.push(new report.ARConstructor(d,(i+1)));
            }
        }
    });
    return v;
}

function isAnomalous(x, y, c){
    return (Math.abs(y - c.lin_reg.getF(x))>c.threshold);
}

module.exports.learnNormal = learnNormal
module.exports.cfConstructor=SimpleAnomalyDetector
module.exports.detect=detect
module.exports.CorrelatedFeatures = CorrelatedFeatures
module.exports.SimpleAnomalyDetector = SimpleAnomalyDetector
module.exports.learnHelper = learnHelper
module.exports.isAnomalous = isAnomalous