const express = require('express');
const router = express.Router();

//? Require Auth

const { auth: Private } = require('../middleware/auth');
const {
  addSubscribe,
  removeSubscribe,
  getSubscribers,
} = require('../controllers/subscribe');

const { getVideoAll, getVideoById } = require('../controllers/video');

const { register } = require('../controllers/register');
const { login } = require('../controllers/login');

//? Susbcribe routes
router.post('/subscribe', addSubscribe);
router.delete('/subscribe/:id', addSubscribe);
router.get('/subscribes', Private, getSubscribers);

//? Video routes
router.get('/videos', auth, getVideoAll);
router.get('/video/:id', getVideoById);
//? Comment routes
// router.get('/comments', getAllComment);

//? Register route

router.post('/registers', register);
router.post('/login', login);

module.exports = router;
