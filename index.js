const http = require("http");
const url = require("url");

const routes = {
 GET: {
  '/': (req, res)=> {
   res.writeHead(200, {
    'Content-Type': 'text/html'
   });
   res.end('<h1> / => route and get method.');
  },
  '/about': (req, res)=> {
   res.writeHead(200, {
    'Content-Type': 'text/html'
   });
   res.end('<h1> /about => route and get method.');
  },
 },
 POST: {
  '/': (req, res)=> {
   res.writeHead(200, {
    'Content-Type': 'text/html'
   });
   res.end('<h1> / => route and post method.');
  },
  '/about': (req, res)=> {
   res.writeHead(200, {
    'Content-Type': 'text/html'
   });
   res.end('<h1> /about => route and post method.');
  },
 }
};

const start = (req, res)=> {
 let requestMethod = req.method;
 let requestPath = url.parse(req.url, true);
 routes[requestMethod][requestPath.pathname](req, res);
};



const server = http.createServer(start);
server.listen(3000, ()=> {
 console.log('Server is running!');
});