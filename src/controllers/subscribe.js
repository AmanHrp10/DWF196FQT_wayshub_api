const { Subscribe, Channel, Video } = require('../../models');
const Joi = require('joi');

//? Add subscribe
exports.addSubscribe = async (req, res) => {
  try {
    const { id } = req.id;
    const { body } = req;

    const isChannel = await Channel.findOne({
      where: {
        id: body.channelId,
      },
    });

    //? Handle subscribe yourself
    if (id === body.channelId) {
      return res.status(500).send({
        status: 'Request failed',
        message: 'Cannot subscribe channel yourself',
      });
    }
    //? Check existed of channel
    if (!isChannel) {
      return res.status(404).send({
        status: 'Request failed',
        message: 'Channel not found',
      });
    }

    //? Validation
    const schema = Joi.object({
      channelId: Joi.number().integer().required(),
    });

    const { error } = schema.validate(body, {
      abortEarly: false,
    });

    //! Error message
    if (error) {
      return res.status(500).send({
        status: 'Request failed',
        message: error.details.map((err) => err.message),
      });
    }

    //? Add subscribe
    await Subscribe.create({
      ...body,
      subsChannelId: id,
    });

    //? Get channel was subscribed
    const channel = await Channel.findOne({
      where: {
        id: body.channelId,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
    });

    res.status(201).send({
      status: 'Request success',
      message: 'Subscribe was added',
      count: channel.length,
      data: {
        subscribe: {
          channel,
        },
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

//? Unsubscribe
exports.removeSubscribe = async (req, res) => {
  try {
    //? Init id Channel & Subscribtion
    const { id: subsChannelId } = req.id;
    const { id: channelId } = req.params;

    //? Filter Subscribe
    const subscribtion = await Subscribe.findOne({
      where: {
        channelId,
        subsChannelId,
      },
    });
    console.log(channelId);

    //! if ID not match on params
    if (!subscribtion) {
      return res.status(404).send({
        status: 'Request failed',
        message: 'Resource not found',
      });
    }

    //? Delete action
    subscribtion.destroy();

    //? Response
    res.status(200).send({
      status: 'Request success',
      message: 'Unsubscribed',
      data: {
        id: channelId,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Request failed',
      message: err.message,
    });
  }
};

//? Get My subscribe
exports.getSubscribers = async (req, res) => {
  try {
    const { id } = req.id;
    const subscribtion = await Channel.findOne({
      where: {
        id,
      },
      include: {
        model: Channel,
        as: 'subscribers',
        through: {
          attributes: [],
        },
        include: {
          model: Video,
          as: 'videos',
          attributes: {
            exclude: ['updatedAt', 'channelId', 'ChannelId'],
          },
        },
      },
    });

    if (!subscribtion) {
      return res.status(404).send({
        status: 'Request failed',
        message: "don't have a subscriber",
      });
    }

    res.status(200).send({
      status: 'Request succes',
      message: 'Subscribtion was fetching',
      data: {
        subscribtion: subscribtion.subscribers.map((video) => video.videos),
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};
