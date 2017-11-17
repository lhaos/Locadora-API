/**
* Call the routes separately so they are all used from the same file
**/
const router = require('express').Router();

router.use(require('./movies'));
router.use(require('./users'));
router.use(require('./rents'));

module.exports = router;
