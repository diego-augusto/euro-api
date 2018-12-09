const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
var moment = require('moment')
var axios = require('axios')

const router = express.Router()

router.get("/", (req, res, next) => {

    let startDate = moment(req.query.startDate, 'DD-MM-YYYY')
    let endDate = moment(req.query.endDate, 'DD-MM-YYYY')
    endDate.add(1, 'day')

    const dates = []

    for (; startDate.isBefore(endDate); startDate.add(1, 'day')) {
        dates.push(startDate.format('DD-MM-YYYY'))
    }

    var mDates = dates.map(async function (date) {
        var response = await axios.get('https://www.neocambio.io/cotacao/euro/' + date)
        var html = await response.data
        var $ = cheerio.load(html)
        var value = $(".currency__wrapper").children().last().text()
        return {
            value: parseFloat(value.replace('R$ ', '').replace(',', '.')),
            date: date.replace('-', '/').replace('-', '/')
        }
    });

    Promise.all(mDates).then(responses => {
        res.status(200).json(responses)
    });
})

router.get("/:date", (req, res) => {
    request('https://www.neocambio.io/cotacao/euro/' + req.params.date, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html)
            var value = $(".currency__wrapper").children().last().text()
            res.status(200).json({
                date: req.params.date.replace('-', '/').replace('-', '/'),
                value: parseFloat(value.replace('R$ ', '').replace(',', '.'))
            })
        }
    })
})

module.exports = router