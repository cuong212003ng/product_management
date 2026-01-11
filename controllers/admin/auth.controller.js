const systemConfig = require('../../config/system')
const Accounts = require('../../model/accounts.model')
const md5 = require('md5')

//[GET] /admin/auth/login
module.exports.login = async (req, res) => {
    res.render('admin/pages/auth/login', {
        titlePage: 'Đăng nhập hệ thống'
    })
}

//[POST] /admin/auth/login
module.exports.loginPost = async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    
    const user = await Accounts.findOne({
        email: email,
        deleted: false
    })

    if(!user){
        req.flash('error', 'Email không tồn tại')
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return
    }

    if(md5(password) !== user.password){
        req.flash('error', 'Mật khẩu không chính xác')
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return
    }

    if(user.status !== 'active'){
        req.flash('error', 'Tài khoản đã bị khóa')
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return
    }

    res.cookie("token", user.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
    })
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`)
}