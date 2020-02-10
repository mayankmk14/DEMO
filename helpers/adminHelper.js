const logger = require('../logger.js').getLogger("helper/adminHelper")

const getModel = () => {
    return require('../dao/models/bundle-model').userModel
}

var readUsers = (query, cb) => {
    getModel().find({ type: "MENTOR" }, (me, md) => {
        cb(me || md) //mongo error/data
    })
}

var loginUsers = (payload, cb) => {
    getModel().find({ email: `${payload.email}`, userId: `${payload.userId}` }, (me, md) => {
        cb(me || md) //mongo error/data
    })
}

var saveUsers = (payload, cb) => {
    new (getModel())(payload).save((me, md) => {
        cb(me || md) //mongo error/data
    })
}

var updateUser = async (userId, payload) => {
    logger.info("UPDATING", userId)
    await getModel().updateOne({ userId: `${userId}`}, { $set: { task: `${payload}` } })
}

var removeUser = (userId, cb) => {
    getModel().deleteOne({ userId: `${userId}`, type: "MENTOR" }, (me, md) => {
        cb(me || md) //mongo error/data
    })
}

async function checkIfUserExists(userId) {
    logger.info("checkIfUserExists")
    let result = await getModel().find({ userId: `${userId}` })
    if (result.length != 0) {
        return true
    } else {
        return false
    }

}



module.exports = {
    loginUsers,
    readUsers,
    saveUsers,
    updateUser,
    removeUser,
    checkIfUserExists
}