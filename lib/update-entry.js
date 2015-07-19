// update entry in htpasswd file
var child_process = require('child_process')

function updateEntry(file, name, passwd, cb) {
    var child = child_process.spawn('/usr/sbin/htpasswd', ['-cBi', file, name]);
    var stderr = ""

    child.stderr.on('data', function (chunk) {
        stderr += chunk
    })
    child.on('exit', function (code, signal) {
        if (code === 0) {
            return cb(null)
        }

        return cb(new Error("Exited with code " + code + " -- " + stderr))
    })

    child.stdin.write(passwd);
    child.stdin.end()
}

module.exports = updateEntry
