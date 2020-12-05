const express = require('express');
const router = express.Router();


const { auth: Private } = require('../middleware/auth');
const {
  addSubscribe,
  removeSubscribe,
  getSubscribers,
} = require('../controllers/subscribe');
const { getVideoAll, getVideoById } = require('../controllers/video');
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');
const {
  getChannelsAll,
  getChannelById,
  editChannel,
  deleteChannel,
} = require('../controllers/channelSub');

//? Susbcribe routes
router.post('/subscribe', addSubscribe);
router.delete('/subscribe/:id', removeSubscribe);
router.get('/subscribes', Private, getSubscribers);

//? Video routes
router.get('/videos', auth, getVideoAll);
router.get('/video/:id', getVideoById);

//? Register & Login route
router.post('/registers', register);
router.post('/login', login);

//? channel routes
router.get('/channels', getChannelsAll);
router.get('/channel/:id', getChannelById);
router.patch('/channel/:id', Private, editChannel);
router.delete('/channel/:id', Private, deleteChannel);

module.exports = router;
