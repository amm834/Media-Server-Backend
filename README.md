# Media-Server-Backend
Node media server Backend project

# Socket IO Individual User Connection


```js
var io = require('socket.io').listen(server);
io.on('connection', function(socket) {
    socket.emit('msg',data);
    //to only that client
    io.sockets.emit('msg',data);
    //to all sockets.
}

```

io is your socket_server. And you listen for connections to it, not to its sockets.

https://stackoverflow.com/questions/24221820/io-sockets-socketsocket-id-emit-has-no-method-socket/24223251#24223251