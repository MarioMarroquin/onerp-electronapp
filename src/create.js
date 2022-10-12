const { print } = require("./print.js");
const { date } = require("./ticket/date.js");
const { orderProducts } = require("./ticket/order.js");

const createTicket = (ticket) => {
  let productsList = orderProducts(ticket.products);

  const firstTitle = {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: ticket.store.franchise.name,
    style: `text-align:center;`,
    css: { "font-size": "24px", "font-family": "sans-serif" },
  };

  const secondTitle = {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: `${ticket.store.name}`,
    style: `text-align:center;`,
    css: { "font-size": "20px", "font-family": "sans-serif" },
  };

  const folio = {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: `Ticket ${ticket.folio}`,
    style: `text-align:center;`,
    css: { "font-size": "16px", "font-family": "sans-serif" },
  };

  const address = {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: `${ticket.store.address.street}, ${ticket.store.address.city}, ${ticket.store.address.state}, C.P. ${ticket.store.address.zipcode}`,
    style: `text-align:center;`,
    css: { "font-size": "12px", "font-family": "sans-serif" },
  };

  const saleType = {
    type: "text",
    value: `Tipo de venta: ${ticket.saleType.name} <br><br>`,
    style: `text-align:center;`,
    css: { "font-size": "12px", "font-family": "sans-serif" },
  };

  const actualDate = {
    type: "text",
    value: "<br><br>" + date(),
    style: `text-align:center;`,
    css: { "font-size": "12px", "font-family": "sans-serif" },
  };

  const productsTable = {
    type: "table",
    // style the table
    style: "margin-left: 7px; text-align: left;  padding: 0px;",
    // list of the columns to be rendered in the table header
    tableHeader: ["Nombre", " #", "$", "Subtotal"],
    // multi dimensional array depicting the rows and columns of the table body
    tableBody: productsList,
    // list of columns to be rendered in the table footer
    tableFooter: [""],
    // custom style for the table header
    tableHeaderStyle: "border-top: 1px solid #000;",
    // custom style for the table body
    tableBodyStyle: "font-weight: 600; text-align: left;  padding-left: 0px;",
    // custom style for the table footer
    tableFooterStyle: "border-bottom: 1px solid #000; color: white;",
  };

  const discount = {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "Descuento: $ 0.00",
    style: `text-align:right;`,
    css: { "font-size": "16px" },
  };

  const tip = {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: `<br><br> Propina: $ ${ticket.tips}`,
    style: `text-align:right;`,
    css: { "font-size": "16px" },
  };

  const tax = {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: `IVA: $ ${ticket.taxes}`,
    style: `text-align:right;`,
    css: { "font-size": "16px" },
  };

  const total = {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: `Total a pagar: ${ticket.subtotal}<br><br>`,
    style: `text-align:right;`,
    css: { "font-size": "16px", "font-family": "Arial" },
  };

  const message = {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: "¡Gracias! <br><br>",
    style: `text-align:center;`,
    css: { "font-size": "16px" },
  };

  const client = {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: `<b>Cliente</b>: ${ticket.client.firstName} ${ticket.client.lastName}`,
    style: `text-align:left;`,
    css: { "font-size": "16px" },
  };

  const attendant = {
    type: "text", // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
    value: `<b>Atendió</b>: ${ticket.store.name}`,
    style: `text-align:left;`,
    css: { "font-size": "16px" },
  };

  const data = [
    firstTitle,
    secondTitle,
    folio,
    address,
    saleType,
    productsTable,
    tip,
    tax,
    total,
    message,
    client,
    attendant,
    actualDate,
  ];

  print(data);
};

module.exports = { createTicket };
