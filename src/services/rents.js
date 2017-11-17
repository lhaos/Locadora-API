/**
* Services available for rental
**/
const router = require('express').Router();
const passport = require('passport');
const {User} = require('./../models/user');
const {Movie} = require('./../models/movie');
const {Rent} = require('./../models/rent');

/**
* Checks if the movie really exists and if it is available
* Update the number of available copies of the requested movie
* And create the rent record by setting a deadline of 1(one) week for return
**/
const loc = function(data){
  return new Promise(function(resolve, reject){
    Movie.findOne({
      where: {
        id: data.body.movie_id
      }
    }).then(function(movie){
      if (movie.length === 0 || !movie) {
        resolve(false);
      }
      if (movie.amount > 0) {
        var newAmount = movie.amount-1;
        movie.update(
          {
            amount: newAmount
          }
        ).then(function(movie){
          var date = new Date();
          var expectedDate = date.setDate(date.getDate() + 7);
          Rent.create({
            rent_date : date,
            expected_date : expectedDate,
            client_id: data.user.id,
            movie_id: data.body.movie_id
          }).then(function(rent){
            resolve(rent);
          }).catch(function(err) {
          reject(err);
          });
        }).catch(function(err){
          reject(err);
        });
      }else{
        resolve(true);
      }
    }).catch(function(err){
        reject(err);
    });
  });
};

/**
* Returns the movie in the rentals and returns its available amount in the movie table
**/
const giveBack = function(data){
  return new Promise(function(resolve, reject){
    Movie.findOne({
      where: {
        id: data.body.movie_id
      }
    }).then(function(movie){
      var newAmount = movie.amount+1;
      movie.update({
          amount: newAmount
        }).then(function(movie){
        Rent.findOne({
            where: {
              client_id: data.user.id,
              movie_id: movie.id
            }
          }).then(function(rent){
          var date = new Date();
          rent.update({
            return_date : date,
            returned : 1
          }).then(function(rent){
            resolve(rent);
          }).catch(function(err) {
            reject(err);
          });
        }).catch(function(err){
          reject(err);
        });
      }).catch(function(err){
        reject(err);
      });
    }).catch(function(err){
      reject(err);
    });
  });
};

module.exports = {
  loc: loc,
  giveBack: giveBack
}
