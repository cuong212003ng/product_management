const systemConfig = require('../../config/system')

module.exports.createPost = (req, res, next) => {
    if(!req.body.fullName){
        req.flash('error', 'Vui lòng nhập họ và tên')
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
        return
    }

    if(!req.body.email){
        req.flash('error', 'Vui lòng nhập email')
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
        return
    }

    if(!req.body.password){
        req.flash('error', 'Vui lòng nhập mật khẩu')
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
        return
    }

    if(!req.body.phone){
        req.flash('error', 'Vui lòng nhập số điện thoại')
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
        return
    }

    next()
}

module.exports.editValidate = (req, res, next) => {
    if(!req.body.fullName){
        req.flash('error', 'Vui lòng nhập họ và tên')
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
        return
    }

    if(!req.body.email){
        req.flash('error', 'Vui lòng nhập email')
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
        return
    }

    if(!req.body.password){
        req.flash('error', 'Vui lòng nhập mật khẩu')
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
        return
    }

    if(!req.body.phone){
        req.flash('error', 'Vui lòng nhập số điện thoại')
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
        return
    }

    next()
}
