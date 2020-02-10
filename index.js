const express = require('express')
const bodyParser = require("body-parser")
const config = require('./config/mainConfig.json')
const app = express()
const logger = require('./logger.js').getLogger("index")
const router = require('./router/router.js')
const jwt = require('./helpers/jwt')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/**
 * logging requests
 */
app.all("*", (req, res, next) => {
    req.reqId = Math.random()
    logger.info(`${req.reqId} | ${new Date} | ${req.method} | ${req.url} | ${req.method == 'GET' ? JSON.stringify(req.query) : JSON.stringify(req.body)}`)
    next()
})

app.get('/', (req, res) => res.send("Welcome to Micro-Services App"))

app.post('/login', async (req, res) => {
    try {
        let response = await jwt.authorizeUser(req.body)
        res.json(response)
    } catch (error) {
        logger.error("<--- /login failed --->",error)
        res.json(error)
    }    
})
app.use(router)


// userHelper.readUsers(null, (results) => {
//     logger.info("Results ------ users", results)
// })

app.listen(config.port, () => {
    logger.info("<-------",config.serviceName," is listening on port ----->",config.port)
})

