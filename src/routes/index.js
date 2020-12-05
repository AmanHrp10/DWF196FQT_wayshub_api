const express = require('express');
const router = express.Router();

//? Middleware
const { auth: Private } = require('../middleware/auth');
const { uploadFile } = require('../middleware/upload');

//? Subscribtion
const {
  addSubscribe,
  removeSubscribe,
  getSubscribers,
} = require('../controllers/subscribe');

//? Register & Login
const { register } = require('../controllers/register');
const { login } = require('../controllers/login');

//? Channel
const {
  getChannelsAll,
  getChannelById,
  editChannel,
  deleteChannel,
} = require('../controllers/channelSub');

//? Video
const {
  getVideoAll,
  getVideoById,
  addVideo,
  updateVideo,
  deleteVideo,
} = require('../controllers/video');

//! Routers

//? Susbcribe routes
router.post('/subscribe', addSubscribe);
router.delete('/subscribe/:id', removeSubscribe);
router.get('/subscribes', Private, getSubscribers);

//? Register & Login route
router.post('/registers', register);
router.post('/login', login);

//? channel routes
router.get('/channels', getChannelsAll);
router.get('/channel/:id', getChannelById);
router.patch('/channel/:id', Private, editChannel);
router.delete('/channel/:id', Private, deleteChannel);

//? Video routes
router.get('/videos', auth, getVideoAll);
router.get('/video/:id', getVideoById);
router.post('/video', Private, uploadFile('thumbnail', 'video'), addVideo);
router.patch('/video/:id', Private, updateVideo);
router.delete('/video/:id', Private, deleteVideo);

module.exports = router;
