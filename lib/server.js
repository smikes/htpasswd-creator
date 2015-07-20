var https = require('https')
var fs = require('fs');

function start() {

    var options = {
        key: fs.readFileSync('config/server.key'),
        cert: fs.readFileSync('config/server.crt')
    };

    var server = https.createServer(options, function (req, res) {
        res.writeHead(200);
        res.write(JSON.stringify(req.headers))
        res.end("push button to reset password for hello world\n");
    }).listen(8000);

    return server
}

module.exports = start
