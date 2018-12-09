const express = require('express')
const bodyparser = require('body-parser')
var cors = require('cors')

const euroRouter = require('./routers/euroRouter')

const app = express()
const port = process.env.PORT || 1337;

app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use('/euros', euroRouter)
app.listen(port);

console.log('API server started on: ' + port);