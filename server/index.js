const path = require('path');
const cors = require('cors');
const express = require('express');
const routes = require('../routes');

const server = express();

// 1) Configuración de CORS
const corsOptions = {
  origin: [
    'https://restapi-users-pg-1w1b.onrender.com',  // tu front en Render
    'http://localhost:8080'                        // tu dev local
  ],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true
};
server.use(cors(corsOptions));
server.options('*', cors(corsOptions));

// 2) Body parser y estáticos
server.use(express.json());
server.use(express.static(path.join(__dirname, '../public')));

// 3) Rutas API
server.use('/api', routes);

// 4) Middleware de errores
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = server;
