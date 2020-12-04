const express = require('express');
const router = express.Router();

//? Require Module
const { getVideoAll, getVideoById } = require('../controllers/video');

const {
  getAllCommentsByVideoId,
  getCommentById,
} = require('../controllers/comment');

//? Video routes
router.get('/videos', getVideoAll);
router.get('/video/:id', getVideoById);

//? Comment routes
router.get('/video/:id/comments', getAllCommentsByVideoId);
router.get('/video/:id/comment/:id', getCommentById);

module.exports = router;
