const http = require("http");
const url = require("url");
const qs = require('querystring');
const fs = require('fs');
require('dotenv').config();


const responder = (req, res, params)=> {
 res.writeHead(200, {
  'Content-Type': 'text/html'
 });
 res.end(params);
};

const myFileReader = (filePath, res)=> {
 fs.access(filePath, fs.constants.F_OK, (err)=> {
  if (err) {
   throw err;
  } else {
   fs.readFile(filePath, (err, data)=> {
    if (err) throw err;
    res.writeHead(200, {
     'Content-Type': 'text/html'
    });
    res.end(data);
   })
  }
 });
};

const routes = {
 GET: {
  '/': (req,
   res)=> {
   let filePath = __dirname + '/index.html';
   myFileReader(filePath, res);
  },
  '/index.html': (req,
   res)=> {
   let filePath = __dirname + '/index.html';
   myFileReader(filePath, res)
  }
 },

 POST: {
  '/api/login': (req,
   res)=> {
   let body = '';
   req.on('data',
    data=> {
     body += data;
    });
   req.on('end',
    ()=> {
     let reqData = qs.parse(body);
     console.log(reqData);
     res.end();
    })
  }

 },

 NA: (req,
  res)=> {
  responder('<h1>404 Not Found!</h1>');
 }
};

const start = (req, res)=> {
 let requestMethod = req.method;
 let params = url.parse(req.url,
  true);
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