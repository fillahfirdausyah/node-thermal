const ThermalPrinter = require("node-thermal-printer").printer;
const Types = require("node-thermal-printer").types;
const axios = require("axios");

let data = [];

let getData = async () => {
  let res = await axios.get("https://fakestoreapi.com/products/7");
  data = res.data;
  console.log(data);

  let printer = new ThermalPrinter({
    type: Types.EPSON, // 'star' or 'epson'
    interface: "//localhost/XP-80",
    options: {
      timeout: 1000,
    },
    width: 48, // Number of characters in one line - default: 48
    characterSet: "SLOVENIA", // Character set - default: SLOVENIA
    removeSpecialCharacters: false, // Removes special characters - default: false
    lineCharacter: "-", // Use custom character for drawing lines - default: -
  });

  let isConnected = await printer.isPrinterConnected();
  console.log("Printer connected:", isConnected);

  printer.alignCenter();
  await printer.printImage("./img/olaii-logo-black-small.png");

  printer.alignLeft();
  printer.newLine();
  printer.println(data.title);
  printer.drawLine();

  printer.println(data.price);

  printer.drawLine();

  printer.println(data.description);
  try {
    printer.printBarcode("4126570807191");
    printer.code128("4126570807191", {
      height: 50,
      text: 1,
    });
    printer.beep();
  } catch (error) {
    console.error(error);
  }

  printer.pdf417("4126565129008670807191");
  printer.printQR("https://olaii.com");

  printer.newLine();

  printer.leftRight("Left", "Right");

  printer.table(["One", "Two", "Three", "Four"]);

  printer.tableCustom([
    { text: "Left", align: "LEFT", width: 0.5 },
    { text: "Center", align: "CENTER", width: 0.25, bold: true },
    { text: "Right", align: "RIGHT", width: 0.25 },
  ]);

  printer.tableCustom([
    { text: "Left", align: "LEFT", cols: 8 },
    { text: "Center", align: "CENTER", cols: 10, bold: true },
    { text: "Right", align: "RIGHT", cols: 10 },
  ]);

  printer.cut();
  printer.openCashDrawer();

  try {
    await printer.execute();
    console.log("Print success.");
  } catch (error) {
    console.error("Print error:", error);
  }
};

getData();
