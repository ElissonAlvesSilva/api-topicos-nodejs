'use strict'
const mongoose = require('mongoose');

const candidatoSchema = mongoose.Schema({

    nome: {
        type: String,
        require: [true, 'Nome é requerido']
    },
    sobrenome: {
        type: String,
        require: [true, 'Sobrenome é requerido']
    },
    email: {
        type: mongoose.Schema.Types.String,
        unique: [true, 'O email deve ser único'],
        validate: {
            validator: function (value) {
                return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(value)
            },
            message: '{VALUE} não é um email válido'
        },
        require: [true, 'O email do candidato é requerido']
    },
    senha: {
        type: String,
        trim: true,
        min: [6, 'A senha deve conter mais que 6 caracteres']
    },
    resetSenha: {
        type: String
    },
    dataNascimento: {
        type: Date,
        require: [true, 'A data de Nascimento é requerida']
    },
    
    tel1: {
        type: String,
        require: [true, 'Telefone é requerido']
    },
    tel2: {
        type: String
    },
    sexo: {
        type: String,
        enum: ['Masculino', 'Feminino'],
        require: [true, 'Sexo é requerido']
    },
    curriculum: {
        type: String
    },
    candidatura: [{
        vaga: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'vagas'
        },
        statusCandidatura: {
            type: String,
            enum: ['Enviado', 'Em Análise', 'Selecionado', 'Não Selecionado'],
            default: 'Em Análise'
        },
        cv: {
            type: String
        }
    }],
    cursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'curso'
    }],
    foto: {
        type: String
    }
});
mongoose.model('candidato', candidatoSchema);