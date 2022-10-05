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
    /*  {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: ticket.store.franchise.name,
      style: `text-align:center;`,
      css: { "font-size": "24px" },
    }, */
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: `Ticket #${ticket.folio}`,
      style: `text-align:center;`,
      css: { "font-size": "20px" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "Referencia #______ <br><br>",
      style: `text-align:center;`,
      css: { "font-size": "16px" },
    },
    /* {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: `${ticket.store.address.street}, ${ticket.store.address.city}, ${ticket.store.address.state}, C.P. ${ticket.store.address.zipcode}`,
      style: `text-align:center;`,
      css: { "font-size": "12px" },
    }, */
    {
      type: "text",
      value: "" + date(),
      style: `text-align:center;`,
      css: { "font-size": "12px", "font-family": "sans-serif" },
    },

    {
      type: "table",
      // style the table
      style: "border: 1px solid #ddd",
      // list of the columns to be rendered in the table header
      tableHeader: ["#", "Nombre", "$", "Total"],
      // multi dimensional array depicting the rows and columns of the table body
      tableBody: products,
      // list of columns to be rendered in the table footer
      //tableFooter: ["Animal", "Age"],
      // custom style for the table header
      //tableHeaderStyle: "background-color: #000; color: white;",
      // custom style for the table body
      tableBodyStyle: "border: 0.5px solid #ddd",
      // custom style for the table footer
      //tableFooterStyle: "background-color: #000; color: white;",
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "Total a pagar: $ 100",
      style: `text-align:right;`,
      css: { "font-size": "16px", "font-family": "Arial" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "Devolucion: $ 50",
      style: `text-align:right;`,
      css: { "font-size": "16px" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "Descuento: $ 10",
      style: `text-align:right;`,
      css: { "font-size": "16px" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "Abonos: $ 5",
      style: `text-align:right;`,
      css: { "font-size": "16px" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "IVA: $ 16",
      style: `text-align:right;`,
      css: { "font-size": "16px" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "Propina: $ 3 <br><br><hr><br>",
      style: `text-align:right;`,
      css: { "font-size": "16px" },
    },
    {
      type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
      value: "Gracias",
      style: `text-align:center;`,
      css: { "font-size": "16px" },
    },
  ];

  print(data);
}

const dataa = [
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "Tortas La Purisima",
    style: `text-align:center;`,
    css: { "font-size": "24px" },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "Ticket #______",
    style: `text-align:center;`,
    css: { "font-size": "20px" },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "Referencia #______ <br><br>",
    style: `text-align:center;`,
    css: { "font-size": "16px" },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value:
      "Hacienda Pino # 2019, Fracc. Los Angeles, 66477, Monterrey, Nuevo Leon",
    style: `text-align:center;`,
    css: { "font-size": "12px" },
  },
  {
    type: "text",
    value: "" + date(),
    style: `text-align:center;`,
    css: { "font-size": "12px", "font-family": "sans-serif" },
  },
  /*  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "HEADER",
    style: `text-align:center;`,
    css: { "font-weight": "700", "font-size": "18px" },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
    value:
      "Lorem ipsum<br><br> . , ; : ( ) - + = ! # % \" ' <br><br> ã Ã ç Ç $ & @ ê Ê í Í<br><br> 0 1 2 3 4 5 6 7 8 9 <br>a b c d e f g h i j k l m n o p q r s t u v w x y z<br>A B C D E F G H I J K L M N O P Q R S T U V W X Y Z<br><br><hr><br>elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation \n ullamco \n laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum<br>",

    css: {
      "font-size": "12px",
      "font-family": "sans-serif",
      "text-align": "center",
    },
  },
  {
    type: "barCode", // Do you think the result is ugly? Me too. Try use an image instead...
    value: "HB4587896",
    height: 12,
    width: 1,
    displayValue: true, // Display value below barcode
    fontsize: 8,
  },
  {
    type: "qrCode",
    value: "https://github.com/fssonca",
    height: 80,
    width: 80,
    style: "margin-left:50px",
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "---||",
    style: `text-align:right;`,
    css: { "font-size": "12px" },
  }, */
  {
    type: "table",
    // style the table
    style: "border: 1px solid #ddd",
    // list of the columns to be rendered in the table header
    tableHeader: ["#", "Nombre", "$", "Total"],
    // multi dimensional array depicting the rows and columns of the table body
    //tableBody: ticket.products,
    // list of columns to be rendered in the table footer
    //tableFooter: ["Animal", "Age"],
    // custom style for the table header
    //tableHeaderStyle: "background-color: #000; color: white;",
    // custom style for the table body
    tableBodyStyle: "border: 0.5px solid #ddd",
    // custom style for the table footer
    //tableFooterStyle: "background-color: #000; color: white;",
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "Total a pagar: $ 100",
    style: `text-align:right;`,
    css: { "font-size": "16px", "font-family": "Arial" },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "Devolucion: $ 50",
    style: `text-align:right;`,
    css: { "font-size": "16px" },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "Descuento: $ 10",
    style: `text-align:right;`,
    css: { "font-size": "16px" },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "Abonos: $ 5",
    style: `text-align:right;`,
    css: { "font-size": "16px" },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "IVA: $ 16",
    style: `text-align:right;`,
    css: { "font-size": "16px" },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "Propina: $ 3 <br><br><hr><br>",
    style: `text-align:right;`,
    css: { "font-size": "16px" },
  },
  {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "Gracias",
    style: `text-align:center;`,
    css: { "font-size": "16px" },
  },
];

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

  for (var i = 0, length = p.length; i < length; i++) {
    if (p[i].checked) {
      printerName = p[i].value;

      break;
    }
  }

  console.log(printerName);

  const options = {
    preview: false, // Preview in window or print
    width: "300px", //  width of content body
    margin: "0 0 0 0", // margin of content body
    copies: 1, // Number of copies to print
    printerName: printerName, // printerName: string, check it at webContent.getPrinters()
    timeOutPerLine: 400,
    silent: true,
  };

  const d = [...data];

  if (printerName) {
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
  origin: "http://localhost:3000",
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
