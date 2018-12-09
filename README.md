# Cotação do Euro

## Objetivos

Fornecer a cotação do Euro em uma data específica ou em um intervalo de datas.

## Dependências

* axios
* body-parser
* moment
* cheerio
* cors
* express

## Execução Local

```
npm i
npm start
```

## Rotas

```
/euros/:data

Ex: https://euro-api.glitch.me/euros/09-12-2018

Respostas:

{
    "data": {
        "date": "09/12/2018",
        "value": 4.42
    }
}
```

```
/euros?startDate=&endDate=

Ex: https://euro-api.glitch.me/euros?startDate=01-09-2018&endDate=05-09-2018

Respostas:

{
    "data": [
        {
            "value": 4.71,
            "date": "01/09/2018"
        },
        {
            "value": 4.71,
            "date": "02/09/2018"
        },
        {
            "value": 4.82,
            "date": "03/09/2018"
        },
        {
            "value": 4.81,
            "date": "04/09/2018"
        },
        {
            "value": 4.82,
            "date": "05/09/2018"
        }
    ]
}
```

## Demo

A demo da aplicação pode ser acessada [aqui](https://euro-api.glitch.me/).

Obs.:Por ser um serviço gratuito pode sofrer algum delay inicialmente.