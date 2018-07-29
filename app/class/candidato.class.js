require('./../config/config.config');
const md5 = require('md5');
module.exports = class Candidato {
   
    constructor(params, imgUrl) {
        this.params = params;
        this.imgUrl = imgUrl;
    }

    createPost() {
        if (this.imgUrl !== undefined) {
            return JSON.stringify({
                nome: this.params.nome,
                sobrenome: this.params.sobrenome,
                cpf: this.params.cpf,
                email: this.params.email,
                senha: md5(this.params.senha + global.SALT_KEY),
                foto: this.imgUrl
            });
        } else {
            return JSON.stringify({
                nome: this.params.nome,
                sobrenome: this.params.sobrenome,
                cpf: this.params.cpf,
                email: this.params.email,
                senha: md5(this.params.senha + global.SALT_KEY)
            });
        }
    }

    updateCandidato() {
        if (this.imgUrl !== undefined) {
            return JSON.stringify({
                nome: this.params.nome,
                sobrenome: this.params.sobrenome,
                cpf: this.params.cpf,
                email: this.params.email,
                foto: this.imgUrl
            });
        } else {
            return JSON.stringify({
                nome: this.params.nome,
                sobrenome: this.params.sobrenome,
                cpf: this.params.cpf,
                email: this.params.email,
            });
        }
    }
}