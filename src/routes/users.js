/**
* Definition of routes for clients/users
* Each route will call your specific service coming from src/services
**/
const router = require('express').Router();
const passport = require('passport');
const {Movie} = require('./../models/movie');
const {Rent} = require('./../models/rent');
const userService = require('./../services/users');

router.post('/auth', function(req, res, next) {
  try {
    userService.login(req.body)
      .then(function(user){
        if (!user) {
          res.status(404).send('Usuario ou senha invalidos');
        }
        res.status(201).send(user);
      })
      .catch(function(err){
        throw err;
      });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/auth', passport.authenticate('bearer', { session: false }), function(req, res, next) {
  userService.logout(req.user)
    .then(function(){
      res.status(204).send();
    })
    .catch(function(err){
      res.status(400).send(err.message);
    });
});

router.post('/client/new', function(req, res, next){
  try {
    userService.create(req.body)
      .then(function(user){
        if (!user) {
          res.status(404).send('Usuario ou senha invalidos');
        }
        res.status(201).send(user);
      })
      .catch(function(err){
        throw err;
      });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
