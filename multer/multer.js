const multer = require('multer');
const path = require('path');
const publicPath = path.join(__dirname, '../images');
const uuid4 = require('uuid4');

const upload = multer({
    storage: multer.diskStorage({
      filename(req, file, done) {
        const randomID = uuid4();
        const ext = path.extname(file.originalname);
        const filename = randomID + ext;
        done(null, filename);
      },
      destination(req, file, done) {
        done(null, path.join(__dirname, "../images"));
      },
    }),
  });
  const multerMiddleware = upload.single('profileImage');

module.exports = multerMiddleware;