'use strict'
const upload = require('./../utils/storage.util');

module.exports = app => {

    let controller = require('../controllers/empresa.controller');


    app.route('/v1/empresas')
        .get(controller.listar)
        .post(controller.criar_empresa);

    app.route('/v1/empresas/:id')
        .get(controller.lista_por_id)
        .put(controller.atualiza)
        .delete(controller.remove);




};