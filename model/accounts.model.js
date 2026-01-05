const mongoose = require('mongoose')

const generateHelper = require('../helpers/generate');


const accountsSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    token: {
        type: String,
        default: generateHelper.generateRandomString(20)
    },
    phone:String,
    avatar:String,
    role_id:String,
    status:String,

    deleted:{
        type: Boolean,
        default: false
    },
    deletedAt:Date
},
{
    timestamps: true
});


const Accounts = mongoose.model('Accounts', accountsSchema, 'accounts');


module.exports = Accounts;