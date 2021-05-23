function pearson(x,y,size){
    var c = cov(x,y,size)
    var s= (Math.sqrt(varM(x,size))*Math.sqrt(varM(y,size)))
    if(s == 0)
        return 0
    return cov(x,y,size)/(Math.sqrt(varM(x,size))*Math.sqrt(varM(y,size)))
}
function varM(x,size){
    var sum=0
    var miu= avg(x,size)
    for(var i=0;i<size;i++){
        sum += Math.pow(x[i],2)
    }
    return (sum/size)-(Math.pow(miu,2))
}
function  cov(x,y,size){
    var sum=0.0
    for(var i=0;i<size;i++){
        sum += x[i]*y[i]
    }
    return sum/size - (avg(x,size)*avg(y,size))
}
function avg(x,size){
    var sum=0.0
    for(var i=0;i<size;i++){
        sum+=parseFloat(x[i])
    }
    return sum/size
}
function linear_reg(ps,len){
    var x=[len]
    var y=[len]
    for(var i=0;i<len;i++){
        x[i] = ps[i].x
        y[i] = ps[i].y
    }
    var v = varM(x,len)
    if(v == 0){
        return new Line(0,0)
    }
    var a = cov(x,y,len)/varM(x,len)
    var b = avg(y,len) - a*(avg(x,len))
    return new Line(a,b)
}
class Line{
    a;
    b;
    constructor(x,y) {
        this.a=x;
        this.b=y;
    }
    getF(x){
        return this.a*x+this.b
    }
}
class Point{
    x;
    y;
    constructor(x, y) {
        this.x=x;
        this.y=y;
    }
}
module.exports.Point = Point
module.exports.Line = Line
module.exports.linear_reg = linear_reg
module.exports.varM = varM
module.exports.cov = cov
module.exports.pearson = pearson
module.exports.avg = avg