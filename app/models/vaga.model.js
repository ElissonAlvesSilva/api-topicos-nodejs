'use strict'

const mongoose = require('mongoose');

const vagasSchema = mongoose.Schema({

    nome: {
        type: String,
        require: [true, 'O nome da vaga é requerida']
    },
    tipoContrato: {
        type: String,
        require: [true, 'O tipo de contrato é requerido']
    },
    prazo: {
        type: Date,
        require: [true, 'O prazo da vaga é requerida']
    },
    dataCadastro: {
        type: Date,
        require: [true, 'A data de cadastro é requerida']
    },
    descricaoVaga: {
        type: String,
        require: [true, 'A descrição da vaga é requerida']
    },
    statusVaga: {
        type: String,
        enum: ['Ativa', 'Indisponível', 'Preenchida', 'Cancelada'],
        default: 'Indisponível'
    },
    imgUrl: {
        type: String,
    },
    candidatos: [{
        candidato: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'candidato'
        },
        cv: {
            type: String,
            require: false
        },
        statusCandidatura: {
            type: String,
            enum: ['Enviado', 'Em Análise', 'Aprovado', 'Não Aprovado'],
            default: 'Em Análise'
        }
    }],
    aprovados: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'candidato'
    }],
    empres: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'empresa'
    },
    count: {
        type: Number,
        default: 0
    },
    privacao: {
        nomeEmpresa: {
            type: Boolean,
            default: false
        },
        segmentoEmpresa: {
            type: Boolean,
            default: false
        },
        endereco: {
            type: Boolean,
            default: false
        }
    }
});

mongoose.model('vagas', vagasSchema);