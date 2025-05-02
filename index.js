// index.js (en la raíz del proyecto)
require('dotenv').config();
const server = require('./server');

const PORT = process.env.PORT || 8083;
const env = process.env.NODE_ENV || 'development';
const dbUrl = env === 'production'
  ? process.env.DATABASE_URL
  : process.env.DEV_DATABASE_URL;

console.log(`Environment: ${env}`);
console.log(`Connecting to DB: ${dbUrl}`);
console.log(`Iniciando el servidor en el puerto ${PORT}…`);

server.listen(PORT, () => {
  console.log(`✅ Server live at http://0.0.0.0:${PORT}`);
});
