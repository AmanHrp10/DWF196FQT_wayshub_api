const { Channel } = require('../../models');

// * Get All Data

exports.getChannelsAll = async (req, res) => {
  try {
    const Channels = await Channel.findAll();
    if (Channels.length == 0) {
      res.status(404).json({
        status: 'Data empty',
        data: Channels,
      });
    }
    res.status(200).json({
      status: 'Fetched Success',
      data: {
        channels: Channels.map((item) => {
          return {
            id: item.id,
            name: item.email,
            channelName: item.channelName,
            description: item.description,
            thumbnail: item.thumbnail,
            photo: item.photo,
            subscribers: [],
            request: {
              method: 'GET',
              url: 'https:localhost:5000/api/v1/channel/' + item.id,
            },
          };
        }),
      },
    });
  } catch (err) {
    res.status(500).json({
      error: {
        message: 'server error: ' + err,
      },
    });
  }
};

// exports.getChannel = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = await Channel.find((item) => item.id == id);

//     if (!data) {
//       res.status(404).json({
//         status: 'Data not found',
//         data: data,
//       });
//     }
//     res.status(200).json({
//       status: 'Data Fetched',
//       data: data,
//     });
//   } catch (err) {
//     res.status(500).json({
//       error: {
//         message: err.message,
//       },
//     });
//   }
// };
