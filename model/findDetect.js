//import {learnNormal} from "./SimpleAnomalyDetector"
//let SimpleAnomalyDetector = function () { };

//var path = require('path')
//const simpleAnomaly = require(path.resolve(__dirname,'./SimpleAnomalyDetector.js'));
//const HybridAnomaly = require(path.resolve(__dirname,'./HybridAnomalyDetector.js'));
//const AnomalyReport = require(path.resolve(__dirname,'./AnomalyReport.js'))
const simpleAnomaly = require('./SimpleAnomalyDetector')

function getDetect(mode, train, anomalies){
    var result="here are the anomalies"
    console.log(result+"\n")
    var timeSeriesTrain = new timeSeries(train)
    var timeSeriesAnomalies = new timeSeries(anomalies)

    if(mode == "Reg"){ //simple
        var simple =simpleAnomaly.SimpleAnomalyDetector()

        simple.learnNormal(timeSeriesTrain)

        var report = simple.detect(timeSeriesAnomalies);
        for(var size=0; size<report.length(); size++ ){
            result += report[size].description +" "+ report[size].timeStep + "\n"
        }
    }
    else{//hybrid
        var hybrid = HybridAnomaly.constructor()
        hybrid.learnNormal(timeSeriesTrain)
        var report = hybrid.detect(timeSeriesAnomalies);
        for(var size=0; size<report.length(); size++ ){
            result += report[size].description +" "+ report[size].timeStep + "\n"
        }
    }
    return result
}
class timeSeries{
    map;

    constructor( file, ) {
        this.map=timeSeriesBuilder(file);
    }
    getAttributes(){
        return this.map.keys
    }
    getRowSize(){
        console.log("keys number = " +this.map.length())
    return this.map.length()
    }
    getAttributeData(k){
        return this.map[k].vals
    }

}

function timeSeriesBuilder(file){
    var timeSeries={};
    //send to the server get the anomalis
    var rows =file.split("\n")
    var feathers = rows[0].split(',')
    for(var singleRow = 0 ; singleRow< rows.length;singleRow++) {
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
module.exports.getDetect = getDetect
