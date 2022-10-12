const orderProducts = (products) => {
  let list = [];
  let maxOrder = 0;

  products.forEach((product) => {
    if (product.order > maxOrder) {
      maxOrder = product.order;
    }
  });

  let orders = [];

  for (let i = 0; i < maxOrder; i++) {
    orders.push({ order: i + 1, products: [] });
  }

  products.forEach((product) => {
    let aux = {
      quantity: product.quantity,
      name: product.product.name,
      price: product.price,
      order: product.order,
    };

    orders[product.order - 1].products.push(aux);
  });

  orders.forEach((order) => {
    list.push([`Orden ${order.order}:`]);

    order.products.forEach((product) => {
      let aux = [];
      aux.push(product.name);
      aux.push(product.quantity);
      aux.push(product.price);
      aux.push(product.price * product.quantity);
      list.push(aux);
    });
  });

  return list;
};

module.exports = { orderProducts };
