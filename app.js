const express = require('express')
const app = express()
const mysql = require('mysql')
//[const bodyParser = require('body-parser')
const fs = require('fs');

//middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())//used to accept data in Json format
//app.use(bodyParser.json());

const schema = fs.readFileSync('dataschema.json','utf-8')
console.log(schema)
const schemaObj = JSON.parse(schema);
const dataObj = {};
Object.keys(schemaObj).forEach(object => {
    dataObj[object] = [];
});

app.get('/clients',(req,res) => {
    res.status(200).json({success: true, data: dataObj["clients"]});
})

app.post('/clients',(req,res) => {
    const clients = req.body
    const clientId = req.body.clientId
    
    clients.clientId = clientId
    dataObj["clients"].push(clients)
    const data = JSON.stringify(dataObj);
    fs.writeFileSync('./data.json', data + "\n",{flag:'a'});
    res.status(201).json({success: true, data: dataObj["clients"]});
})

app.get('/rooms',(req,res) => {
    res.status(200).json({success: true, data: dataObj["rooms"]});
})

app.post('/rooms',(req,res) =>{
    const rooms = req.body
    const roomId = req.body.roomId
    rooms.roomId = roomId
    dataObj["rooms"].push(rooms);
    const data = JSON.stringify(dataObj);
    fs.writeFileSync('./data.json', data + "\n",{flag:'a'});
    res.status(201).json({success: true, data: dataObj["rooms"]});
})

app.get('/bookings',(req,res) => {

    res.status(200).json({success: true, data: dataObj["bookings"]});
})

app.post('/bookings',(req,res) => {

    const booking = req.body
    const clientId = req.body.clientId
    const roomId = req.body.roomId

    const date = new Date();   
    booking.bookingID = req.body.clientId + req.body.roomId
    booking.CheckIN = date
       
    dataObj["bookings"].push(booking);
    const data = JSON.stringify(dataObj);
    fs.writeFileSync('./data.json', data + "\n",{flag:'a'});

    console.log(booking)
    res.status(201).json({success: true, data: dataObj["bookings"]});
})

app.listen(5000, () => {
    console.log('Server is listening at port 5000...')
})

//create database connection
/*const conn = mysql.createConnection({
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
})*/
//app.post('')
//apost route for clients
/*app.post('/tulia/clients',(req,res) => {  
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
     step1()
    res.status(200).send("All is well")
 })*/



