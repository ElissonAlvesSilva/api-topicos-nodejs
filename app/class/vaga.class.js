'use strict';

module.exports = class Vaga {
    
    constructor(req, imgUrl) {
        this.req = req;
        this.imgUrl = imgUrl;
    }

    createPost() {
        if (this.imgUrl !== undefined) {
            return JSON.stringify({
                nome: this.req.nome,
                tipoContrato: this.req.tipoContrato,
                prazo: this.req.prazo,
                dataCadastro: this.req.dataCadastro,
                descricaoVaga: this.req.descricaoVaga,
                statusVaga: this.req.statusVaga,
                imgUrl: this.imgUrl,
                empresa: this.req.empresa
            });
        } else {
            return JSON.stringify({
                nome: this.req.nome,
                tipoContrato: this.req.tipoContrato,
                prazo: this.req.prazo,
                dataCadastro: this.req.dataCadastro,
                descricaoVaga: this.req.descricaoVaga,
                statusVaga: this.req.statusVaga,
                empresa: this.req.empresa
            });
        }
    }
}