const http = require("http");

const start = (req, res)=> {
 res.writeHead(200, {
  'Content-Type': 'text/html'
 });
 if(req.method == 'GET'){
 res.end('GET Method');
 }else if(req.method == 'POST'){
  res.end('POST');
 }else{
  res.end('LoL');
 }
};

const server = http.createServer(start);

server.listen(3000, ()=> {
 console.log('Server is running!');
});