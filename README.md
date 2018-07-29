# api-rhapp

Uma RESTFul API simples em Node JS, criada por [Elisson Silva](https://github.com/ElissonAlvesSilva), para utilização no trabalho de tópicos e Projetos WEB.

---

1) Clone ou baixe este repositório e, estando no diretório do projeto, abra o console: 
`npm install`

2) Para executar, estando no diretório do projeto, abra o console: 
`node app/bin/server.js`

3) Para testar as requisições, utilize o software de sua preferência ([Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop), por exemplo) e acesse:
`http://localhost:4000`

4) Para criar os endpoints utilize a requisicao POST na url abaixo:
`http://localhost:4000/v1/endpoints`

5) Os métodos PUT e PATCH funcionam da mesma forma, ou seja, há uma validação se vai ser alterado um ou mais campos.

## Exemplo de requisição (POST) - candidatos:

URL:
`localhost:4000/v1/candidatos`

```
{
	"nome": "Elisson ",
	"sobrenome": "Alves Silva",
	"email":"alvesilva@gmail.com",
	"foto": "imagem em base64",
	"cpf": "1234123123123123"
	"senha": "123456@@"
} 
```

## Exemplo de requisição (POST) - empresa:

URL:
`localhost:4000/v1/empresas`

```
{
	"cnpj": "4565289200147",
	"razaoSocial": "Empresa 1 ltda",
	"ramoAtuacao": "Eletrônicos e Eletrodomésticos",
	"nomeFantasia": "Empresa 1 c"
}
```
## Exemplo de requisição (POST) - vaga:
URL:
`localhost:4000/v1/empresas`
### Sempre que criar uma vaga, obter anteriormente o id da empresa para colocar na requisição, atraves do método get na url:
`localhost:4000/v1/empresas


```
{
	"nome": "Desenvolvedor WEB",
	"tipoContrato": "CLT",
	"prazo":"2018-09-08",
	"dataCadastro":"2018-09-08",
	"descricaoVaga": "dev web",
	"statusVaga": "Ativa",
	"empresa": "5b5ddab0f2fe286c29a29c75"
}
```

	

