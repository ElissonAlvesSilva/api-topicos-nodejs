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

## Exemplo de requisição (POST) - candidatos:

URL:
`localhost:4000/v1/candidatos`

```{
	"nome": "Elisson ",
	"sobrenome": "Alves Silva",
	"email":"alvesilva@gmail.com",
	"foto": "imagem em base64",
	"senha": "123456@@"
}


	

