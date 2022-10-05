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

const ticket = {
  folio: "asd123",
  products: [
    [1, "Pizza Salami", 110],
    [3, "Pizza Light", 79],
    [2, "Pizza Hawaiana", 99],
  ],
};

const data = [
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
    tableBody: ticket.products,
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

function print() {
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
