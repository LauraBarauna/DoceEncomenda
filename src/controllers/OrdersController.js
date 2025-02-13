const ordersModel = require('../models/OrdersModel');
const adressesModel = require('../models/AddressesModel');

function OrdersController() {
  this.store = async function (req, res) {

    try {

      const { client_id } = req.params;
      let {label, sweet_type, flavor, quantity, filling, allergens, special_request, payment_method, delivery_date, label_address} = req.body;

      const clientAddressCount = await adressesModel.howManyAddressesDoesClientHave(client_id);

      if (clientAddressCount === 0) {
        return res.status(500).json({ error: `Client ${client_id} does not have any registered address. To place an order, it is necessary to have one.` });
      };


      if( !sweet_type || !flavor || !quantity || !payment_method || !delivery_date || !label_address ) {
        return res.status(500).json({ error: `Fields: Sweet Type, flavor, quantity, payment method, delivery date and address are requerid!` });
      }

      const findAddressPk = await adressesModel.findPkByLabel(label_address, client_id);

      if(!findAddressPk) {
        return res.status(500).json({ error: `Client ${client_id} does not have the ${label_address} address!` });
      }

      let address_id = findAddressPk;

      if(!label) label = null;
      if(!filling) filling = null;
      if(!allergens) allergens = null;
      if(!special_request) special_request = null;

      const order = await ordersModel.createOrder(label, sweet_type, flavor, quantity, filling, allergens, special_request, payment_method, delivery_date, client_id, address_id);
      res.status(201).json({ message: `Order for client ${client_id} created successfully!` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  }
}

const ordersController = new OrdersController();
module.exports = ordersController;
