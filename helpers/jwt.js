const jwt = require('jsonwebtoken')
const logger = require('../logger.js').getLogger("jwt")
const config = require('../config/mainConfig.json')
const adminHelper = require('./adminHelper')

/**
 * Query DB for existng user and issue JWT
 * @param {object} loginPayload 
 */
var authorizeUser = (loginPayload) => {
    try {
        logger.info("Login authorizeUser")
        return new Promise((resolve, reject) => {
            adminHelper.loginUsers(loginPayload, (loginUserResponse) => {
                if (loginUserResponse.length != 0) {
                    logger.info("USER FOUND")
                    loginUserResponse = loginUserResponse[0]
                    obj = {
                        userId: loginUserResponse.userId,
                        name: loginUserResponse.name,
                        type: loginUserResponse.type
                    }
                    token = jwt.sign(obj, config.auth.appSecret, { expiresIn: config.auth.expiresIn })
                    resolve(token)
                } else {
                    logger.error("USER NOT FOUND")
                    reject("Invalid Login")
                }
            })
        })
    } catch (error) {
        logger.error("Error in jwt", error)
        throw error
    }
}

/**
 * TO verify tokens recieved 
 */
const verifyToken = async (req, res, next) => {

    logger.info("<--- VERIFYTOKEN --->")
    var token = req.header('x-access-token')
    if (token) {
        jwt.verify(token, config.auth.appSecret, async (err, decodedToken) => {
            if (err) {
                logger.info("Invalid Token Provided => ", req.reqId)
                res.status(403).send({ auth: false, message: "False Token Provided" })
                return;
            }
            logger.info("decodedToken", decodedToken.userId)
            let check = await adminHelper.checkIfUserExists(decodedToken.userId)
            if (check) {
                req.userId = decodedToken.userId
                req.type = decodedToken.type
                logger.info("User Exists", decodedToken.userId)
                next()
            } else {
                logger.error("User was delete/banned")
                throw ("User was delete/banned")
            }
        })
        
    } else {
        res.status(403).send({ auth: false, message: "No Token Provided" })
    }
}

/**
 * To check if the token belongs to ADMIN or not
 */
function adminVerifier(req, res, next) {
    logger.info("Validating ADMIN ROUTE")
    if (req.type == "ADMIN") {
        logger.info("ADMIN MAY PROCEED")
        next()
    } else {
        logger.info("<--- ADMIN TERRITORY NO TRESSPASSING --->")
        res.send("User Not Admin")
    }

}

module.exports = {
    verifyToken,
    authorizeUser,
    adminVerifier
}