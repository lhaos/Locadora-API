/**
* Model based on the use of sequelize to query data in the database
**/
const {Sequelize, connection} = require('./../provider/sequelize');

const Movie = connection.define('movie', {
  title: Sequelize.STRING,
  director: Sequelize.STRING,
  amount: Sequelize.INTEGER
}, {
  timestamps: false
});

module.exports = {Movie};
