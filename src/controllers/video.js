const { Video, Channel, Comment } = require('../../models');

//?  Get videos all
exports.getVideoAll = async (req, res) => {
  try {
    const videos = await Video.findAll({
      attributes: {
        exclude: ['channelId', 'updatedAt', 'ChannelId'],
      },
      include: {
        model: Channel,
        as: 'channel',
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'ChannelId',
            'subscribeId',
            'commentId',
          ],
        },
      },
    });
    if (videos.length === 0) {
      res.status(400).send({
        status: 'Request success',
        message: `Data not exist`,
        count: videos.length,
        data: {
          videos,
        },
      });
    }
    res.status(200).send({
      status: 'Request success',
      message: 'Data succesfully fetched',
      count: videos.length,
      data: {
        videos,
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

//? Get video by id
exports.getVideoById = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['channelId', 'updatedAt', 'ChannelId'],
      },
      include: [
        {
          model: Channel,
          as: 'channel',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
        {
          model: Comment,
          as: 'comments',
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt',
              'channelId',
              'videoId',
              'ChannelId',
              'VideoId',
            ],
          },
          include: {
            model: Channel,
            as: 'channel',
            attributes: {
              exclude: ['createdAt', 'updatedAt'],
            },
          },
        },
      ],
    });
    if (video.length === 0) {
      res.status(400).send({
        status: 'Request success',
        message: `Data not exist`,
        data: {
          video,
        },
      });
    }
    res.status(200).send({
      status: 'Request success',
      message: 'Data succesfully fetched',
      data: {
        video,
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
