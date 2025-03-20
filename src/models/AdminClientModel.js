async function updateClientAndAdmin(clientId, data) {
  const clientModel = require("./ClientModel"); // Importação atrasada
  const adminModel = require("./AdminModel");

  const adminId = await clientModel.getAdminId(clientId);

  if (adminId !== null) {
      await adminModel.updateAdmin(adminId, data);
  }

  return clientModel.updateCliente(clientId, data);
}

async function updateAdminAndClient(adminId, data) {
  const clientModel = require("./ClientModel"); // Importação atrasada
  const adminModel = require("./AdminModel");

  const clientId = await adminModel.getClientId(adminId);

  if (clientId !== null) {
      await clientModel.updateCliente(clientId, data);
  }

  return adminModel.updateAdmin(adminId, data);
}

module.exports = { updateClientAndAdmin, updateAdminAndClient };
