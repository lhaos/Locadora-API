/**
* Model based on the use of sequelize to query data in the database
**/
const {Sequelize, connection} = require('./../provider/sequelize');

const User = connection.define('client', {
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
  access_token: Sequelize.STRING
}, {
  timestamps: false
});

module.exports = {User};
