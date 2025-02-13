const adressesModel = require('../models/AddressesModel');
const clientModel = require('../models/ClientModel');

function AddressesController() {
  this.store = async function (req, res) {
    const { client_id } = req.params;
    let { label, street, city, state, complement, number, cep, phone } = req.body;

    if (!label || !street || !city || !state || !cep || !phone) {
      return res.status(500).json({ error: `Fields: Label, street, city, state, cep and phone are requerid!` });
    };

    if (complement === undefined) complement = null;
    if (number === undefined) number = null;

    try {

      const addressesCount = await adressesModel.howManyAddressesDoesClientHave(client_id);

      if (addressesCount === 3) {
        return res.status(500).json({ error: `Client ${client_id} already have 3 address!` });
      }

      const newAddress = await adressesModel.createAddress(label, street, city, state, complement, number, cep, phone, client_id);
      res.status(201).json({ message: `Address ${label} created successfully!` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  this.show = async function (req, res) {
    const { client_id } = req.params;

    try {

      const [client] = await clientModel.showOneClient(client_id);

      if (!client || client.length === 0) {
        return res.status(404).json({ error: `Client ${client_id} not found` });
      };

      const clietsAddresses = await adressesModel.showClientAddresses(client_id);

      if (!clietsAddresses || clietsAddresses.length === 0) {
        return res.status(404).json({ error: `Client ${client_id} does not have an address!` });
      }

      return res.status(200).json(clietsAddresses);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  this.delete = async function (req, res) {
    const { client_id } = req.params;
    const { address_id } = req.params;

    try {

      const deletedAddress = await adressesModel.deleteAddresses(client_id, address_id);

      if (deletedAddress.affectedRows === 0) {
        return res.status(404).json({ error: `Address ${address_id} does not exist!` });
      };

      return res.status(200).json(`Address ${address_id} deleted successfully!`);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  };

  this.update = async function (req, res) {

    try {
      const { client_id } = req.params;
      const { address_id } = req.params;

      const [client] = await clientModel.showOneClient(client_id);

      if (!client || client.length === 0) {
        return res.status(404).json({ error: `Client ${client_id} not found` });
      };

      const { label, street, city, state, complement, number, cep, phone } = req.body;

      const updatedData = {};
      if (label) updatedData.label = label;
      if (street) updatedData.street = street;
      if (city) updatedData.city = city;
      if (state) updatedData.state = state;
      if (complement) updatedData.complement = complement;
      if (number) updatedData.number = number;
      if (cep) updatedData.cep = cep;
      if (phone) updatedData.phone = phone;

      if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({ error: "No fields to update" });
      };

      const [result] = await adressesModel.updateAddress(client_id, address_id, updatedData);
      const doesClientHaveTable = result.affectedRows === 0 ? false : true;

      if(!doesClientHaveTable) {
        return res.status(400).json({ error: `Client ${client_id} does not have that address!` });
      }

      return res.json({ message: `Client ${client_id} updated address ${address_id} successfully!`});

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

  }

}

const addressesController = new AddressesController();
module.exports = addressesController;
