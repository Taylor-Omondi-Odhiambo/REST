const express = require('express')
const app = express()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const fs = require('fs');

//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())//used to accept data in Json format
//app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:null,
    database:'Tulia'
})

conn.connect((err) =>{
    if (err)
    {
        console.log("Error in connecting to database")
    }
    else
    {
        console.log("Database connection successful")
    }
})

const schema = fs.readFileSync('datastructure.json','utf-8')
const schemaObj = JSON.parse(schema);
const dataObj = {};
Object.keys(schemaObj).forEach(table => {
    dataObj[table] = [];
});

app.get('/client',(req,res) => {
    res.status(200).json({success: true, data: dataObj["clients"]});
})

app.post('client',(req,res) => {
    const {clientId} = req.body;
    if(!clientId){
        return res.status(400).json({success: false, message: 'Please provide an ID'});
    }
    dataObj["clients"].push(req.body);
    const data = JSON.stringify(dataObj);
    fs.writeFileSync('./data.json', data + "\n",{flag:'a'});
    res.status(201).json({success: true, data: dataObj["clients"]});
})

app.get('/room',(req,res) => {
    res.status(200).json({success: true, data: dataObj["rooms"]});
})

app.post('/room',(req,res) =>{
    function create (){
        const {roomId} = req.body;
    if(!roomId){
        return res.status(400).json({success: false, message: 'Please provide an ID'});
    }
    dataObj["rooms"].push(req.body);
    const data = JSON.stringify(dataObj);
    fs.writeFileSync('./data.json', data + "\n",{flag:'a'});
    res.status(201).json({success: true, data: dataObj["rooms"]});
    }
})

app.get('/booking',(req,res) => {

    res.status(200).json({success: true, data: dataObj["bookings"]});
})

app.post('/booking',(req,res) => {

     //const {clientId, roomId} = req.body;
     const booking = req.body
     const clientId = req.body.clientId
     const roomId = req.body.roomId
     if(!clientId || !roomId){
         return res.status(400).json({success: false, message: 'Please provide an ID'});
     }
     
      booking.bookingID = req.body.clientId + req.body.roomId
     
     //dataObj["bookings"].push(req.body);
     dataObj["clients"].push(clientId);
     dataObj["rooms"].push(roomId);
     dataObj["bookings"].push(booking);
     const data = JSON.stringify(dataObj);
     fs.writeFileSync('./data.json', data + "\n",{flag:'a'});
 
     console.log(booking)
 
     res.status(201).json({success: true, data: dataObj["bookings"]});
})
/*app.post('')
post route for clients
app.post('/tulia/clients',(req,res) => {  
    const name = req.body.name
    const gender = req.body.gender
    const roomID = req.body.roomID
    const size = req.body.size

    async function step1 (){
       await  conn.query((`INSERT INTO Clients (C_Name, Gender) VALUES("${name}", "${gender}")`),(err,result) => {
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(`${name} has been added to the clients table`)
            }
         })
    }
     async function step2 (){
        await conn.query((``),(err,result) => {
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(`${roomID}`)
            }
        })
     }
    res.status(200).send("All is well")
 })*/

app.listen(5000, () => {
    console.log('Server is listening at port 5000...')
})

