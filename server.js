const app = require('./App');
const PORT = 3007;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
})
