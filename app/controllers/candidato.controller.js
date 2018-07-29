'use strict';

const mongoose = require('mongoose');
const {
    ObjectId
} = require('mongodb');
const md5 = require('md5');
const fs = require('fs');
const path = require('path');
const uuid = require('node-uuid');

const vagas = mongoose.model('vagas');
const empresa = mongoose.model('empresa');
const candidato = mongoose.model('candidato');
const Candidato = require('./../class/candidato.class');


exports.listar = (req, res) => {
    candidato.find({}).then((data) => {
        res.send({
            candidatos: data
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
    candidato.findById(_id).then((data) => {
        if (!data) {
            return res.status(404).send();
        }
        res.send({
            candidato: data
        });
    }).catch((err) => {
        return res.status(400).send(err);
    });
};

exports.criar_candidato = (req, res) => {

    candidato.findOne({
        cpf: req.body.cpf
    }).then(exist => {

        if (!exist) {

            let imageUrl;
            if (req.body.foto !== undefined && req.body.foto !== '')
                imageUrl = decode_base64(req.body.foto, req.body.filename, res);
            else
                imageUrl = undefined;

            let cand = new Candidato(req.body, imageUrl);
            let jsonObject = JSON.parse(cand.createPost());
            candidato.create(jsonObject)
                .then(data => {
                    res.send({
                        candidato: data
                    });
                })
                .catch(error => {
                    res.status(400).send(error);
                });
        } else {
            res.status(404).send({
                message: 'Candidato já cadastrado'
            });
        }
    });



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

    let cand = new Candidato(req.body, imageUrl);
    let jsonObject = JSON.parse(cand.updateCandidato());
    candidato.findByIdAndUpdate(_id,{
        $set: jsonObject
    }, {
        new: true
    }).then((data) => {

        if (!data) {
            return res.status(404).send();
        }

        res.send({
            candidato: data
        });
    }).catch(err => res.status(400).send(err));
};

function decode_base64(base64str, _filename, response) {
    var buf = Buffer.from(base64str, 'base64');
    let ext = 'jpg';
    let filename = uuid.v4() + '.' + ext;
    let err;
    fs.writeFile(path.join(__dirname, '../public/img/candidato', filename), buf, function (error) {
        if (error) {

            err = true;
        } else {
            err = false;
        }
    });

    if (err !== true)
        return 'img/candidato/' + filename;
    else {
        response.status(404).send({
            status: 'erro',
            mensagem: 'Erro ao converter imagem'
        });
    }

}