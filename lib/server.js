var https = require('https')
var fs = require('fs');

function start() {

    var options = {
        key: fs.readFileSync('config/server.key'),
        cert: fs.readFileSync('config/server.crt')
    };

    var server = https.createServer(options, function (req, res) {
        res.setHeader('content-type', 'text/html')
        res.writeHead(200);

	var user = req.headers["x-ldap-user"]
        var passwd = req.headers["x-new-password"]

	res.write("Hello, "+user+"!<P>")

        if (passwd) {
            res.write("New password is: " + passwd + "<P>");
        } else {
            res.write("push button to reset password for hello world<P>");
            res.write("")
        }

        res.end()

    }).listen(8000);

    return server
}

module.exports = start
