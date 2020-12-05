const multer = require('multer');

exports.uploadFile = (thumbnail, video) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.fieldname === thumbnail) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: 'Only image files are allowed!',
        };
        return cb(new Error('Only image files are allowed!'), false);
      }
    }

    if (file.fieldname === video) {
      if (!file.originalname.match(/\.(mp4)$/)) {
        req.fileValidationError = {
          message: 'Only Video files are allowed!',
        };
        return cb(new Error('Only Video files are allowed!'), false);
      }
    }
    cb(null, true);
  };
  const maxSize = 10 * 1000 * 1000;

  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: maxSize },
  }).fields([
    { name: thumbnail, maxCount: 1 },
    { name: video, maxCount: 1 },
  ]);

  //? Middleware
  return (req, res, next) => {
    upload(req, res, (err) => {
      //! Error validation
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError);

      //! Error file not selected
      if (!req.files && !err)
        return res.status(400).send({
          message: 'Please select files to upload',
        });

      //! Error over size limits
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({
            message: 'Max file sized 10MB',
          });
        }
        return res.status(400).send(err);
      }
      //? Next to controller
      return next();
    });
  };
};
