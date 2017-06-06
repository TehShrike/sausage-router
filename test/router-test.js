var allTests = require('hash-brown-router/test/all-tests')
var browserTests = require('hash-brown-router/test/browser-tests')
var sausage = require('../')
require('tap-browser-color')()

const router = sausage()
allTests(router)
browserTests(router)
