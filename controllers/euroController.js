const cheerio = require('cheerio')
const moment = require('moment')
const axios = require('axios')

exports.get = async function (req, res) {
    var response = await axios.get('https://www.neocambio.io/cotacao/euro/' + req.params.date)
    if (response.status == 200) {
        const $ = cheerio.load(response.data)
        const value = $(".currency__wrapper").children().last().text()
        res.status(200).json({
            data: {
                date: req.params.date.replace('-', '/').replace('-', '/'),
                value: parseFloat(value.replace('R$ ', '').replace(',', '.'))
            }
        })
    } else {
        res.status(response.status).json({
            error: "Erro no parse dos dados",
            data: {}
        })
    }
}

exports.getAll = async function (req, res) {

    let startDate = moment(req.query.startDate, 'DD-MM-YYYY')
    let endDate = moment(req.query.endDate, 'DD-MM-YYYY')
    endDate.add(1, 'day')

    const dates = []

    for (; startDate.isBefore(endDate); startDate.add(1, 'day')) {
        dates.push(startDate.format('DD-MM-YYYY'))
    }

    var mDates = dates.map(async function (date) {
        const response = await axios.get('https://www.neocambio.io/cotacao/euro/' + date)
        const $ = cheerio.load(response.data)
        const value = $(".currency__wrapper").children().last().text()
        return {
            value: parseFloat(value.replace('R$ ', '').replace(',', '.')),
            date: date.replace('-', '/').replace('-', '/')
        }
    })

    Promise.all(mDates).then(responses => {
        res.status(200).json({
            data: responses
        })

    }).catch(function (err) {
        res.status(500).json({
            error: "Erro no parse dos dados. Contate o Administrador",
            data: []
        })
    })
}