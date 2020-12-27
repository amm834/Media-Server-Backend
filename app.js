require("dotenv").config();
const express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io')(server),
hogan = require('hogan-express');
app.use(express.static(__dirname));
app.engine('html', hogan);
app.set('view engine', 'html');


app.get('/', (req, res)=> {
 res.render('index')
});

io.on('connection', socket=> {
 
 socket.on('login',data=>{
  socket.username = data;
  socket.emit('login-success',true)
 });
 
 socket.on('chat-message', data=> {
  io.emit('income-chat-message', socket.username +':' + data);
 });

});

server.listen(process.env.PORT);