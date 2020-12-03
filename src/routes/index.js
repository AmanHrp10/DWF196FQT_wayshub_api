const express = require('express');
const router = express.Router();

//? Require Module
const { getVideoAll, getVideoById } = require('../controllers/video');

const { getCommentAllByVideo } = require('../controllers/comment');

//? Video routes
router.get('/videos', getVideoAll);
router.get('/video/:id', getVideoById);
//? Comment routes
router.get('/video/:id/comments', getCommentAllByVideo);

module.exports = router;
