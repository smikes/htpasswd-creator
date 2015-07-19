var lab = require("Lab").script()
exports.lab = lab

var code = require("Code")
var it = lab.it
var expect = code.expect

var fs = require("fs")
var rimraf = require("rimraf")

var updateEntry = require("../lib/update-entry")

lab.describe("updateEntry", function () {

    it("creates a file", function (done) {
        rimraf.sync("./testFile")
        updateEntry("./testFile", "wilma", "passw0rd", function (err) {
            
            var contents = fs.readFileSync("./testFile", "utf8")
            expect(contents).to.contain("wilma:$2y$05")
            rimraf.sync("./testFile")
            done(err);
        })
    })

    it("fails when cannot write to file", function (done) {
        updateEntry("/filbert/testFile", "wilma", "passw0rd", function (err) {
            expect(err.message).to.contain('cannot create file /filbert/testFile')
            done()
        })
    })

})
