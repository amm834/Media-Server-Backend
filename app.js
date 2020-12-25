require("dotenv").config();
const path = require('path');
var bodyParser = require('body-parser');
const express = require('express');
const app = express();

//app.use(express.static(path.join(__dirname)));

app.use(express.static(__dirname));

// body paraser
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());


app.post('/api/login',(req,res)=>{
 console.log(req.body);
 res.send(`Email is ${req.body.email} and Pssword is ${req.body.passwd}`)
})

app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index', (req, res)=> {
 res.sendFile(__dirname + '/index.html')
})

//get query params
app.get('/api/user/',(req,res)=>{
 console.log(req.query);
})

//get param
app.get('/api/user/:name',(req,res)=>{
 console.log(req.params);
})



app.listen(process.env.PORT, ()=> {
 console.log('Server Started!')
});