const http = require("http");
const url = require("url");
const qs = require('querystring');
require('dotenv').config();

const responder = (req, res, params)=> {
 res.writeHead(200, {
  'Content-Type': 'text/html'
 });
 res.end(params);
};

const routes = {
 GET: {
  '/': (req, res)=> {
   responder(req, res, '<h1> / => route and get method.');
  },
  '/about': (req, res)=> {
   responder(req, res, '<h1> /about => route and get method.');
  },
 },
 
 POST: {
  
  '/api/login':(req,res)=>{
   let body = '';
   req.on('data',data=>{
    body += data;
   });
   req.on('end',()=>{
    let reqData = qs.parse(body);
    console.log(reqData);
    res.end();
   })
  }
  
 },
 
 NA: (req, res)=> {
  responder('<h1>404 Not Found!</h1>');
 }
};

const start = (req, res)=> {
 let requestMethod = req.method;
 let params = url.parse(req.url, true);
 let resolveRoute = routes[requestMethod][params.pathname];
 if (resolveRoute != null && resolveRoute != undefined) {
  resolveRoute(req, res, params);
 } else {
  routes['NA'](req, res, params);
 }
};



const server = http.createServer(start);
server.listen(process.env.PORT, ()=> {
 console.log(`Server is running at ${process.env.PORT}`);
});