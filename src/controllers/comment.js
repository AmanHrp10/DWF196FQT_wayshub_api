const { Video, Channel, Comment } = require('../../models');

exports.getAllCommentsByVideoId = async (req, res) => {
  try {
    const { id } = req.params;
    const videoById = await Video.findOne({ where: { id } });
    const commentsByVideo = await Comment.findAll({
      where: {
        videoId: id,
      },
      attributes: ['id', 'comment'],
      include: {
        model: Channel,
        as: 'channel',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    });
    if (commentsByVideo.length === 0) {
      res.status(400).send({
        status: 'Request success',
        message: 'Data not exist',
        count: commentsByVideo.length,
        data: {
          comments: commentsByVideo,
        },
      });
    }
    res.status(200).send({
      status: 'Request success',
      message: 'Data successfully fetching',
      count: commentsByVideo.length,
      data: {
        comments: commentsByVideo,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: 'Request failed',
      message: {
        error: err.message,
      },
    });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const videoById = await Video.findOne({ where: { id } });
    const comment = await Comment.findOne({
      where: {
        id,
      },
      attributes: ['id', 'comment'],
      include: {
        model: Channel,
        as: 'channel',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    });
    if (!comment) {
      res.status(400).send({
        status: 'Request success',
        message: 'Data not exist',
        data: {
          comment,
        },
      });
    }
    res.status(200).send({
      status: 'Request success',
      message: 'Data successfully fetching',
      data: {
        comment,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: 'Request failed',
      message: {
        error: err.message,
      },
    });
  }
};
