// const { Comment, Channel } = require('../../models');

// exports.getAllComment = async (req, res) => {
//   try {
//     const comments = await Comment.findAll({
//       attributes: {},
//       include: {
//         model: Channel,
//         as: 'channels',
//       },
//     });
//   } catch (err) {
//     res.status(500).send({
//       status: 'fetching failed',
//       error: err.message,
//     });
//   }
// };
