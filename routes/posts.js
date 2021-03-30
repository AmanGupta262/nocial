const express = require('express');
const router = express.Router();
const passport = require('passport')

const postsController = require('../controllers/posts_controller');

router.post('/create', passport.checkAuthenticated, postsController.createPost);
router.get('/destroy/:id', passport.checkAuthenticated, postsController.destroy);

module.exports = router;