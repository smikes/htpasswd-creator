var start = require('./lib/server')

var server = start();

server.on('close', function () {
    console.log("closing...")
});
