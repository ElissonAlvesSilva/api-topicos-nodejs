'use strict'
const upload = require('../util/storage.util');

module.exports = app => {

    let controller = require('../controllers/candidato.controller');


    app.route('/v1/candidatos');

    app.route('/v1/candidatos/:id');

    app.route('/v1/candidatos/auth/candidato')



};