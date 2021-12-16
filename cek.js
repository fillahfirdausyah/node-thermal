const escpos = require("escpos");
escpos.USB = require('escpos-usb');

let id = escpos.USB.findPrinter()

console.log(id)

// idVendor: 1046,
// idProduct: 20497
