const mongo = require('mongoose')
const config  = require('../config/mainConfig.json')
const bundelModel = require('./models/bundle-model')

mongo.set("debug",config.isDebug || false)
mongo.connect(config.mongodb,{ useNewUrlParser: true })

mongo.connection.on('connected',()=>{
    console.log("Mongo Connected")
})

mongo.connection.on('disconnected',()=>{
    console.log("Mongo disconnected on ",config.mongodb)
})


mongo.connection.on('error',(error)=>{
    console.log("Mongoose connection failed",config.mongodb, error)
})

mongo.connection.on('SIGINT',()=>{
    mongo.connection.close(()=>{
        console.log("Process Termination Disconnects MongoDB",config.mongodb)
        process.exit(0);
    })
    
})

const adminHelper = require('../helpers/adminHelper')

// module.exports = bundelModel    
module.exports = {
    bundelModel,
    adminHelper
}    
