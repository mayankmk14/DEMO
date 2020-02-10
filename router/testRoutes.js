const express = require('express')
const router = express.Router()
const dbFactory = require('../dao/connection')
const logger = require('../logger.js').getLogger("testRoutes")

router.get('/list', (req, res, next) => {
    logger.info("/users/list")
    res.send("/test/user/list was visited.")
})

module.exports = router