let { remote } = require("electron");
// console.log(process.versions.electron);

const { PosPrinter } = remote.require("electron-pos-printer");
// const {PosPrinter} = require("electron-pos-printer"); //dont work in production (??)

const path = require("path");

let webContents = remote.getCurrentWebContents();
let printers = webContents.getPrinters(); //list the printers
console.log(printers);

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

/* const tickest = {
  id: "123456789",
  folio: "asd123",
  products: [
    { product: { name: "Pizza Salami" }, price: 119, quantity: 1 },
    { product: { name: "Pizza Light" }, price: 99, quantity: 2 },
    { product: { name: "Pizza Hawaiana" }, price: 109, quantity: 3 },
  ],
  subtotal: 359,
  store: {
    name: "Suc. La Purisima",
    franchise: { name: "La Purisima" },
    address: {
      street: "Hacienda Pino 2019, Fracc. Los Angeles",
      zipcode: 66577,
      city: "Monterrey",
      state: "Nuevo Leon",
    },
  },
  cliente: {
    firstName: "Mario",
    lastName: "Marroquin",
  },
  saleType: {
    name: "Local",
  },
  payments: {
    method: "CASH",
  },
  tips: 10,
  taxes: 16,
}; */

function checkTicket(ticket) {
  let products = [];
  let productsList = ticket.products.map(({ __typename, ...item }) => item);
  productsList = productsList.map(Object.values);

  productsList.forEach((p) => {
    let aux = [];
    aux.push(p[0]);
    aux.push(p[1].name);

    aux.push(p[2]);
    aux.push(p[0] * p[2]);
    products.push(aux);
  });

  const data = [
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: ticket.store.franchise.name,
      style: `text-align:center;`,
      css: { "font-size": "24px", "font-family": "sans-serif" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: `${ticket.store.name}`,
      style: `text-align:center;`,
      css: { "font-size": "20px", "font-family": "sans-serif" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: `Ticket ${ticket.folio}`,
      style: `text-align:center;`,
      css: { "font-size": "20px", "font-family": "sans-serif" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: `${ticket.store.address.street}, ${ticket.store.address.city}, ${ticket.store.address.state}, C.P. ${ticket.store.address.zipcode}`,
      style: `text-align:center;`,
      css: { "font-size": "12px", "font-family": "sans-serif" },
    },
    {
      type: "text",
      value: `Tipo de venta: ${ticket.saleType.name} <br><br>`,
      style: `text-align:center;`,
      css: { "font-size": "12px", "font-family": "sans-serif" },
    },
    {
      type: "text",
      value: "" + date(),
      style: `text-align:center;`,
      css: { "font-size": "12px", "font-family": "sans-serif" },
    },

    {
      type: "table",
      // style the table
      style: "margin-left: 7px",
      // list of the columns to be rendered in the table header
      tableHeader: [" #", "Nombre", "$", "Subtotal"],
      // multi dimensional array depicting the rows and columns of the table body
      tableBody: products,
      // list of columns to be rendered in the table footer
      tableFooter: [""],
      // custom style for the table header
      tableHeaderStyle: "border-top: 1px solid #000;",
      // custom style for the table body
      tableBodyStyle: "font-weight: 600; ",
      // custom style for the table footer
      tableFooterStyle: "border-bottom: 1px solid #000; color: white;",
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: `<br><br>Total a pagar: ${ticket.subtotal}`,
      style: `text-align:right;`,
      css: { "font-size": "16px", "font-family": "Arial" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "Descuento: $ 0.00",
      style: `text-align:right;`,
      css: { "font-size": "16px" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: `IVA: $ ${ticket.taxes}`,
      style: `text-align:right;`,
      css: { "font-size": "16px" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: `Propina: $ ${ticket.tips} <br><br><hr><br>`,
      style: `text-align:right;`,
      css: { "font-size": "16px" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "Gracias",
      style: `text-align:center;`,
      css: { "font-size": "16px" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "Cliente:",
      style: `text-align:left;`,
      css: { "font-size": "16px", "font-weight": "600" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: `${ticket.client.firstName} ${ticket.client.lastName}`,
      style: `text-align:left;`,
      css: { "font-size": "16px" },
    },

    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "Atendio:",
      style: `text-align:left;`,
      css: { "font-size": "16px", "font-weight": "600" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: `${ticket.store.name}`,
      style: `text-align:left;`,
      css: { "font-size": "16px", "font-weight": "600" },
    },
  ];

  print(data);
}

function date() {
  const x = new Date();

  const y = "0" + x.getHours();
  const z = "0" + x.getMinutes();
  const s = "0" + x.getSeconds();
  const h = "0" + x.getDate();
  const ano = x.getFullYear().toString().substr(-2);
  const ms = x.getMonth();
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    y.substr(-2) +
    ":" +
    z.substr(-2) +
    ":" +
    s.substr(-2) +
    " -  " +
    h.substr(-2) +
    "/" +
    meses[ms] +
    "/" +
    ano
  );
}

function print(data) {
  let printerName;
  let widthPage;

  var p = document.getElementsByName("printer");
  var w = document.getElementsByName("width");

  for (var i = 0, length = p.length; i < length; i++) {
    if (p[i].checked) {
      printerName = p[i].value;

      break;
    }
  }
  for (var i = 0, length = w.length; i < length; i++) {
    if (w[i].checked) {
      widthPage = w[i].value;

      break;
    }
  }

  console.log(printerName, widthPage);

  const options = {
    preview: false, // Preview in window or print
    width: widthPage, //  width of content body
    margin: "0 0 0 0", // margin of content body
    copies: 1, // Number of copies to print
    printerName: printerName, // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 400,
    silent: true,
  };

  const d = [...data];

  if (printerName && widthPage) {
    PosPrinter.print(d, options)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  } else {
    alert("Select the printer and the width");
  }
}
const express = require("express");

var bodyParser = require("body-parser");
var cors = require("cors");

const corsOptions = {
  origin: "https://www.onerp.com.mx",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

// create application/json parser
var jsonParser = bodyParser.json();

let app = express();
app.use(cors(corsOptions));

let server = app.listen(5632);

app.post("/ticket", jsonParser, async (req, res) => {
  console.log(req.body.data.createTicket);
  checkTicket(req.body.data.createTicket);
  res.send("OK");
});
