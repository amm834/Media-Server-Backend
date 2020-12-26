require("dotenv").config();
const express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io')(server),
hogan = require('hogan-express');
app.use(express.static(__dirname));
app.engine('html', hogan);
app.set('view engine', 'html');


app.get('/',(req,res)=>{
 res.render('index')
});

server.listen(process.env.PORT);