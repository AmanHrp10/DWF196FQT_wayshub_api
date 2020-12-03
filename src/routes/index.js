const express = require('express');
const router = express.Router();

//? Require Module
const { getChannelAll, getChannelById } = require('../controllers/channel');
const { getVideoAll } = require('../controllers/video');
const {
  getAllChannels,
  getAllSubscriber,
} = require('../controllers/channelSub');

// comment module
const { getAllComment } = require('../controllers/comment');
//? Channel Routes
// router.get('/channels', getChannelAll);
// router.get('/channel/:id', getChannelById);

//? Video routes
router.get('/videos', getVideoAll);

//? Channel Subscribe relation routes
router.get('/channels', getAllChannels);

//? Subscribe Channel Relation routes
router.get('/subscribes', getAllSubscriber);

//? Comment routes
router.get('/comments', getAllComment);

module.exports = router;
