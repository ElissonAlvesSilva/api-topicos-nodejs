'use strict';

const mongoose = require('mongoose');
const {
    ObjectId
} = require('mongodb');

const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid');

const vaga = mongoose.model('vagas');
const Vaga = require('./../class/vaga.class');


exports.listar = (req, res) => {
    vaga.find({}).then((data) => {
        res.send({
            vagas: data
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
    vaga.findById(_id).then((data) => {
        if (!data) {
            return res.status(404).send();
        }
        res.send({
            vaga: data
        });
    }).catch((err) => {
        return res.status(400).send(err);
    });
};

exports.criar_vaga = (req, res) => {
    if (!validaCampos(req, res)) {
        let imageUrl;
        if (req.body.foto !== undefined && req.body.foto !== '')
            imageUrl = decode_base64(req.body.foto, req.body.filename, res);
        else
            imageUrl = undefined;

        let vag = new Vaga(req.body, imageUrl);
        let jsonObject = JSON.parse(vag.createPost());
        vaga.create(jsonObject)
            .then(data => {
                res.send({
                    vaga: data
                });
            })
            .catch(error => {
                res.status(400).send(error);
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

    let vag = new vaga(req.body, imageUrl);
    let jsonObject = JSON.parse(vag.createPost());
    vaga.findByIdAndUpdate(_id, {
        $set: jsonObject
    }, {
        new: true
    }).then((data) => {

        if (!data) {
            return res.status(404).send();
        }

        res.send({
            vaga: data
        });
    }).catch(err => res.status(400).send(err));
};

module.exports.remove = (req, res) => {
    let _id = req.params.id;
    if (!ObjectId.isValid(_id)) {
        return res.status(404).send();
    }
    vaga.findOneAndRemove(_id).then(data => {
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
    fs.writeFile(path.join(__dirname, '../public/img/vaga', filename), buf, function (error) {
        if (error) {

            err = true;
        } else {
            err = false;
        }
    });

    if (err !== true)
        return 'img/vaga/' + filename;
    else {
        response.status(404).send({
            status: 'erro',
            mensagem: 'Erro ao converter imagem'
        });
    }

}

function validaCampos(request, response) {
    let erro = true;
    request.assert('nome', 'O nome é obrigatório').notEmpty();
    request.assert('tipoContrato', 'O tipoContrato é obrigatório').notEmpty();
    request.assert('prazo', 'O prazo é obrigatório').notEmpty();
    request.assert('dataCadastro', 'A dataCadastro é obrigatório').notEmpty();
    request.assert('descricaoVaga', 'A descricaoVaga é obrigatório').notEmpty();
    request.assert('statusVaga', 'O statusVaga é obrigatório').notEmpty();
    request.assert('empresa', 'A empresa é obrigatório').notEmpty();

    let erros = request.validationErrors();

    if (erros) {
        response.status(404).send({
            status: 'erro',
            mensagem: 'Erro ao cadastrar vaga',
            stack: erros
        });
        return erro;
    } else {
        erro = false;
        return erro;
    }
}