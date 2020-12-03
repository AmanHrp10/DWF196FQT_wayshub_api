const express = require('express');
const router = express.Router();

//? Require Module
const { getChannelAll, getChannelById } = require('../controllers/channel');
const { getVideoAll } = require('../controllers/video');
const { getAllChannels } = require('../controllers/channelSub');

//? Channel Routes
// router.get('/channels', getChannelAll);
// router.get('/channel/:id', getChannelById);

//? Video routes
router.get('/videos', getVideoAll);

//? Channel Subcribe relation routes
router.get('/channels', getAllChannels);

module.exports = router;
