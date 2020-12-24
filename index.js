const http = require("http");
const url = require("url");
const qs = require('querystring');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

let requestFileType = {
 '.html': 'text/html',
 '.css': 'text/css',
 '.js': 'text/javascript',
 '.png': 'image/png',
 '.jpg': 'image/jpeg',
};

let router = (req, res)=> {
 let uriRoute = url.parse(req.url, true);
 let oriPath = uriRoute.pathname == '/' ? '/index.html' : uriRoute.pathname;
 let filePath = __dirname + oriPath;
 let extName = path.extname(filePath);
 fs.access(filePath, fs.F_OK, (err)=> {
  if (err) {
   res.writeHead(404, {
    'Content-Type': 'text/html'
   });
   res.end('<h1>File Not Found</h1>');
  } else {
   fs.readFile(filePath, (err, data)=> {
    if (err) {
     res.writeHead(403, {
      'Content-Type': 'text/html'
     });
     res.end('<h1>File Cannot Read!</h1>');
    } else {
     res.writeHead(404, {
      'Content-Type': requestFileType[extName]
     });
     res.end(data);
    }
   });
  }
 });
};

const server = http.createServer(router);
server.listen(process.env.PORT, ()=> {
 console.log(`Server is running at ${process.env.PORT}`);
});