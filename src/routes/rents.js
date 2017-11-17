/**
* Definition of routes for rental
* Each route will call your specific service coming from src/services
**/
const router = require('express').Router();
const passport = require('passport');
const {User} = require('./../models/user');
const {Movie} = require('./../models/movie');
const {Rent} = require('./../models/rent');
const rentService = require('./../services/rents');

router.post('/client/rent', passport.authenticate('bearer', { session: false }), function(req, res) {
  try {
    rentService.loc(req)
      .then(function(rent){
        if (!rent) {
          res.status(404).send('Movie not found.');
        }else if (rent === true) {
          res.status(409).send('Movie unavailable.');
        }
        res.status(200).send(rent);
      })
      .catch(function(err){
        throw err;
      });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

/**
* After the return, the delivery date is tested to check for delay
* In case of delay an extra field is generated and sent informing the number of the
* days the movie was delayed
**/
router.patch('/client/rent', passport.authenticate('bearer', { session: false }), function(req, res) {
  try {
    rentService.giveBack(req)
      .then(function(rent){
        var expected_date = new Date(rent.expected_date);
        var return_date = new Date(rent.return_date);
        var delay = expected_date.getDate() - return_date.getDate();
        if (delay < 0) {
          delay = Math.abs(delay);
          rent.dataValues.delay = delay;
        }
        res.status(200).send(rent);
      })
      .catch(function(err){
        throw err;
      });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = router;
