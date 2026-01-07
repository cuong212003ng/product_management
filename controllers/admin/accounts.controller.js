const Accounts = require('../../model/accounts.model')

const systemConfig = require('../../config/system')

//[GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Accounts.find(find)

    res.render('admin/pages/accounts/index', {
        titlePage: 'Trang tài khoản',
        records: records
    })
}

//[GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    res.render('admin/pages/accounts/create', {
        titlePage: 'Thêm tài khoản'
    })
}

//[POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    console.log(req.body)
    console.log(req.file)
    // res.redirect(`${systemConfig.prefixAdmin}/accounts`)
}