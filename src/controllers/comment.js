const { Video, Channel, Comment } = require('../../models');

exports.getCommentAllByVideo = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Video.findOne({
      where: {
        id,
      },
      attributes: [],
      include: {
        model: Comment,
        as: 'comments',
      },
    });
    res.status(200).send({
      status: 'Request success',
      message: 'Data successfully fetched',
      count: data.length,
      data,
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
