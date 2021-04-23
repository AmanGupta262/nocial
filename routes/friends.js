const express = require('express');
const router = express.Router();
const friendsController = require('../controllers/friends_controller');

router.post('/add-friend/:id', friendsController.addFriend);

module.exports = router;