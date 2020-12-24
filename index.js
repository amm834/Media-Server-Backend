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

let isFileExist = (filePath)=> {
 return new Promise((resolve, reject)=> {
  fs.access(filePath, (err)=> {
   if (err) reject(err);
   else resolve(filePath);
  });
 });
};

let readFile = (filePath)=> {
 return new Promise((resolve,
  reject)=> {
  fs.readFile(filePath,
   (err, data)=> {
    if (err) reject(err);
    else resolve(data);
   });
 });
};

let router = (req, res)=> {
 let uriRoute = url.parse(req.url, true);
 let oriPath = uriRoute.pathname == '/' ? '/index.html': uriRoute.pathname;
 let filePath = __dirname + oriPath;
 let extName = path.extname(filePath);
 isFileExist(filePath)
 .then(readFile)
 .then(data => {
  res.writeHead(200,
   {
    'content-type': requestFileType[extName]});
  res.end(data);
 })
 .catch(err=> {
  res.writeHead(404);
  res.end('404 not found!');
 });
};

const server = http.createServer(router);
server.listen(process.env.PORT, ()=> {
 console.log(`Server is running at ${process.env.PORT}`);
});