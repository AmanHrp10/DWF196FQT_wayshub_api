const Joi = require('joi');
const { Channel } = require('../../models');

//? Get all channels
exports.getChannelsAll = async (req, res) => {
  try {
    const channels = await Channel.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
      include: {
        model: Channel,
        as: 'subscribers',
        attributes: {
          through: 'Subscribes',
          exclude: ['createdAt', 'updatedAt', 'password', 'Subscribes'],
        },
      },
    });
    if (!channels) {
      res.send({
        status: 'Request success',
        message: 'Data not found',
        count: channels.length,
        data: {
          channels,
        },
      });
    }
    res.send({
      status: 'Data fetched',
      message: 'Data succesfully fetched',
      count: channels.length,
      data: {
        channels,
      },
    });
  } catch (err) {
    res.send({
      status: 'Request failed',
      message: 'Server error',
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
        exclude: ['updatedAt', 'createdAt', 'password'],
      },
      include: {
        model: Channel,
        as: 'subscribers',
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt', 'Subscribes'],
        },
      },
    });
    if (!channel) {
      res.send({
        status: 'Request success',
        message: 'Data not found',
        data: {
          channel,
        },
      });
    }
    res.send({
      status: 'Request success',
      message: 'Data succesfully fetched',
      data: {
        channel,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

//? Edit

exports.editChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;

    const schema = Joi.object({
      email: Joi.string().min(10).email(),
      channelName: Joi.string().min(2),
      description: Joi.string(),
    });

    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).send({
        status: 'Request failed',
        message: error.details.map((err) => err.message),
      });
    }

    await Channel.update(body, { where: { id } });

    const channelUpdated = await Channel.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });
    res.status(200).send({
      status: 'Request succes',
      message: 'Channel was updated',
      data: {
        channel: channelUpdated,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

//? Delete
exports.deleteChannel = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedChannel = await Channel.destroy({ where: { id } });

    res.status(200).send({
      status: 'Request succes',
      message: 'Channel was deleted',
      data: {
        channel: deletedChannel,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Request failed',
      message: err.message,
    });
  }
};
