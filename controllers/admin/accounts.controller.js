var md5 = require('md5');
const Accounts = require('../../model/accounts.model')
const Roles = require('../../model/roles.model')
const systemConfig = require('../../config/system')

//[GET] /admin/accounts
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Accounts.find(find).select('-password -token -deleted -deletedAt')

    for (const record of records) {

        const role = await Roles.findOne({
            _id: record.role_id,
            deleted: false
        })
        record.role = role
    }
    
    res.render('admin/pages/accounts/index', {
        titlePage: 'Trang tài khoản',
        records: records
    })
}

//[GET] /admin/accounts/create
module.exports.create = async (req, res) => {

    const roles = await Roles.find({
        deleted: false
    })

    const titles = roles.map(role => role.title)
    
    res.render('admin/pages/accounts/create', {
        titlePage: 'Thêm tài khoản',
        roles: roles,
        titles: titles
    })
}

//[POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    try {

        const emailExists = await Accounts.findOne({
            email: req.body.email,
            deleted: false
        })

        if(emailExists){
            req.flash('error', 'Email đã tồn tại')
            res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)
        } else {
            
            const record = new Accounts(req.body)

            record.password = md5(req.body.password)

            await record.save()

            req.flash('success', 'Thêm tài khoản thành công')
            res.redirect(`${systemConfig.prefixAdmin}/accounts`)
        }
    } catch (error) {

        req.flash('error', 'Thêm tài khoản thất bại')
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`)

    }
}


//[GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {

    const data = await Accounts.findOne({
        deleted: false,
        _id: req.params.id
    })

    const role = await Roles.findOne({
        deleted: false,
        _id: data.role_id
    })

    data.role = role

    res.render('admin/pages/accounts/edit', {
        titlePage: 'Sửa tài khoản',
        data: data
    })
}

//[PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    try {

        const find = {
            deleted: false,
            _id: req.params.id
        }

        const data = await Accounts.findOne(find).lean()

        data.fullName = req.body.fullName

        const emailExists = await Accounts.findOne({
            email: req.body.email,
            deleted: false,
            _id: { $ne: req.params.id }
        })
        if(emailExists){
            req.flash('error', `Email ${req.body.email} đã tồn tại`)
            res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${req.params.id}`)
            return
        } else {
            data.email = req.body.email
        }

        if(req.body.password){
            data.password = md5(req.body.password)
        }

        data.phone = req.body.phone

        if(req.file){
            data.avatar = `/uploads/${req.file.filename}`
        }

        data.role_id = req.body.role_id
        data.status = req.body.status

        await Accounts.updateOne(find, data)

        req.flash('success', 'Sửa tài khoản thành công')
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)

    } catch (error) {

        req.flash('error', 'Sửa tài khoản thất bại')
        res.redirect(`${systemConfig.prefixAdmin}/accounts/edit/${req.params.id}`)

    }
}