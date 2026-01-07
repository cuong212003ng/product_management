const Roles = require('../../model/roles.model')

const systemConfig = require('../../config/system')

//[GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Roles.find(find)

    res.render('admin/pages/roles/index', {
        titlePage: 'Trang Quyền hạn',
        records: records
    })
}

//[GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render('admin/pages/roles/create', {
        titlePage: 'Thêm quyền hạn'
    })
}

//[POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
    try {
        const record = new Roles(req.body)
        await record.save()
        
        req.flash('success', 'Thêm quyền hạn thành công')
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    } catch (error) {
        req.flash('error', 'Thêm quyền hạn thất bại')
        res.redirect(`${systemConfig.prefixAdmin}/roles/create`)
    }
}

//[DELETE] /admin/roles/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id

    //Xóa mềm quyền hạn bằng cách đánh dấu deleted = true
    await Roles.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date() // Them thoi gian xoa
        })

    //Xóa vĩnh viễn quyền hạn bằng cách xóa document trong database
    //await Product.deleteOne({ _id: id })

    req.flash('success', 'Xóa quyền hạn thành công')

    const backUrl = req.get('Referrer')
    res.redirect(backUrl)
}

//[GET] /admin/roles/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const role = await Roles.findOne(find).lean() // ham lean de lay du lieu tu database ve dang object
        
        res.render('admin/pages/roles/detail', {
            titlePage: 'Sửa nhóm quyền hạn',
            role: role
        })
    } catch (error) {
        req.flash('error', 'Sửa nhóm quyền hạn thất bại')
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

//[GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const role = await Roles.findOne(find).lean() // ham lean de lay du lieu tu database ve dang object
        
        res.render('admin/pages/roles/edit', {
            titlePage: 'Sửa nhóm quyền hạn',
            role: role
        })
    } catch (error) {
        req.flash('error', 'Sửa nhóm quyền hạn thất bại')
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}


//[PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
        const role = await Roles.findOne(find).lean() // ham lean de lay du lieu tu database ve dang object
        
        role.title = req.body.title
        role.description = req.body.description
        await Roles.updateOne({ _id: req.params.id }, role)

        req.flash('success', 'Sửa nhóm quyền hạn thành công')
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    } catch (error) {
        req.flash('error', 'Sửa nhóm quyền hạn thất bại')
        res.redirect(`${systemConfig.prefixAdmin}/roles`)
    }
}

//[GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    
    let find = {
        deleted: false
    }

    const data = await Roles.find(find)

    res.render('admin/pages/roles/permissions.pug', {
        titlePage: 'Nhóm quyền hạn',
        data: data
    })
}

//[PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {

    try {

        const permissions = JSON.parse(req.body.permissions)

        for (const item of permissions) {
            const id = item.id
            const permissions = item.permissions
            await Roles.updateOne({ _id: id }, { permissions: permissions })
        }
    
        req.flash('success', 'Cập nhật quyền hạn thành công')
        res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`) 

    } catch (error) {
        
        req.flash('error', 'Cập nhật quyền hạn thất bại')
        res.redirect(`${systemConfig.prefixAdmin}/roles/permissions`)
    }
}