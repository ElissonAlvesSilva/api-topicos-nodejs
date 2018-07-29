'use strict';

const mongoose = require('mongoose');
const {
    ObjectId
} = require('mongodb');

const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid');

const empresa = mongoose.model('empresa');
const Empresa = require('./../class/empresa.class');


exports.listar = (req, res) => {
    empresa.find({}).then((data) => {
        res.send({
            empresas: data
        });
    }).catch((err) => {
        res.status(400).send(err);
    });
};

exports.lista_por_id = (req, res) => {

    let _id = req.params.id;

    if (!ObjectId.isValid(_id)) {
        return res.status(404).send();
    }
    empresa.findById(_id).then((data) => {
        if (!data) {
            return res.status(404).send();
        }
        res.send({
            empresa: data
        });
    }).catch((err) => {
        return res.status(400).send(err);
    });
};

exports.criar_empresa = (req, res) => {
    if (!validaCampos(req, res)) {
        empresa.findOne({
            cnpj: req.body.cnpj
        }).then(exist => {

            if (!exist) {

                let imageUrl;
                if (req.body.foto !== undefined && req.body.foto !== '')
                    imageUrl = decode_base64(req.body.foto, req.body.filename, res);
                else
                    imageUrl = undefined;

                let emp = new Empresa(req.body, imageUrl);
                let jsonObject = JSON.parse(emp.createPost());
                empresa.create(jsonObject)
                    .then(data => {
                        res.send({
                            empresa: data
                        });
                    })
                    .catch(error => {
                        res.status(400).send(error);
                    });
            } else {
                res.status(404).send({
                    message: 'empresa já cadastrada'
                });
            }
        });
    }

};


module.exports.atualiza = (req, res) => {
    let _id = req.params.id;
    if (!ObjectId.isValid(_id)) {
        return res.status(404).send();
    }
    let imageUrl;
    if (req.body.foto !== undefined && req.body.foto !== '')
        imageUrl = decode_base64(req.body.foto, req.body.filename, res);
    else
        imageUrl = undefined;

    let emp = new Empresa(req.body, imageUrl);
    let jsonObject = JSON.parse(emp.createPost());
    empresa.findByIdAndUpdate(_id, {
        $set: jsonObject
    }, {
        new: true
    }).then((data) => {

        if (!data) {
            return res.status(404).send();
        }

        res.send({
            empresa: data
        });
    }).catch(err => res.status(400).send(err));
};

module.exports.remove = (req, res) => {
    let _id = req.params.id;
    if (!ObjectId.isValid(_id)) {
        return res.status(404).send();
    }
    empresa.findOneAndRemove(_id).then(data => {
        if (!data) {
            return res.status(404).send();
        }
        res.send(data);
    }).catch(err => res.status(400).send());
}

function decode_base64(base64str, _filename, response) {
    var buf = Buffer.from(base64str, 'base64');
    let ext = 'jpg';
    let filename = uuid.v4() + '.' + ext;
    let err;
    fs.writeFile(path.join(__dirname, '../public/img/empresa', filename), buf, function (error) {
        if (error) {

            err = true;
        } else {
            err = false;
        }
    });

    if (err !== true)
        return 'img/empresa/' + filename;
    else {
        response.status(404).send({
            status: 'erro',
            mensagem: 'Erro ao converter imagem'
        });
    }

}

function validaCampos(request, response) {
    let erro = true;
    request.assert('cnpj', 'O cnpj é obrigatório').notEmpty();
    request.assert('razaoSocial', 'O razaoSocial é obrigatório').notEmpty();
    request.assert('nomeFantasia', 'O nomeFantasia é obrigatório').notEmpty();
    request.assert('status', 'O status é obrigatório').notEmpty();

    let erros = request.validationErrors();

    if (erros) {
        response.status(404).send({
            status: 'erro',
            mensagem: 'Erro ao cadastrar empresa',
            stack: erros
        });
        return erro;
    } else {
        erro = false;
        return erro;
    }
}