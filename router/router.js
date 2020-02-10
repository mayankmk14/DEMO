const router = require('express').Router();
const jwt = require('../helpers/jwt.js')
const test = require('./testRoutes')
const admin = require('./adminRoutes')
const logger = require('../logger.js').getLogger("router")
router.use('/test',test)
router.use('/admin',jwt.verifyToken,jwt.adminVerifier,admin)




module.exports = router;