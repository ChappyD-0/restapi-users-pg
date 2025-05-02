const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const envConfigs = require('../config/config');  // ajusta la ruta si es distinta

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const cfg = envConfigs[env];

let sequelize;
if (cfg.url) {
  // extrae la URL y pasa el resto de opciones (incluye dialectOptions.ssl)
  const { url, ...options } = cfg;
  sequelize = new Sequelize(url, options);
} else {
  // en caso de que no uses URL, toma database/user/pass + opciones
  const { database, username, password, ...options } = cfg;
  sequelize = new Sequelize(database, username, password, options);
}

// prueba de conexión en runtime
sequelize.authenticate()
  .then(() => console.log('✅ DB connected (runtime)'))
  .catch(err => console.error('❌ DB connection error:', err));

const db = {};

// carga todos los modelos del directorio
fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  ))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// si alguno define asociaciones, las ejecuta
Object.keys(db).forEach(name => {
  if (db[name].associate) {
    db[name].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
