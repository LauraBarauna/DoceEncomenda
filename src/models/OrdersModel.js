const db = require('../database/db');

function OrdersModel () {
  this.createOrder = async function (label, sweet_type, flavor, quantity, filling, allergens, special_request, payment_method, delivery_date, client_id, address_id) {
    const sql = 'INSERT INTO orders (label, sweet_type, flavor, quantity, filling, allergens, special_request, payment_method, delivery_date, client_id, address_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
      const order = await db.execute(sql, [label, sweet_type, flavor, quantity, filling, allergens, special_request, payment_method, delivery_date, client_id, address_id]);
      return order;

    } catch (error) {
      throw new Error('Error creating order: ' + error.message);
    }

  }
}

const ordersModel = new OrdersModel();
module.exports = ordersModel;
