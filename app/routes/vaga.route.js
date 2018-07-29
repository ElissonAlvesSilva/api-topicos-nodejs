'use strict'
const upload = require('./../utils/storage.util');

module.exports = app => {

    let controller = require('../controllers/vaga.controller');


    app.route('/v1/vagas')
        .get(controller.listar)
        .post(controller.criar_vaga);

    app.route('/v1/vagas/:id')
        .get(controller.lista_por_id)
        .put(controller.atualiza)
        .delete(controller.remove);

};