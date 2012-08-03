
function fibonacci(n) {
    	if (n <= 1) return n;
    	return fibonacci(n - 2) + fibonacci(n - 1);
}

// https://github.com/sockjs/sockjs-client/
var endpoint = 'http://localhost:9999/echo';
var whitelist = ["websocket"];

function log(message) {
	$("#messages").append(message+"<br/>");
}
function lag(message) {
	$("#messages").append(message);
}
var sock = init();

function init() {
	var soc = new SockJS(endpoint, null, {devel:true, protocols_whitelist: whitelist});
	soc.onopen = function() {
		log("<i class=\"icon-thumbs-up\"></i> Open");
	};
	soc.onmessage = function(e) {
		log("<i>Message:"+e.data+"</i>");
	};
	soc.onclose = function() {
		log("<i class=\"icon-thumbs-down\"></i> Close");
		//soc.open();	
	};
	return soc;
}
$("#send").live("click", function(event) {
	log("sending message");
	sock.send(JSON.stringify({"type":"info", "data": "The time is now:"+moment().format()}));
});
$("#block").live("click", function(event) {
	log("sending block message");
	sock.send(JSON.stringify({"type":"block"}));
});
$("#close").live("click", function(event) {
	log("closing sockjs");
	sock.close();
});
$("#open").live("click", function(event) {
    log("Endpoint is:"+endpoint+": whitelist:"+whitelist);
	sock = init();
});
$("#rec").live("click", function(event) {
    log("Reconnect");
    sock.close();
    // sock.open();
    sock = init();
});
function getI() {
        var i = parseInt($("#numbers").val()); 
        if(i > 0)
        return i;
        
        return 10;

}
$("#bigsend").live("click", function(event) {
    var count = getI();
    log("sending "+count+" messages");
    var now1 = moment();
    for(i=0;i<count;i++) {
        lag(".");
        // setTimeout(function() {
         sock.send(JSON.stringify({type:'hello', data: "small message"}));
        // }, 1000*i);
    }
    var now2 = moment();
    log("<br/>finish sending plenty of messages:" + (now2-now1) + " ms");
});

$("#protocol").live("change", function(event) {
	whitelist = []
	var newv = $("#protocol").val();
	whitelist.push(newv);
	log("Selecting:"+newv);
	init();
});

var conns = [];
$("#new").live("click", function(event) {
    var c = getI();
	log("Starting new connections ["+c+"]");
	for (i=0;i<c;i++) {
        // lag(".");
        setTimeout(function() {
	        conns.push(init());
        }, i*5);
	}
	log("Finished new connections");
});
$("#fib").live("click", function(event) {
	log("Starting fib");
	log(fibonacci(30));
	log("Finishing fib");
});
$("#clean").live("click", function(event) {
	$("#messages").html("");
});
