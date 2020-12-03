const express = require('express');
const router = express.Router();

//? Require Module
const { getChannelsAll, getChannelById } = require('../controllers/channelSub');

router.get('/channels', getChannelsAll);
router.get('/channels/:id', getChannelById);

module.exports = router;
