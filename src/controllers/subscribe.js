const { Subscribe, Channel } = require('../../models');

exports.addSubscribe = async (req, res) => {
  try {
    const { body } = req;
    const subscribe = await Subscribe.create({
      channelId: body.channel,
    });

    res.status(201).send({
      status: 'Request success',
      message: 'Data was created',
      count: subscribe.length,
      data: {
        subscribe,
      },
    });
  } catch (err) {
    return res.status(500).send({
      status: 'Request failed',
      message: 'Created subscribe failed',
    });
  }
};
