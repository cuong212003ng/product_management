const systemConfig = require('../../config/system')

module.exports.loginPost = (req, res, next) => {
    if(!req.body.title){ //Nếu không có tên sản phẩm thì trả về lỗi
        req.flash('error', 'Vui lòng nhập email')
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return
    }
    if(!req.body.password){
        req.flash('error', 'Vui lòng nhập mật khẩu')
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`)
        return
    }
    next()  
}