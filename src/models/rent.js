/**
* Model based on the use of sequelize to query data in the database
**/
const {Sequelize, connection} = require('./../provider/sequelize');

const Rent = connection.define('rent', {
  rent_date : Sequelize.DATE,
  expected_date : Sequelize.DATE,
  return_date : Sequelize.DATE,
  returned: Sequelize.BOOLEAN,
  client_id: Sequelize.INTEGER,
  movie_id: Sequelize.INTEGER
}, {
  timestamps: false
});

module.exports = {Rent};
