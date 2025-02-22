const ordersModel = require('../models/OrdersModel');
const adressesModel = require('../models/AddressesModel');
const clientModel = require('../models/ClientModel');

function OrdersController() {

  this.isDeliveryDateCloseTo3Days = async (clientId, orderId) => {
    const today = new Date();

    const [select] = await ordersModel.showClientOrder(clientId, orderId);
    const orderDeliveryDate = select[0].delivery_date;
    const dateObjDeliveryDate = new Date(orderDeliveryDate);
    dateObjDeliveryDate.setDate(dateObjDeliveryDate.getDate() - 3);

    return dateObjDeliveryDate.getTime() <= today.getTime(); // return true if delivery date is 3 days close to today

  }


  this.store = async function (req, res) {

    try {

      const client_id = req.client_id;
      let { label, sweet_type, flavor, quantity, filling, allergens, special_request, payment_method, delivery_date, label_address } = req.body;

      const clientAddressCount = await adressesModel.howManyAddressesDoesClientHave(client_id);

      if (clientAddressCount === 0) {
        return res.status(500).json({ error: `Client ${client_id} does not have any registered address. To place an order, it is necessary to have one.` });
      };


      if (!sweet_type || !flavor || !quantity || !payment_method || !delivery_date || !label_address) {
        return res.status(500).json({ error: `Fields: Sweet Type, flavor, quantity, payment method, delivery date and address are requerid!` });
      }

      const findAddressPk = await adressesModel.findPkByLabel(label_address, client_id);

      if (!findAddressPk) {
        return res.status(500).json({ error: `Client ${client_id} does not have the ${label_address} address!` });
      }

      let address_id = findAddressPk;

      if (!label) label = null;
      if (!filling) filling = null;
      if (!allergens) allergens = null;
      if (!special_request) special_request = null;

      const order = await ordersModel.createOrder(label, sweet_type, flavor, quantity, filling, allergens, special_request, payment_method, delivery_date, client_id, address_id);

      res.status(201).json({ message: `Order for client ${client_id} created successfully!` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  this.show = async function (req, res) {
    const client_id = req.client_id;
    const { order_id } = req.params;

    try {

      const [order] = await ordersModel.showClientOrder(client_id, order_id);

      if (!order || order.length === 0) {
        return res.status(404).json({ message: `The order ${order_id} does not exist!` });
      };

      const ordersKeys = Object.keys(order[0]).slice(0, 12);
      const ordersValues = Object.values(order[0]).slice(0, 12);

      const addressKeys = Object.keys(order[0]).slice(12, 20);
      const addressValues = Object.values(order[0]).slice(12, 20);

      const obj = [{
        order: Object.fromEntries(ordersKeys.map((key, i) => [key, ordersValues[i]])),
        address: Object.fromEntries(addressKeys.map((key, i) => [key, addressValues[i]]))
      }];


      return res.status(200).json(obj);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  this.index = async function (req, res) {

    try {

      const [orders] = await ordersModel.showAllOrders();

      if (!orders || orders.length === 0) {
        return res.status(404).json({ message: `There is no order` });
      };

      const separatedData = orders.map(order => {

        const clientKeys = Object.keys(order).slice(0, 3);
        const clientValues = Object.values(order).slice(0, 3);

        const orderKeys = Object.keys(order).slice(3, 16);
        const orderValues = Object.values(order).slice(3, 16);

        const addressKeys = Object.keys(order).slice(16, 24);
        const addressValues = Object.values(order).slice(16, 24);

        return {
          client: Object.fromEntries(clientKeys.map((key, i) => [key, clientValues[i]])),
          order: Object.fromEntries(orderKeys.map((key, i) => [key, orderValues[i]])),
          address: Object.fromEntries(addressKeys.map((key, i) => [key, addressValues[i]]))
        }

      });


      return res.status(200).json(separatedData);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  };

  this.clientUpdate = async (req, res) => {

    const client_id = req.client_id;
    const { order_id } = req.params;

    const { label, sweet_type, flavor, quantity, filling, allergens, special_request, payment_method, delivery_date, address_label } = req.body;

    const data = {};

    if (label) data.label = label;
    if (sweet_type) data.sweet_type = sweet_type;
    if (flavor) data.flavor = flavor;
    if (quantity) data.quantity = quantity;
    if (filling) data.filling = filling;
    if (allergens) data.allergens = allergens;
    if (special_request) data.special_request = special_request;
    if (payment_method) data.payment_method = payment_method;
    if (delivery_date) data.delivery_date = delivery_date;


    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    try {

      if (address_label) {
        const findAddressPk = await adressesModel.findPkByLabel(address_label, client_id);
        data.address_id = findAddressPk;

        if (!findAddressPk) {
          return res.status(500).json({ error: `Client ${client_id} does not have the ${address_label} address!` });
        }

      }

      const [order] = await ordersModel.showClientOrder(client_id, order_id);

      if (!order || order.length === 0) {
        return res.status(404).json({ message: `Client ${client_id} does not have that order!` });
      };

      const verifyDate = await this.isDeliveryDateCloseTo3Days(client_id, order_id);

      if (verifyDate) {
        return res.status(400).json({ error: `You can't delete this order anymore, because the delivery date is 3 days close! To delete, please talk to an admin.` });
      };

      await ordersModel.clientUpdateOrder(client_id, order_id, data);
      return res.json({ message: `Client ${client_id} updated order ${order_id} successfully!` });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  };

  this.delete = async (req, res) => {
    const client_id = req.client_id;
    const { order_id } = req.params;

    try {

      const [order] = await ordersModel.showClientOrder(client_id, order_id);

      if (!order || order.length === 0) {
        return res.status(404).json({ message: `Client ${client_id} does not have that order!` });
      };

      const verifyDate = await this.isDeliveryDateCloseTo3Days(client_id, order_id);

      if (verifyDate) {
        return res.status(400).json({ error: `You can't delete this order anymore, because the delivery date is 3 days close! To delete, please talk to an admin.` });
      };

      await ordersModel.deleteOrder(order_id, client_id);

      return res.json({ message: `Client ${client_id} deleted order ${order_id} successfully!` });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  this.adminUpdate = async (req, res) => {
    const { client_id } = req.params;
    const { order_id } = req.params;

    const { payment_status, total_amount, status } = req.body;

    const data = {};

    data.payment_status = payment_status ? payment_status : 'waiting_for_payment';
    data.total_amount = total_amount ? total_amount : null;
    data.status = status ? status : 'waiting_for_value';

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    };

    try {
      const [client] = await clientModel.showOneClient(client_id);
      const [order] = await ordersModel.showClientOrder(client_id, order_id);

      if (!client || client.length === 0) {
        return res.status(404).json({ message: `Client ${client_id} does not exist!` });
      };

      if (!order || order.length === 0) {
        return res.status(404).json({ message: `Client ${client_id} does not have that order!` });
      };

      await ordersModel.adminUpdateOrder(order_id, client_id, data);

      return res.json({ message: `Order ${order_id} from client ${client_id} was updated successfully!` });


    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }


}

const ordersController = new OrdersController();
module.exports = ordersController;
