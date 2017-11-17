/**
* Services available for movies
**/
const router = require('express').Router();
const passport = require('passport');
const {Movie} = require('./../models/movie');

/**
* Search all the movies in the database and test your quantity to find out
* if the movie is available for rent
**/
const allMovies = function(){
  return new Promise(function(resolve, reject){
    Movie.all().then(function(movies){
      if (movies.length === 0 || !movies) {
        resolve('Não há filmes disponiveis no momento.');
      }else{
        for (const movie of movies) {
          movie.dataValues.available = (movie.amount > 0);
        }
      }
      resolve(movies);
    }).catch(function(err) {
      reject(err);
    });
  });
};

/**
* Specifically search for a movie by its title
**/
const findMovie = function(data){
  return new Promise(function(resolve, reject){
    Movie.findOne({
      where: {
        title: data.title
      }
    }).then(function(movie){
      resolve(movie);
    }).catch(function(err) {
      reject(err);
    });
  });
};

module.exports = {
  allMovies: allMovies,
  findMovie: findMovie
}
