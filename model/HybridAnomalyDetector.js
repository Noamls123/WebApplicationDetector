const util = require('../model/utils')
const simple = require('../model/SimpleAnomalyDetector');
const minCircle = require('smallest-enclosing-circle');
const report = require('../model/AnomalyReport');


class HybridAnomalyDetector extends simple.SimpleAnomalyDetector {
    constructor() {
        super();
        }
    }

function toPointsh(x, y){
    var ps=[];
    for(var i=0;i<x.length;i++){
        ps[i]={x:parseFloat(x[i]),y:parseFloat(y[i])};
    }
    return ps;
}

function learnNormal(ts,hyb){
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
        var ps=toPointsh(ts.getAttributeData(f1),ts.getAttributeData(f2));

        learnHelper(x.length,ts,max,f1,f2,ps,hyb);
    }
}

function learnHelper(len, ts, p/*pearson*/, f1, f2, ps,hyb) {

    simple.learnHelper(len,ts, p, f1, f2, ps,hyb);
    if (p > 0.5 && p < hyb.threshold) {
        //var cl = new minCircle(ps,ts.getRowSize());
        var cl =  minCircle(ps);
        // => { x: 10, y: 10, r: 14.142135623730951 }
        var c = new simple.CorrelatedFeatures();
        c.feature1 = f1;
        c.feature2 = f2;
        c.corrlation = p;
        c.threshold = cl.r * 1.1; // 10% increase
        c.cx = cl.x;
        c.cy = cl.y;
        hyb.cf.push(c);
    }
}
function detect(ts,hyb){
    var v=[]; // vector of AnomalyReport

    hyb.cf.forEach(element => {
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


function isAnomalous(x, y, c) {
    var d=dist(new util.Point(c.cx, c.cy), new util.Point(x, y))
    return (c.corrlation > 0.5 && c.corrlation < c.threshold && d > c.threshold) ||
        (c.lin_reg && c.corrlation >= c.threshold && simple.isAnomalous(x, y, c));
}

function dist(p1,p2){
    return Math.sqrt(Math.pow(p1.x-p2.x,2)*Math.pow(p1.y-p2.y,2))
}
module.exports.Constructor= HybridAnomalyDetector
module.exports.learnNormal = learnNormal
module.exports.detect = detect
module.exports.isAnomalous = isAnomalous
module.exports.learnHelper = learnHelper