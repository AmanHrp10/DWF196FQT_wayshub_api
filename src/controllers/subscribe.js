const { Subscribe, Channel } = require('../../models');

exports.addSubscriber = async (req, res) => {
  try {
    const subscribers = await Subscribe.create(body);
  } catch (err) {
    res.status(500).send({
      status: 'Request failed',
      message: {
        error: err.message,
      },
    });
  }
};
