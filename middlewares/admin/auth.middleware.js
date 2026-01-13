const systemConfig = require('../../config/system')
const Accounts = require('../../model/accounts.model')
const Roles = require('../../model/roles.model')

module.exports.requireLogin = async (req, res, next) => {

    if (!req.cookies.token) {
        return res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
    } else {

        const user = await Accounts.findOne({
            token: req.cookies.token,
            deleted: false
        }).select('-password -token -deleted -deletedAt -createdAt -updatedAt')
        if (!user) {
            return res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        } else {
            const role = await Roles.findOne({
                _id: user.role_id
            }).select('title permissions')

            res.locals.user = user // biến toàn cục
            res.locals.role = role
            next()
        }
    }
}