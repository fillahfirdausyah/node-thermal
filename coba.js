"use strict";
const escpos = require("escpos");
escpos.USB = require('escpos-usb');

const device = new escpos.USB(1046, 20497);
// const device  = new escpos.RawBT();
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');
const printer = new escpos.Printer(device);

console.log(device)

device.open(function (err) {
  printer
    .font("a")
    .align("ct")
    .style("bu")
    .size(1, 1)
    .text("The quick brown fox jumps over the lazy dog")
    .text("敏捷的棕色狐狸跳过懒狗")
    .barcode("1234567", "EAN8")
    .qrimage("https://github.com/song940/node-escpos", function (err) {
      this.cut();
      this.close();
    });
});