const express = require('express')
const app = express()
const mysql = require('mysql')
//[const bodyParser = require('body-parser')
const fs = require('fs');

//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())//used to accept data in Json format
//app.use(bodyParser.json());

//const schema = fs.readFileSync('dataschema.json','utf-8')
//console.log(schema)
//const schemaObj = JSON.parse(schema);
//console.log(schemaObj)

//const clientID = req.body.clientID 
    

app.post('/clients',(req,res) =>{
    const clientID = req.body.clientID
    const scheme = fs.readFileSync('clients.json','utf-8')
    const schema = JSON.parse(scheme)
    //console.log(schema)
    schema["clients"].push(req.body.clientID)
    data = JSON.stringify(schema)
    fs.writeFileSync('./clients.json',data + "\n")
    res.send("Success")
})

app.listen(10000,(req,res)=>{
    console.log("Server is listening on port 10000...")
})