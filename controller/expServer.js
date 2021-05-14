const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../model/findDetect')

const app = express()
app.use(express.urlencoded({
    extended: false
}))

app.use(fileUpload())
app.use(express.static('../view'))
app.get('/',(req,res)=>{
    res.sendFile("./index.html")
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
        var trainFile = req.files.practiceFile
        var detectFile = req.files.detectionFile
        var result = model.getdetect(mode,trainFile.data.toString(),detectFile.data.toString())
        res.write(result)
        }
    }
    
    res.end()
})

app.listen(8080)