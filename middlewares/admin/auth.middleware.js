const systemConfig = require('../../config/system')
const Accounts = require('../../model/accounts.model')

module.exports.requireLogin = async (req, res, next) => {
    
    if(!req.cookies.token){
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    } else {
        console.log(req.cookies.token);
        
        const user = await Accounts.findOne({
            token: req.cookies.token,
            deleted: false
        })
        if(!user){
            return res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        } else {
            req.user = user
            next()
        }
    }
}