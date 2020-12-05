const express = require('express');
const router = express.Router();

//? Require middleware

const { auth: Private } = require('../middleware/auth');

//? Require Module
const {
  getChannelsAll,
  getChannelById,
  editChannel,
  deleteChannel,
} = require('../controllers/channelSub');

router.get('/channels', getChannelsAll);
router.get('/channel/:id', getChannelById);
router.patch('/channel/:id', Private, editChannel);
router.delete('/channel/:id', Private, deleteChannel);

module.exports = router;
