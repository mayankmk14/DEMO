const express = require('express')
const router = express.Router()
const logger = require('../logger.js').getLogger("adminRoutes")
const dbFactory = require('../dao/connection')
const adminHelper = require('../helpers/adminHelper')

router.get('/list', (req, res) => {
    try {
        logger.info("/admins/list")
        dbFactory.adminHelper.readUsers(null, (results) => {
            logger.info("Results", results)
            res.send(results)
        })
    } catch (error) {
        logger.error("Error Occured", error.message)
        res.json(error)
    }


})

router.post('/add', (req, res) => {
    try {
        logger.info(" in /admins/add")
        dbFactory.adminHelper.saveUsers(req.body, (results) => {
            res.json("DONE")
        })
    } catch (error) {
        logger.error("Error Occured", error.message)
        res.json(error)
    }

})

router.post('/update', async (req, res) => {
    try {
        logger.info(" in /admins/update",req.body.userId)
        check = await adminHelper.checkIfUserExists(req.userId)
        if(check){
            dbFactory.adminHelper.updateUser(req.body.userId, req.body.task, (results) => {
                res.json("DONE")
            })
        }else{
            throw "Document for Updation doesn't exist"
        }

    } catch (error) {
        logger.error("Error Occured", error)
        res.json(error)
    }
})

router.post('/deleteUser', (req, res) => {
    try {
        logger.info(" in /admins/deleteUser")
        dbFactory.adminHelper.removeUser(req.body.userId, (results) => {
            res.json("DONE")
        })
    } catch (error) {
        logger.error("Error Occured", error.message)
        res.json(error)
    }
})

module.exports = router