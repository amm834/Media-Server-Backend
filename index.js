const http = require("http");
const url = require("url");
require('dotenv').config();
const routes = {
 GET: {
  '/': (req, res,params)=> {
   res.writeHead(200, {
    'Content-Type': 'text/html'
   });
   res.end('<h1> / => route and get method.');
  },
  '/about': (req, res,params)=> {
   res.writeHead(200, {
    'Content-Type': 'text/html'
   });
   res.end('<h1> /about => route and get method.');
  },
 },
 POST: {
  '/': (req, res,params)=> {
   res.writeHead(200, {
    'Content-Type': 'text/html'
   });
   res.end(`<h1> / => route and post method. ${params.query.name}`);
  },
  '/about': (req, res,params)=> {
   res.writeHead(200, {
    'Content-Type': 'text/html'
   });
   res.end('<h1> /about => route and post method.');
  },
 },
 NA:(req,res)=>{
 res.writeHead(404);
 res.end('<h1>404 Not Found!</h1>');
 }
};

const start = (req, res)=> {
 let requestMethod = req.method;
 let params = url.parse(req.url, true);
 
 let resolveRoute = routes[requestMethod][params.pathname];
 if(resolveRoute != null && resolveRoute != undefined){
  resolveRoute(req,res,params);
 }else{
  routes['NA'](req,res,params);
 }
};



const server = http.createServer(start);
server.listen(process.env.PORT, ()=> {
 console.log(`Server is running at ${process.env.PORT}`);
});