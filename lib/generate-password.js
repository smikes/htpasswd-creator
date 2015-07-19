var crypto = require('crypto');
var fs = require('fs');

function generatePassword(filename, cb) {
    
    var shasum = crypto.createHash('sha1');
    fs.open(filename, "r", function (err, fd) {
        if (err) {
            return cb(err)
        }

        fs.read(fd, new Buffer(512), 0, 512, null, function (err, bytesRead, buffer) {
            if (err) {
                return cb(err)
            }
            if (bytesRead < buffer.length) {
                return cb(new Error("cannot read enough randomness from source " + filename))
            }
            
            shasum.update(buffer);
            fs.close(fd)
            return cb(null, shasum.digest('hex'))
        })
                
    })

}

module.exports = generatePassword
