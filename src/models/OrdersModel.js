const db = require('../database/db');

function OrdersModel() {
  this.createOrder = async function (label, sweet_type, flavor, quantity, filling, allergens, special_request, payment_method, delivery_date, client_id, address_id) {
    const sql = 'INSERT INTO orders (label, sweet_type, flavor, quantity, filling, allergens, special_request, payment_method, delivery_date, client_id, address_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    try {
      const order = await db.execute(sql, [label, sweet_type, flavor, quantity, filling, allergens, special_request, payment_method, delivery_date, client_id, address_id]);
      return order;

    } catch (error) {
      throw new Error('Error creating order: ' + error.message);
    }
  };

  this.showClientOrder = async function name(clientId, orderId) {
    const sql = `
    SELECT
      o.label,
      o.sweet_type,
      o.flavor,
      o.quantity,
      o.filling,
      o.allergens,
      o.special_request,
      o.payment_method,
      o.payment_status,
      o.total_amount,
      o.status,
      o.delivery_date,
      a.label AS address_label,
      a.street,
      a.city,
      a.state,
      a.complement,
      a.number,
      a.cep,
      a.phone
    FROM orders o
    JOIN addresses a ON o.address_id = a.address_id
    WHERE o.client_id = ? AND o.order_id = ?;
    `;

    try {
      const order = await db.execute(sql, [clientId, orderId]);

      return order;
    } catch (error) {
      throw new Error('Error showing order: ' + error.message);
    }
  };

  this.showAllOrders = async function () {
    const sql = `
    SELECT
      c.first_name,
      c.last_name,
      c.email,
      o.order_id,
      o.label,
      o.sweet_type,
      o.flavor,
      o.quantity,
      o.filling,
      o.allergens,
      o.special_request,
      o.payment_method,
      o.payment_status,
      o.total_amount,
      o.status,
      o.delivery_date,
      a.label AS address_label,
      a.street,
      a.city,
      a.state,
      a.complement,
      a.number,
      a.cep,
      a.phone
    FROM orders o
    JOIN addresses a ON o.address_id = a.address_id
    JOIN clients c ON o.client_id = c.client_id
    `;

    try {
      const order = db.execute(sql);

      return order;
    } catch (error) {
      throw new Error('Error showing all orders: ' + error.message);
    }
  };

  this.clientUpdateOrder = async function (clientId, orderId, data) {

    try {
      const fields = Object.keys(data).map(key => `${key} = ?`).join(", ");
      const values = Object.values(data);
      values.push(clientId, orderId);

      const sql = `UPDATE orders SET ${fields} WHERE client_id = ? AND order_id = ?`;
      const newOrderInfos = await db.query(sql, values);

      return newOrderInfos;

    } catch (error) {
      throw new Error(`Error updating order ${orderId}:`  + error.message);
    }

  }

}

const ordersModel = new OrdersModel();
module.exports = ordersModel;
