const express = require('express');
const router = express.Router();

//? Require Auth

const { auth } = require('../middleware/auth');

//? Require Module
const { getVideoAll, getVideoById } = require('../controllers/video');

const { register } = require('../controllers/register');
const { login } = require('../controllers/login');

// const { getAllComment } = require('../controllers/comment');

//? Video routes
router.get('/videos', auth, getVideoAll);
router.get('/video/:id', getVideoById);
//? Comment routes
// router.get('/comments', getAllComment);

//? Register route

router.post('/registers', register);
router.post('/login', login);

module.exports = router;
