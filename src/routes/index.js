const express = require('express');
const router = express.Router();

//? Require Module
const { getAllChannels } = require('../controllers/channelSub');

router.get('/channels', getAllChannels);

module.exports = router;
