 const path = require('path');            // ← AÑADE ESTA LÍNEA
 const cors = require('cors');
 const express = require('express');
const routes = require('../routes');


const server = express();

server.use(express.static(path.join(__dirname, '../public')));
server.use('/api', cors(), express.json(), routes);
const PORT = process.env.PORT || 3000; // Definir el puerto con variable de entorno o 3000 por defecto

const corsOptions = {
  
  origin: [
    'https://restapi-users-pg-1w1b.onrender.com', // URL frontend
    'http://localhost:8080' // Desarrollo
  ],// Origen frontend
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization'
};

server.use(cors(corsOptions)); // Habilita CORS para todas las rutas
server.options('*', cors(corsOptions)); //Habilita CORS para preflight requests

server.use(express.json());
server.use('/api', routes);

// Iniciar el servidor y escuchar en el puerto definido


module.exports = server;

