# api-rest-laudo-nodejs

Este projeto contém uma api REST em Node.js, onde o principal serviço é o envio de uma amostra toxicológica e uma resposta é retornada informando se o laudo é positivo ou negativo. Após feito isso, o mesmo é salvo no banco de Dados MongoDB. A aplicação contém autenticação para garantir o acesso ao sistema. 

## **Modelos das entidades**

### Amosta

```
cocaina: <number>
anfetamina: <number>
metanfetamina: <number>
MDA: <number>
MDMA: <number>
THC: <number>
morfina: <number>
codeina: <number>
heroina: <number>
benzoilecgonina: <number>
cocaetileno: <number>
norcocaina:<number>
```

### Usuário

```
nome: <string>
email: <string> <id_da_entidade_Estado>
senha: <string> <mínimo_6_dígitos>
```

## **Funcionalidade de cada entidade**

### Amostra

- Inserção;
- Busca;
- Busca por id;
- Exclusão.

### Usuário

- Inserção;
- Busca;
- Busca por id;
- Atualização;
- Exclusão.

## **Rotas**

## Authenticação

- Gerador de token

```
url: /auth

method: GET

header: {
    "Content-Type": "application/json"
}

body: {
    "user": <email:senha> //Encodado em base64
}
```

## Amostra

- Inserção

```
url: /amostra

method: POST

header: {
    "Content-Type": "application/json",
    "Authorization": OAuth2 <access_token>
}

body: {
    "cocaina": <number>,
	"anfetamina": <number>,
	"metanfetamina": <number>,
	"MDA": <number>,
	"MDMA": <number>,
	"THC": <number>,
	"morfina": <number>,
	"codeina": <number>,
	"heroina": <number>,
	"benzoilecgonina": <number>,
	"cocaetileno": <number>,
	"norcocaina":<number>
}

response: {
    "codigo_amostra": <string>,
    "laudo": <string>
}
```

- Busca

```
url: /amostra

method: GET

header: {
    "Content-Type": "application/json",
    "Authorization": OAuth2 <access_token>
}
```

- Busca por Id

```
url: /amostra/:id

params: {
    id: <codigo_amostra>
}

method: GET

header: {
    "Content-Type": "application/json",
    "Authorization": OAuth2 <access_token>
}

```

- Exclusão

```
url: /amostra/:id

params: {
    id: <codigo_amostra>
}

method: DELETE

header: {
    "Content-Type": "application/json",
    "Authorization": OAuth2 <access_token>
}

```

## Usuário

- Inserção

```
url: /usuario

method: POST

header: {
    "Content-Type": "application/json",
    "Authorization": OAuth2 <access_token>
}

body: {
    "nome": <string>,
    "email": <string>,
    "senha": <string> <mínimo_6_dígitos>
}
```

- Busca

```
url: /usuario

method: GET

header: {
    "Content-Type": "application/json",
    "Authorization": OAuth2 <access_token>
}
```

- Busca por Id

```
url: /cidade/:id

params: {
    id: <id_do_usuario>
}

method: GET

header: {
    "Content-Type": "application/json",
    "Authorization": OAuth2 <access_token>
}
```
- Atualização

```
url: /usuario/:id

params: {
    id: <id_do_usuario>
}

method: PUT

header: {
    "Content-Type": "application/json",
    "Authorization": OAuth2 <access_token>
}

body: {
    "nome": <string>,
    "email": <string>,
    "senha": <string> <mínimo_6_dígitos>
}
```

- Exclusão

```
url: /usuario/:id

params: {
    id: <id_do_usuario>
}

method: DELETE

header: {
    "Content-Type": "application/json",
    "Authorization": OAuth2 <access_token>
}

```

## **Requisitos para execução do projeto**

Deve ter:
- ***Docker*** e ***docker-compose*** instalado na máquina.

### Para executar

- ```git clone <url_repositorio>``` : clonar o repositório;
- ```sudo docker-compose up```: rodar a aplicação

Para acessar a API diretamente é preciso acessar ```http://localhost:5555``` + o endPoint.

### Para executar os testes

- ```yarn test``` para executar os testes.
