const mongoose = require("mongoose")
const Promise  = require("bluebird")

mongoose.Promise = Promise

var schemaObj = mongoose.Schema 

const userSchema = new schemaObj({
    name : String,
    userId: String,
    email:String,
    task:Array,
    type:String
},{strict:false},{unique:true})

userModel = mongoose.model('users',userSchema)

module.exports= userModel;