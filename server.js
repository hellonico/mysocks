//https://github.com/sockjs/sockjs-node
var http = require('http');
var sockjs = require('sockjs');
var fib = require("./lib/fib.js")

var echo = sockjs.createServer();
echo.on('connection', function(conn) {
    // conn.close();
    console.log(fib.fib(1000));
    conn.on('open', function(message) {
        console.log("hello");
    });
    conn.on('data', function(message) {
        try {
            var message = JSON.parse(message);
            if(message.type == "block") {
                for (i=0;i<1000;i++) {
                    setTimeout(function() {console.log(".");},1000);
                }
            }
        } catch(err){
            console.log(err);
        }
        conn.write(message);
    });
    conn.on('close', function() {});
});

var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
});
echo.installHandlers(server, {prefix:'/echo', disconnect_delay: 1});

// http.createServer().listen(9999, '127.0.0.1');
// 

server.listen(9999, '0.0.0.0');

