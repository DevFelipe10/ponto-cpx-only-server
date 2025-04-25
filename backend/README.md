# API Reconhecimento Facial

API de Reconhecimento Facial

# Header

| Parâmetros   | Valor                  | Descrição                                       |
| ------------ | ---------------------- | ----------------------------------------------- |
| URL          | https://{DOMINIO}/api/ | URL do servidor para API                        |
| Content-Type | application/json       | Indentificar o conteúdo enviado para o servidor |

# Cookie

| Parâmetros | Valor          | Descrição    |
| ---------- | -------------- | ------------ |
| Token      | bearer {TOKEN} | Bearer token |

# Autenticação

## # Obter Bearer Token

Este endpoint é utilizado para obter Bearer Token
O token de autenticação é inserido no cookie

### Endpoint

| Método |    URI     |
| :----: | :--------: |
|  POST  | auth/login |

### Parâmetros de Requisição

```json
{
  "username": required|string,
  "password": required|string
}
```

### Respostas Esperadas

### Sucesso

```
HTTP Status 201
```

### Erro

```json
{
  "message": "Usuário não encontrado",
  "error": "Not Found",
  "statusCode": 404
}
```

# MisterT

## # Obter Configuração do relógio de ponto

Este endpoint é utilizado para obter a confguração do relógio de ponto do MisterT

### Endpoint

| Método |      URI       | Autorização  |
| :----: | :------------: | :----------: |
|  GET   | mistert/config | Bearer Token |


### Respostas Esperadas

### Sucesso

Code 200

```json
{
  "Success": true,
  "ErrorMsg": ""
}
```

### Erro

Code 400

```json
{
  "message": "Error registering point",
  "error": "Erro na Marcação: Biometria facial inválida",
  "status": 400
}
```

## # Registrar Ponto no MisterT

Este endpoint é utilizado para registrar ponto no MisterT

### Endpoint

| Método |          URI          | Autorização  |
| :----: | :-------------------: | :----------: |
|  POST  | mistert/pointregister | Bearer Token |

### Parâmetros de Requisição

```json
{
  "Versao": required|string,
  "MATRICULA": required|string,
  "DATA": required|string,
  "HORA": required|string,
  "FUSOHORAR": required|string,
  "IDEVENTO": required|number,
  "IPORIGEM": required|string,
  "LATITUDE": required|number,
  "LONGITUDE": required|number,
  "PRECISAO": required|number,
  "OBSREG": required|string,
  "IsFacialValid": required|boolean,
}
```

### Descrição dos campos

| Campos        | Descrição                                                                     |
| ------------- | ----------------------------------------------------------------------------- |
| Versao        | Versão do sistema. Deixe como 1.0                                             |
| MATRICULA     | Matricula do usuáiro a registrar ponto                                        |
| DATA          | Data do registro de ponto EX: 31/01/2025                                      |
| HORA          | Hora do registro de ponto EX: 15:13:00                                        |
| FUSOHORAR     | Fuso horário do registro de ponto EX: -03:00                                  |
| IDEVENTO      | Identificação do envento do registro de ponto. Vem da configuração do MisterT |
| IPORIGEM      | IP do cliente que está realizando o registro de ponto                         |
| LATITUDE      | Latitude da localização do cliente                                            |
| LONGITUDE     | Longitude da localização do cliente                                           |
| PRECISAO      | Precisão da localização do cliente                                            |
| OBSREG        | Alguma informação adicional                                                   |
| IsFacialValid | True/False se a facial é válida para o registro de ponto                      |

### Respostas Esperadas

### Sucesso

Code 200

```json
{
  "Success": true,
  "ErrorMsg": ""
}
```

### Erro

Code 400

```json
{
  "message": "Error registering point",
  "error": "Erro na Marcação: Biometria facial inválida",
  "status": 400
}
```
