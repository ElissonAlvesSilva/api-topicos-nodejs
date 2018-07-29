'use strict';
require('./../config/config.config');

const mongoose = require('mongoose');
const {
    ObjectID
} = require('mongodb');

const empresa = mongoose.model('empresa');
const vaga = mongoose.model('vagas');
const candidato = mongoose.model('candidato');


const md5 = require('md5');



const candidato_data = [{
        nome: 'Elisson',
        sobrenome: 'Alves Silva',
        email: 'nossilesilva@gmail.com',
        senha: md5('123456@@' + global.SALT_KEY),
        cpf: '123456789'
    },
    {
        nome: 'Christiane',
        sobrenome: 'Fomes Silva',
        email: 'chirstiane@gmail.com',
        senha: md5('123456@@' + global.SALT_KEY),
        cpf: '122233456789'
    },
    {
        nome: 'Danilo',
        sobrenome: 'Alves Gome',
        email: 'gomesdanilo@gmail.com',
        senha: md5('123456@@' + global.SALT_KEY),
        cpf: '12223456323123'
    },
    {
        nome: 'Souza',
        sobrenome: 'Carlos Silva',
        email: 'scarlos@gmail.com',
        senha: md5('123456@@' + global.SALT_KEY),
        cpf: '99233456789'
    },
    {
        nome: 'Maria',
        sobrenome: 'Souza Silva',
        email: 'souzamaria@gmail.com',
        senha: md5('123456@@' + global.SALT_KEY),
        cpf: '12341638940'
    }
];

const empresa_data = [{
        _id: new ObjectID,
        cnpj: '1231232132131',
        razaoSocial: 'Empresa 1',
        nomeFantasia: 'Empresa 1 ltda',
        status: 'Ativa',
        endereco: 'Rua 1, Manaus/AM'
    },
    {
        _id: new ObjectID,
        cnpj: '32312344132131',
        razaoSocial: 'Empresa 2',
        nomeFantasia: 'Empresa 2 ltda',
        status: 'Ativa',
        endereco: 'Rua 2, Manaus/AM'
    },
    {
        _id: new ObjectID,
        cnpj: '223341232132131',
        razaoSocial: 'Empresa 3',
        nomeFantasia: 'Empresa 3 ltda',
        status: 'Ativa',
        endereco: 'Rua 3, Manaus/AM'
    },
    {
        _id: new ObjectID,
        cnpj: '12377688232132131',
        razaoSocial: 'Empresa 4',
        nomeFantasia: 'Empresa 4 ltda',
        status: 'Ativa',
        endereco: 'Rua 4, Manaus/AM'
    },
    {
        _id: new ObjectID,
        cnpj: '09876232132131',
        razaoSocial: 'Empresa 5',
        nomeFantasia: 'Empresa 5 ltda',
        status: 'Ativa',
        endereco: 'Rua 5, Manaus/AM'
    }
];

const vaga_data = [{
        nome: 'Dev Web',
        tipoContrato: 'CLT',
        prazo: '2018-09-08',
        dataCadastro: '2018-02-03',
        descricaoVaga: 'Desenvolver Aplicações WEB',
        statusVaga: 'Ativa',
        empresa: empresa_data[0]._id
    },
    {
        nome: 'Dev Backend',
        tipoContrato: 'CLT',
        prazo: '2018-09-08',
        dataCadastro: '2018-02-03',
        descricaoVaga: 'Desenvolver Aplicações utilizando Nodejs',
        statusVaga: 'Ativa',
        empresa: empresa_data[1]._id
    },
    {
        nome: 'Data Scientis',
        tipoContrato: 'CLT',
        prazo: '2018-09-08',
        dataCadastro: '2018-02-03',
        descricaoVaga: 'Analisar dados e utilizar python',
        statusVaga: 'Ativa',
        empresa: empresa_data[2]._id
    },
    {
        nome: 'Desenvolvedor Android',
        tipoContrato: 'CLT',
        prazo: '2018-09-08',
        dataCadastro: '2018-02-03',
        descricaoVaga: 'Desenvolver aplicações android',
        statusVaga: 'Ativa',
        empresa: empresa_data[3]._id
    },
    {
        nome: 'Dev Full Stack',
        tipoContrato: 'CLT',
        prazo: '2018-09-08',
        dataCadastro: '2018-02-03',
        descricaoVaga: 'Saber desenvolver de tudo.',
        statusVaga: 'Ativa',
        empresa: empresa_data[4]._id
    }
];


module.exports.endpoint = (req, res) => {

    let promises = [];
    promises.push(candidato.create(candidato_data));
    promises.push(empresa.create(empresa_data));
    promises.push(vaga.create(vaga_data));

    Promise.all(promises).then(results => {
        res.send(results);
    });

};