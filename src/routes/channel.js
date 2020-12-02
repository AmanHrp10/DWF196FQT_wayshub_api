const express = require('express');
const router = express.Router();

const { getChannelsAll, getChannel } = require('../controllers/channel');

router.get('/channel', getChannelsAll);
router.get('/channel/:id', getChannel);

module.exports = router;
