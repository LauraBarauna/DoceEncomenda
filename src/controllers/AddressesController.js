const adressesModel = require('../models/AddressesModel');

function AddressesController() {
  this.store = async function (req, res) {
    const { client_id } = req.params;
    let { label, street, city, state, complement, number, cep, phone } = req.body;

    console.log(`label ${label}`)

    if(!label || !street || !city || !state || !cep || !phone) {
      return res.status(500).json({error: `Fields: Label, street, city, state, cep and phone are requerid!`});
    };

    if (complement === undefined) complement = null;
    if (number === undefined) number = null;

    try {
      const newAddress = await adressesModel.createAddress(label, street, city, state, complement, number, cep, phone, client_id);
      res.status(201).json({ message: `Address ${label} created successfully!` });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  this.show = async function (req, res) {
    const { client_id } = req.params;

    try {
      const clietsAddresses = await adressesModel.showClientAddresses(client_id);

      if( !clietsAddresses || clietsAddresses.length === 0 ) {
        return res.status(404).json({ error: `Client ${client_id} does not exist or does not have an addresses!` });
      }

      return res.status(200).json(clietsAddresses);

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

}

const addressesController = new AddressesController();
module.exports = addressesController;
