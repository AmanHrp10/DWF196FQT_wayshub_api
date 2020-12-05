const { Subscribe, Channel } = require('../../models');

//? Add subscribe
exports.addSubscribe = async (req, res) => {
  try {
    const { body } = req;
    const subscribe = await Subscribe.create(body, {
      channelId: body.channelId,
    });

    res.status(201).send({
      status: 'Request success',
      message: 'Subscribe was added',
      count: subscribe.length,
      data: {
        subscribe,
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
    const { id } = req.params;
    const removeSub = await Subscribe.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: 'Request succes',
      message: 'Succes to unSubscribe',
      data: {
        id: removeSub,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Request failed',
      message: 'Server error',
    });
  }
};

//? Get My subscribe
exports.getSubscribers = async (req, res) => {
  try {
    const subscribtion = await Channel.findAll({
      include: {
        model: Channel,
        as: 'channels',
      },
    });

    res.status(200).send({
      status: 'Request succes',
      message: 'Subscribtion was fetching',
      data: {
        subscribtion,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Request failed',
      message: err.message,
    });
  }
};
