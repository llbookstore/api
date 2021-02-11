const multer = require('multer');
const path = require('path');
const { returnError } = require('../utils/common');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(new Error('unsupported file'), false);
    }
}
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 10 }
});

const errHandling = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.json(returnError(401,err.message,{}, req.path));
        // A Multer error occurred when uploading.
    } else if (err) {
        return res.json(returnError(401,err.message,{}, req.path));
        // An unknown error occurred when uploading.
    }
    // Everything went fine.
}

module.exports = {
    upload,
    errHandling
};