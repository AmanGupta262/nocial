const express = require('express');
const { route } = require('./users');
const router = express.Router();
const passport = require('passport')

const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthenticated, postsController.createPost);

module.exports = router;