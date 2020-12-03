const { Channel, Subscribe } = require('../../models');

//? Get all channels
exports.getChannelsAll = async (req, res) => {
  try {
    const channels = await Channel.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      include: {
        model: Channel,
        as: 'subscribers',
        through: {
          attributes: [],
        },
      },
    });
    if (!channels) {
      res.status(400).send({
        status: 'Request success',
        message: 'Data not found',
        count: channels.length,
        data: {
          channels,
        },
      });
    }
    res.status(200).send({
      status: 'Data fetched',
      message: 'Data succesfully fetched',
      count: channels.length,
      data: {
        channels,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: 'Server error',
      message: {
        error: err.message,
      },
    });
  }
};

//? Get data by id

exports.getChannelById = async (req, res) => {
  try {
    const { id } = req.params;

    const channel = await Channel.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['updatedAt', 'createdAt'],
      },
      include: {
        model: Channel,
        as: 'subscribers',
        through: {
          attributes: [],
        },
        attributes: [
          'id',
          'email',
          'channelName',
          'description',
          'thumbnail',
          'photo',
        ],
      },
    });
    if (!channel) {
      res.status(400).send({
        status: 'Request success',
        message: 'Data not found',
        data: {
          channel,
        },
      });
    }
    res.status(200).send({
      status: 'Request success',
      message: 'Data succesfully fetched',
      data: {
        channel,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: 'Server error',
      message: {
        error: err.message,
      },
    });
  }
};
