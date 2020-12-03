const { Video, Channel } = require('../../models');
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
    if (!videos) {
      res.status(404).send({
        status: 'failed to fetching data',
        message: `data is null`,
        count: videos.length,
        data: {
          videos,
        },
      });
    }
    res.status(200).send({
      status: 'Data fetched',
      message: 'Videos succesfully fetched',
      count: videos.length,
      data: {
        videos,
      },
    });
  } catch (err) {
    res.status(500).send({
      error: {
        message: err.message,
      },
    });
  }
};
