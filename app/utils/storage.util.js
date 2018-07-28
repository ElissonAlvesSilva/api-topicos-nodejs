'use strict'
const multer = require('multer');
const uuid = require('node-uuid');

/* STORAGE */

/* CV */
const storage_cv = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './app/public/doc');
    },
    filename: (request, file, callback) => {
        let ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
        let filename = uuid.v4() + '.' + ext;
        callback(null, filename);
    }
});

/* FILTER */

const fileFilter_cv = (request, file, callback) => {
    if (
        file.mimetype === 'application/pdf' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'application/msword') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

exports.upload_cv = multer({
    storage: storage_cv,
    fileFilter: fileFilter_cv
});
