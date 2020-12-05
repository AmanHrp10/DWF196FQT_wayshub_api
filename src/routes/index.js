const express = require('express');
const router = express.Router();

//? Require Module
const { auth: Private } = require('../middleware/auth');

const { getVideoAll, getVideoById } = require('../controllers/video');

const {
  getAllCommentsByVideoId,
  getCommentById,
  addComment,
  updateComment,
  deleteComment,
} = require('../controllers/comment');

//? Video routes
router.get('/videos', getVideoAll);
router.get('/video/:id', getVideoById);

//? Comment routes
router.get('/video/:id/comments', getAllCommentsByVideoId);
router.get('/video/:id/comment/:id', getCommentById);
router.post('/video/:id/comment', Private, addComment);
router.patch('/video/:id/comment/:id', Private, updateComment);
router.delete('/video/:id/comment/:id', Private, deleteComment);

module.exports = router;
