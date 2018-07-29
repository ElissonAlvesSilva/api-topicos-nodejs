'use strict'
const upload = require('./../utils/storage.util');

module.exports = app => {

    let controller = require('../controllers/candidato.controller');


    app.route('/v1/candidatos')
        .get(controller.listar)
        .post(controller.criar_candidato);

    app.route('/v1/candidatos/:id')
        .get(controller.listar)
        .put(controller.atualiza);
        //.post(controller.candidatar);

    app.route('/v1/candidatos/auth/candidato')



};