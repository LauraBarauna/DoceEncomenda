const ordersModel = require('../models/OrdersModel');

function OrdersController() {
  this.store = async function (req, res) {
    const { client_id } = req.params;
    let {label, sweet_type, flavor, quantity, filling, allergens, special_request, payment_method, delivery_date, label_address} = req.body;

    if( !sweet_type || !flavor || !quantity || !payment_method || !delivery_date || !label_address ) {
      return res.status(500).json({ error: `Fields: Sweet Type, flavor, quantity, payment method, delivery date and address are requerid!` });
    }

    if(!label) label = null;
    if(!filling) filling = null;
    if(!allergens) allergens = null;
    if(!special_request) special_request = null;

    try {
      const [order] = await ordersModel.createOrder(label, sweet_type, flavor, quantity, filling, allergens, special_request, payment_method, delivery_date, client_id, label_address);
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  }
}

const ordersController = new OrdersController();
module.exports = ordersController;
