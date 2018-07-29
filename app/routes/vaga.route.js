'use strict'
const upload = require('./../utils/storage.util');

module.exports = app => {

    let controller = require('../controllers/vaga.controller');


    app.route('/v1/vagas');

    app.route('/v1/vagas/:id');




};