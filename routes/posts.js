const express = require('express');
const { route } = require('./users');
const router = express.Router();

const postsController = require('../controllers/posts_controller');

// route.post('/create', postsController.createPost);