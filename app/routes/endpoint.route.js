'use strict'


module.exports = app => {

    const controller = require('./../controllers/endpoit.controller');

    app.route('/v1/endpoints')
        .post(controller.endpoint);


};