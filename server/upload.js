const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'civic-report', // your app name
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});

module.exports = multer({ storage });