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
      res.status(404).send({
        status: 'Request success',
        message: `Data not found`,
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
      message: err.message,
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
      res.status(404).send({
        status: 'Request success',
        message: `Data not found`,
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
        error: 'Server error',
      },
    });
  }
};

//? Add video
exports.addVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    // const channel = await Channel.findOne({ where: { id } });

    const newVideo = await Video.create({
      title: body.title,
      thumbnail: body.thumbnail,
      description: body.description,
      video: body.video,
      viewCount: 0,
      channelId: body.channelId, // on Video using channel.id
    });

    const video = await Video.findOne({
      where: {
        id: newVideo.id,
      },
      attributes: {
        exclude: ['updatedAt', 'channelId', 'ChannelId'],
      },
      include: {
        model: Channel,
        as: 'channel',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    });
    res.status(200).send({
      status: 'Request success',
      message: 'Video succesfully Added',
      data: {
        video,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: 'Request failed',
      message: {
        error: 'Server error',
      },
    });
  }
};

//? Update video
exports.updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const detailVideo = await Video.findOne({ where: { id } });

    if (!detailVideo) {
      return res.status(404).send({
        status: 'Request failed',
        message: `Video with id ${id} not found`,
        data: [],
      });
    }

    await Video.update(body, { where: { id } });

    const videoUpdated = await Video.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'ChannelId', 'channelId'],
      },
      include: {
        model: Channel,
        as: 'channel',
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      },
    });

    //? Response Video after updated
    res.status(200).send({
      status: 'Request success',
      message: 'Video succesfully updated',
      data: {
        video: videoUpdated,
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


//? Delete video
exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideo = await Video.destroy({
      where: { id },
    });

    //? Response after deleted
    res.status(200).send({
      status: 'Request success',
      message: 'Video succesfully deleted',
      data: {
        video: deletedVideo,
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
