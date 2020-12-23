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
   let fileName = __dirname + '/index.html';
   responder(req, res, fileName);
  },
  '/index.html': (req, res)=> {
   let fileName = __dirname + '/index.html';
   responder(req, res, fileName)
  }
 },

 POST: {

  '/api/login': (req, res)=> {
   let body = '';
   req.on('data', data=> {
    body += data;
   });
   req.on('end', ()=> {
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
  resolveRoute(req, res);
 } else {
  routes['NA'](req, res);
 }
};



const server = http.createServer(start);
server.listen(process.env.PORT, ()=> {
 console.log(`Server is running at ${process.env.PORT}`);
});