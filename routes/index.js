const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log("Router loaded");

router.get('/', homeController.home);
router.use('/users', require('./users'));

// for any further routes
// router.use('/routernme', require('./routefile'));

module.exports = router;