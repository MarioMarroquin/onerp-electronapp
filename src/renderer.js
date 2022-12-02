let { remote } = require("electron");
const express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

const { createTicket } = require("./create.js");

let webContents = remote.getCurrentWebContents();
let printers = webContents.getPrinters(); //list the printers

printers.map((item, index) => {
  //write in the screen the printers for choose
  document.getElementById("list_printers").innerHTML +=
    ' <input type="radio" id="printer_' +
    index +
    '" name="printer" value="' +
    item.name +
    '"><label for="printer_' +
    index +
    '">' +
    item.name +
    "</label><br>";
});

var jsonParser = bodyParser.json();
let app = express();
let server = app.listen(5632);

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.post("/ticket", jsonParser, async (req, res) => {
  console.log(req.body.data.createTicket);
  //createTicket(req.body.data.createTicket);
  res.send("OK");
});
