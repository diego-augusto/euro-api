exports.initial = function (req, res) {
    res.status(200).json({
        rotas: {
            1: {
                base: "/euros/:data",
                exemplo: "https://euro-api.glitch.me/euros/09-12-2018"
            },
            2: {
                base: "/euros?startDate=&endDate=",
                exemplo: "https://euro-api.glitch.me/euros?startDate=01-09-2018&endDate=05-09-2018"
            },
        }
    })
}
