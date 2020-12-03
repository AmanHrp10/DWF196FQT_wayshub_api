const { Channel, Subscribe } = require('../../models');

//! Channel hasMany Subscriber

exports.getAllChannels = async (req, res) => {
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
      error: {
        message: err.message,
      },
    });
  }
};

//! Subscribe hasMany Channel

exports.getAllSubscriber = async (req, res) => {
  try {
    const subscribers = await Subscribe.findAll({
      attributes: [],
      include: {
        model: Channel,
        as: 'channels',
        through: { attributes: [] },
      },
    });
    res.status(200).send({
      status: 'Data fetched',
      message: 'Data was successfully fetched',
      count: subscribers.length,
      subscribers,
    });
  } catch (err) {
    res.status(500).send({
      error: {
        message: err.message,
      },
    });
  }
};
