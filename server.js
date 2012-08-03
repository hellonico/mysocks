//https://github.com/sockjs/sockjs-node
var http = require('http');
var sockjs = require('sockjs');
// var fib = require("./lib/fib.js");

var echo = sockjs.createServer();

// keep track of connections
var lesconnection = [];
var count = 0;

echo.on('connection', function(conn) {
    count ++;
    count--;
    lesconnection.push(conn);
    
    // tell new comer
    for(c in lesconnection) {
        lesconnection[c].write(count + " users");
    }
    
    
    // simulate pending messages on start 
    // for(i=0; i < 10000; i++) {
    //     for(c in lesconnection)  
    //         lesconnection[c].write("message "+ i);
    // }
    
    conn.on('data', function(message) {
        try {
            var message = JSON.parse(message);
            conn.write(JSON.stringify())
        } catch(err){
            // console.log(err);
            conn.write(message);
        }
        
    });
    
    conn.on('close', function() {
        count--;
        for(c in lesconnection) {
            lesconnection[c].write(count + " users");
        }
    });
});

// var server = http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// });

// http.createServer().listen(9999, '127.0.0.1');
// 
var server = http.createServer();
echo.installHandlers(server, {prefix:'/echo', disconnect_delay: 1});
server.listen(9999, '0.0.0.0');