var lab = require("Lab").script()
exports.lab = lab

var code = require("Code")
var it = lab.it
var expect = code.expect

var fs = require("fs")

var generatePassword = require("../lib/generate-password")

lab.describe("updateEntry", function () {

    it("generates a password", function (done) {
        generatePassword("/dev/urandom", function (err, p) {
            done(err)
        })
    })              

    it("fails if entropy source nonexistent", function (done) {
        generatePassword("/filbert/random", function (err, p) {
            expect(err.message).to.contain("filbert")
            done(null)
        })
    })              

    it("fails if cannot read entropy", function (done) {
        generatePassword("/dev/null", function (err, p) {
            expect(err.message).to.contain("randomness")
            done(null)
        })
    })              


})
