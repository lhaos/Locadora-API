/**
* Establish the connection to the database using the sequelize and settings
* arriving from src/config/db.js
**/
const Sequelize = require('sequelize');
const configDb = require('./../config/db');

const connection = new Sequelize(configDb.name, configDb.user, configDb.pass, {
  host: configDb.host,
  dialect: configDb.dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = {
  Sequelize: Sequelize,
  connection: connection
}
