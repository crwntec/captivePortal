const bodyParser = require('body-parser');
const { exec } = require('child_process');
const express = require('express');

const PORT = 8090;

var app = express(express);
app.use(bodyParser.urlencoded({ extended: true }));
let indexFile = "";

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
})
app.post("/accept", (req,res)=>{
    if(req.body.mtd="aa38b8bcaf0de4b40cf2769fb2006fd4"){
        exec(`iptables -t nat -I PREROUTING 1 -s ${req.ip} -j ACCEPT && iptables -I FORWARD -s ${req.ip} -j ACCEPT`,(err,stdout,stderr)=>{
            if (err){
                console.log(err);
                res.sendStatus(500);
                return;
            }
            console.log(stdout)
            res.sendStatus(200);
        });
    } else {
        res.sendStatus(403);
    }
})
app.listen(PORT)