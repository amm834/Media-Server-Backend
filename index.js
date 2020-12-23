const http = require("http");

const routes = {
 GET:{
  '/':()=>{
   console.log(' / path and get method')
  },
  '/about':()=>{
   console.log(' /about path and get method')
  },
 },
 POST:{
  '/':()=>{
   console.log('/ path and  post method')
  },
  '/about':()=>{
   console.log('/about path and  post method')
  },
 }
};

const start = (req, res)=> {
 res.writeHead(200, {
  'Content-Type': 'text/html'
 });
  let requestMethod = req.method;
  let requestPath = req.url;
  routes[requestMethod][requestPath]();
};



const server = http.createServer(start);
server.listen(3000, ()=> {
 console.log('Server is running!');
});