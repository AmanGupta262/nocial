const express = require('express');
const router = express.Router();
const passport = require('passport');

const usersController = require('../controllers/users_controller');

router.get('/profile/:id', passport.checkAuthenticated, usersController.profile);
router.get('/sign-in', usersController.signIn);
router.get('/sign-up', usersController.signUp);
router.post('/create', usersController.create);
router.post('/update/:id', usersController.update);

// use passport as middleware for authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect : '/users/sign-in'}
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

// google oauth2
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/users/sign-in'}), usersController.createSession);
router.get('/forgot-password', usersController.forgotPassword);
router.post('/reset-password', usersController.resetPassword);

module.exports = router;