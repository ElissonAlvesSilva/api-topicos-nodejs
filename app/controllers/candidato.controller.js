'use strict';

const mongoose = require('mongoose');
const {
    ObjectId
} = require('mongodb');

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
    candidato.findByIdAndUpdate(_id, {
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

module.exports.candidatar = (req, res) => {
    existeCandidaturaEVagaDisponivel(req.body.vaga, req.params.id).then((retorno) => {
            if (!retorno) {
                if (req.file) {
                    let path = removeRootPath(req.file.path);
                    candidato.findById(req.params.id, '_id nome email')
                        .then(candidato_data => {

                            vagas.findById(req.body.vaga)
                                .then(count => {
                                    let data_count = 0;
                                    if (count.count === null || count.count === 0) {
                                        data_count = 1;
                                    } else {
                                        data_count = count.count + 1;
                                    }

                                    adicionarCandidatura(req.body.vaga, req.params.id, path);


                                    vagas.findByIdAndUpdate(
                                            req.body.vaga, {
                                                $push: {
                                                    "candidatos": {
                                                        "candidato": req.params.id,
                                                        "cv": path,
                                                        "statusCandidatura": 'Em Análise'
                                                    },
                                                },
                                                $set: {
                                                    count: data_count
                                                }
                                            })
                                        .then(data => {
                                            res.status(201).send({
                                                status: 'sucesso',
                                                mensagem: 'sucesso ao candidatar-se a vaga',
                                                records: data
                                            });
                                        }).catch(error => {
                                            res.status(404).send({
                                                status: 'sucesso',
                                                mensagem: 'error ao candidatar-se a vaga',
                                                stack: error
                                            });
                                        });
                                })
                                .catch(error => {
                                    res.status(404).send(error)
                                });

                        })
                        .catch(error => {
                            res.status(404).send({
                                status: 'erro',
                                mensagem: 'Erro ao processar requisição'
                            });
                        });

                }
            } else {
                res.status(404).send({
                    status: 'erro',
                    mensagem: 'Candidato já possui candidatura efetuada para essa vaga ou vaga está indisponível, cancelada ou já foi preenchida'
                });
            }
        })
        .catch(erro => res.status(404).send(erro));
};

function decode_base64(base64str, _filename, res) {
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
        res.status(404).send({
            status: 'erro',
            mensagem: 'Erro ao converter imagem'
        });
    }

}

function existeCandidaturaEVagaDisponivel(idVaga, idCandidato) {
    let existe = true;
    return vagas.findById(idVaga)
        .then(data => {
            if (data.statusVaga !== 'Indisponível' && data.statusVaga !== 'Preenchida' && data.statusVaga !== 'Cancelada') {
                let existeCandidatura = data.candidatos.filter((el) => {
                    return el.candidato == idCandidato
                });

                if (existeCandidatura.length > 0) {
                    existe = true;
                } else {
                    existe = false;
                }
            } else {
                existe = true;
            }
            return existe;
        })
        .catch(error => {
            existe = true;
            return existe;
        });
}

function anexarArquivoAVaga(filename) {
    let src = path.join('app/public/doc/', filename);
    let destDir = path.join('app/public/doc/', 'doc_copy');
    fs.access(destDir, (err) => {
        if (err)

            fs.mkdirSync(destDir);

        copyFile(src, path.join(destDir, filename));
    });

    return destDir;
}

function copyFile(src, dest) {

    let readStream = fs.createReadStream(src);

    readStream.once('error', (err) => {
        console.log(err);
    });

    readStream.once('end', () => {
        console.log('done copying');
    });

    readStream.pipe(fs.createWriteStream(dest));
}

function removeFile(src) {
    fs.unlinkSync(src);
}

function adicionarCandidatura(idVaga, idCandidato, path) {
    console.log(path);
    candidato.findByIdAndUpdate(idCandidato, {
            $push: {
                candidatura: {
                    vaga: idVaga,
                    statusCandidatura: 'Em Análise',
                    cv: path
                }
            }
        }).then(data => {
            console.log('Sucesso ao adicionar candidatura');
        })
        .catch(error => {
            console.log(error);
        });
}

function removeRootPath(path) {
    let _path = path;
    _path = _path.replace('app/public/', '');
    return _path;
}