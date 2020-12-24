require("dotenv").config();
const path = require('path')
const express = require('express')
const app = express();

app.use(express.static(path.join(__dirname)));

app.get('/', function(req, res) {
 res.sendFile(path.join(__dirname, 'index.html'));
});


app.get('/index', (req, res)=> {
 res.sendFile(__dirname + '/index.html')
})

app.get('/about', (req, res)=> {
 res.sendFile(__dirname + '/about.html')
})

app.listen(process.env.PORT, ()=> {
 console.log('Server Started!')
});