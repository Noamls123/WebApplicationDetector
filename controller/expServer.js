const express = require('express')
const fileUpload = require('express-fileupload')
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
console.log("this is my req:" ,req.body.mod)
    var mode
    if(req.body.mod == "reg") {
        console.log("hiii")
        mode = "Reg"
    }
    else {
        mode = "Hybrid"
    }
    if(!req.body.train.includes(".csv")  || !req.body.anomalies.includes(".csv")){
        res.write("Invalid file selected, valid files are of .csv");
        res.end()
        return
    }
    var train
    var data= ''
    var readStream = fs.createReadStream(req.body.train, 'utf8');

    fs.readFileSync(req.body.train,'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        train=data
        console.log(data)
    })

    var anomalies
    fs.readFileSync(req.body.anomalies,'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        anomalies=data
    })


    var result = model.getDetect(mode,train,anomalies)
    var dict = []
    for(var i = 0 ; i< result[0].length; i++) {
        var str = '{' + '"' + result[0][i].toString() + " " + result[1][i].toString() + '" : ' + "[" + result[2][i].toString() + "]" + "}"
        dict.push(str)
    }

    var dictstring = JSON.stringify(dict)
    res.send(JSON.stringify(dict))

}
})
app.post("/upload",(req,res)=>{
    var mode
    if(req.body.reg == "on"){
    res.write("detectMode is: Hybrid\n")
    mode = "Hybrid"
    }
    else{
        res.write("detectMode is: Regression\n")
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
            var dict = []
            for(var i = 0 ; i< result[0].length; i++) {
                var str = '{' + '"' + result[0][i].toString() + " " + result[1][i].toString() + '" : ' + "[" + result[2][i].toString() + "]" + "}"
                dict.push(str)
            }
        }
        var dictstring = JSON.stringify(dict)
        res.write(dictstring)
    }

    //update()
    res.end()
})

/*function update() {
   var f1="ail", f2="elv",time="600
    //for(){
        $("<tr><td>" + f1 + "</td><td>" + f2 + "</td><td>" + time + "</td></tr>").appendTo("#results")
   // }
}*/
app.listen(8080)