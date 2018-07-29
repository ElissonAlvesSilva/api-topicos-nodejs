'use strict'

const mongoose = require('mongoose');

const empresaSchema = mongoose.Schema({
    cnpj: {
        type: mongoose.Schema.Types.String,
        require: [true, 'O CPNJ da empresa é requerido'],
        unique: [true, 'O CNPJ já esta cadastrado na base']
    },
    razaoSocial: {
        type: String,
        require: [true, 'O Nome da empresa é requerido']
    },
    nomeFantasia: {
        type: String,
        require: [true, 'O nome fantasia é requerido']
    },
    ramoAtuacao: {
        type: String,
    },
    endereco: {
        type: String
    },
    status: {
        type: String,
        enum: ['Ativa', 'Inativa'],
        require: [true, 'O status da empresa é requerido'],
        default: 'Ativo'
    },
    imgUrl: {
        type: String
    }
});

mongoose.model('empresa', empresaSchema);