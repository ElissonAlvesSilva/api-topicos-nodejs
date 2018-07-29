'use strict';

module.exports = class Empresa {
    

    constructor(req, imgUrl) {
        this.req = req;
        this.imgUrl = imgUrl;
    }

    createPost() {
        if (this.imgUrl !== undefined) {
            return JSON.stringify({
                cnpj: this.req.cnpj,
                razaoSocial: this.req.razaoSocial,
                nomeFantasia: this.req.nomeFantasia,
                ramoAtuacao: this.req.ramoAtuacao,
                endereco: this.endereco,
                status: this.status,
                imgUrl: this.imgUrl
            });
        } else {
            return JSON.stringify({
                cnpj: this.req.cnpj,
                razaoSocial: this.req.razaoSocial,
                nomeFantasia: this.req.nomeFantasia,
                ramoAtuacao: this.req.ramoAtuacao,
                endereco: this.endereco,
                status: this.status
            });
        }
    }
}