/**
* Defining Routes for Movies
* each route will call your specific service coming from src/services
**/
const router = require('express').Router();
const passport = require('passport');
const {Movie} = require('./../models/movie');
const movieService = require('./../services/movies');

router.get('/movies/findall', passport.authenticate('bearer', { session: false }), function(req, res) {
  try {
    movieService.allMovies()
      .then(function(movies){
        res.status(200).send(movies);
      })
      .catch(function(err){
        throw err;
      });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/movies/find', passport.authenticate('bearer', { session: false }), function(req, res) {
  try {
    movieService.findMovie(req.query)
      .then(function(movie){
        if (!movie) {
          res.status(404).send('Not found.');
        }
        res.status(200).send(movie);
      })
      .catch(function(err){
        throw err;
      });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
