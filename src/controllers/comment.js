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

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const newComment = await Comment.create({
      comment: body.comment,
      channelId: body.channelId,
      videoId: id,
    });

    const addComment = await Comment.findOne({
      where: {
        id: newComment.id,
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

    res.status(201).send({
      status: 'Request success',
      message: 'Comment was adding',
      data: {
        comment: addComment,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    //? Update
    await Comment.update(body, {
      where: {
        id,
      },
    });

    //? Show comment Updated
    const comment = await Comment.findOne({
      where: {
        id,
      },
      attributes: ['id', 'comment'],
      include: {
        model: Channel,
        as: 'channel',
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'password'],
        },
      },
    });
    res.status(200).send({
      status: 'Request success',
      message: 'Comment was updated',
      data: {
        comment,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.destroy({
      where: {
        id,
      },
    });
    res.status(200).send({
      status: 'Request success',
      message: 'Comment was Deleted',
      data: {
        comment,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};
