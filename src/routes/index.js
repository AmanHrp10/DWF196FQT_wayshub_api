const express = require('express');
const router = express.Router();

//? Require Module
const { auth: Private } = require('../middleware/auth');
const { uploadFile } = require('../middleware/upload');

const {
  getVideoAll,
  getVideoById,
  addVideo,
  updateVideo,
  deleteVideo,
} = require('../controllers/video');

// const { getAllComment } = require('../controllers/comment');

//? Video routes
router.get('/videos', getVideoAll);
router.get('/video/:id', getVideoById);
router.post('/video', Private, uploadFile('thumbnail', 'video'), addVideo);
router.patch('/video/:id', Private, updateVideo);
router.delete('/video/:id', Private, deleteVideo);
//? Comment routes
// router.get('/comments', getAllComment);

module.exports = router;
