const express = require('express');
const router = express.Router();

//? Require Module
// const { getChannelsAll, getChannelById } = require('../controllers/channelSub');

const { auth: Private } = require('../middleware/auth');
const {
  addSubscribe,
  removeSubscribe,
  getSubscribers,
} = require('../controllers/subscribe');

// router.get('/channels', getChannelsAll);
// router.get('/channels/:id', getChannelById);
router.post('/subscribe', addSubscribe);
router.delete('/subscribe/:id', addSubscribe);
router.get('/subscribes', Private, getSubscribers);

module.exports = router;
