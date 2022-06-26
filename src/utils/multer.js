const multer = require('multer');
const path = require('path');
const fs = require('fs');

const questionDir = './uploads/questions';
const userDir = './uploads/users';
const examDir = './uploads/exams';

var storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await createDestination(questionDir);
    await createDestination(userDir);
    await createDestination(examDir);
    cb(null, path.join(questionDir));
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

async function createDestination(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

const upload = multer({ storage: storage });
module.exports = upload;
