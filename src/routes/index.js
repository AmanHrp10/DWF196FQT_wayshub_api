const express = require('express');
const router = express.Router();

//? Require Module
const { getVideoAll, getVideoById } = require('../controllers/video');

// const { getAllComment } = require('../controllers/comment');

//? Video routes
router.get('/videos', getVideoAll);
router.get('/video/:id', getVideoById);
//? Comment routes
// router.get('/comments', getAllComment);

module.exports = router;
