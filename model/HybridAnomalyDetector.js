var path = require('path')
const simple = require(path.resolve(__dirname,'./SimpleAnomalyDetector.js'));
const minCircle = require('smallest-enclosing-circle');

class HybridAnomalyDetector extends simple {
    constructor() {
        super();
    }

    learnHelper(ts, p/*pearson*/, f1, f2, ps) {
        super.learnHelper(ts, p, f1, f2, ps);
        if (p > 0.5 && p < super.threshold) {
            //var cl = new minCircle(ps,ts.getRowSize());
            var cl = minCircle([ps]);
            // => { x: 10, y: 10, r: 14.142135623730951 }

            var c = super.CorrelatedFeatures();
            c.feature1 = f1;
            c.feature2 = f2;
            c.corrlation = p;
            c.threshold = cl.radius * 1.1; // 10% increase
            c.cx = cl.center.x;
            c.cy = cl.center.y;
            cf.push_back(c);
        }
    }

    isAnomalous(x, y, c) {
        return (c.corrlation >= super.threshold && super.isAnomalous(x, y, c)) ||
            (c.corrlation > 0.5 && c.corrlation < super.threshold && dist(Point(c.cx, c.cy), Point(x, y)) > c.threshold);
    }
}
module.exports = HybridAnomalyDetector
