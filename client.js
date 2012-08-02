
function fibonacci(n) {
    	if (n <= 1) return n;
    	return fibonacci(n - 2) + fibonacci(n - 1);
}

// https://github.com/sockjs/sockjs-client/
var endpoint = 'http://stats.sh.nhkdom.testing.fivecool.org/api'
var whitelist = ["jsonp-polling"];

function log(message) {
	$("#messages").append(message+"<br/>");
}
var sock = init();

function init() {
	log("Endpoint is:"+endpoint+": whitelist:"+whitelist);
	var soc = new SockJS(endpoint, null, {devel:true, protocols_whitelist: whitelist});
	soc.onopen = function() {
		log("<i class=\"icon-thumbs-up\"></i> Open");
	};
	soc.onmessage = function(e) {
		log("Message:"+e.data);
	};
	soc.onclose = function() {
		log("<i class=\"icon-thumbs-down\"></i> Close");
		soc.open();	
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
	sock = init();
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
	log("Starting new connection");
	for (i=0;i<10000;i++) {
		conns.push(init());
	}
});
$("#fib").live("click", function(event) {
	log("Starting fib");
	log(fibonacci(30));
	log("Finishing fib");
});
$("#clean").live("click", function(event) {
	$("#messages").html("");
});
