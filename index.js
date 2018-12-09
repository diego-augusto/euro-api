const express = require('express')
const bodyparser = require('body-parser')
var cors = require('cors')

const euros = require('./routers/euros')

const app = express()
const port = process.env.PORT || 1337;

app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/euros', euros)
app.listen(port);

console.log('API server started on: ' + port);