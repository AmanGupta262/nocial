const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthenticated, usersController.profile);
router.get('/posts', usersController.posts);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create);

// use passport as middleware for authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;