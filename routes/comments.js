const express = require('express');
const router = express.Router();
const passport = require('passport')

const commentssController = require('../controllers/comments_controller');

router.post('/create', passport.checkAuthenticated, commentssController.addComment);
router.get('/destroy/:id', passport.checkAuthenticated, commentssController.destroy);

module.exports = router;