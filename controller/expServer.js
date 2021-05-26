const express = require('express')
const fileUpload = require('express-fileupload')
var html_tablify = require('html-tablify');
const model = require('../model/findDetect')
const fs = require('fs')


const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({
    extended: false
}))

app.use(fileUpload())
app.use(express.static('../view'))
app.get('/',(req,res)=>{
    res.sendFile("./index.html")
})

app.post('/detect', (req, res) => {{
    var mode
    if(req.body.mod == "reg") {
        mode = "Reg"
    }
    else {
        mode = "Hybrid"
    }
    if(!req.body.train.includes(".csv")  || !req.body.anomalies.includes(".csv")){
        res.write("Invalid file selected\nvalid files are in type .csv");
        res.end()
        return
    }
    var train
    try {
        const data = fs.readFileSync(req.body.train, 'utf8')
        train=data
    } catch (err) {
        console.error(err)
    }
    var anomalies

    try {
        const data = fs.readFileSync(req.body.anomalies, 'utf8')
        anomalies=data
    } catch (err) {
        console.error(err)
    }

    var result = model.getDetect(mode,train,anomalies)
    var dict = buildJson(result)
    res.send(JSON.stringify(dict))

}
})
app.post("/upload",(req,res)=>{
    var mode
    if(req.body.reg == "on"){
    mode = "Hybrid"
    }
    else{
        mode = "Reg"
    }
    if(req.files){
        if(req.files.practiceFile&&req.files.detectionFile){
            if(!req.files.detectionFile.name.includes(".csv")  || !req.files.practiceFile.name.includes(".csv")){
                res.write("Invalid file selected, valid files are of .csv");
                res.end()
                return
            }
            var trainFile = req.files.practiceFile
            var detectFile = req.files.detectionFile
            var result = model.getDetect(mode,trainFile.data.toString(),detectFile.data.toString())
            if(result[0][0]) {
                var dict = buildJson(result)
                let options = {
                    data: dict,
                    css:''
                };

                let html = html_tablify.tablify(options);
                res.write(html)
            }
            else{
                res.write("No anomalies found")
            }

           // options.style.textAlign= 'center';

        }
    }

    //update()
    res.end()
})
function buildJson(text){
    var dict = []
    for(var i = 0 ; i< text[0].length; i++) {
        var obj = { time: text[2][i].toString(),feature1: text[0][i].toString(), feature2: text[1][i].toString() }
        dict.push(obj)
    }
    return dict
}
/*function update() {
   var f1="ail", f2="elv",time="600
    //for(){
        $("<tr><td>" + f1 + "</td><td>" + f2 + "</td><td>" + time + "</td></tr>").appendTo("#results")
   // }
}*/
app.listen(8080)