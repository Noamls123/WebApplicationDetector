const simple = require('../model/SimpleAnomalyDetector')
const hybrid = require('../model/HybridAnomalyDetector')
function getDetect(mode, train, anomalies){
    var feature1 = []
    var feature2 = []
    var timestep = []
    var resultArray = []
    var result="here are the anomalies\n"
    var timeSeriesTrain = new timeSeries(train)
    var timeSeriesAnomalies = new timeSeries(anomalies)

    if(mode == "Reg"){ //simple
        var sim =  new simple.cfConstructor()
        simple.learnNormal(timeSeriesTrain,sim)

        var report = simple.detect(timeSeriesAnomalies,sim);
        for(var size=0; size<report.length; size++ ){
           // result += report[size].description +" "+ report[size].timeStep + "\n"
            timestep[size] = report[size].timeStep
            var fields = report[size].description.split(':')
            feature1[size] = fields[0]
            feature2[size] = fields[1]
        }
    }
    else{//hybrid
        var hyb = new hybrid.Constructor()
        hybrid.learnNormal(timeSeriesTrain,hyb)
        var report = hybrid.detect(timeSeriesAnomalies,hyb);
        for(var size=0; size<report.length; size++ ){
            // result += report[size].description +" "+ report[size].timeStep + "\n"
            timestep[size] = report[size].timeStep
            var fields = report[size].description.split(':')
            feature1[size] = fields[0]
            feature2[size] = fields[1]        }
    }
    resultArray[0] = feature1;
    resultArray[1] = feature2;
    resultArray[2] = timestep;
    return resultArray
}
class timeSeries{
    map;
    len;

    constructor( file, ) {
        this.map=timeSeriesBuilder(file);
        this.len= mapLen(this.map)
    }
    getAttributes(){
        var keys = []
        for(var i=0; i<this.len;i++){
            keys[i]= this.map[i].key
        }
        return keys
    }
    getRowSize(){
    return this.len
    }
    getAttributeData(k){
        return this.map[k].vals
    }

}

function timeSeriesBuilder(file){
    var timeSeries={}
    //send to the server get the anomalis
    var rows =file.split("\n")
    var feathers = rows[0].split(',')
    for(var singleRow = 0 ; singleRow < rows.length;singleRow++) {
        if (singleRow === 0) {
            for (var feather = 0; feather < feathers.length; feather++) {
                timeSeries[feather] = {
                    key: feathers[feather],
                    vals: []
                }
            }
        } else {
            var values = rows[singleRow].split(',')
            for (var rowCell = 0; rowCell < values.length; rowCell++) {
                timeSeries[rowCell].vals.push(values[rowCell])
            }
        }
    }
    return timeSeries
}
function mapLen(map){
    var len=0;
    for(var count in map){
        len++
    }
    return len;
}
module.exports.getDetect = getDetect
