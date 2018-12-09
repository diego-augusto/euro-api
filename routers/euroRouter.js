const express = require('express')
const euroController = require('../controllers/euroController')
const router = express.Router()

router.get("/", euroController.getAll)
router.get("/:date", euroController.get)

module.exports = router