const ProductCategories = require('../../model/product-categories.model')
const systemConfig = require('../../config/system')

const createTreeHelper = require('../../helpers/create-tree')

//[GET] /admin/categories/products
module.exports.categoriesProducts = async (req, res) => {
    let find = {
        deleted: false
    }

    
    const records = await ProductCategories.find(find)

    const newRecords = createTreeHelper.tree(records)

    res.render('admin/pages/categories/index', {
        titlePage: 'Danh mục sản phẩm',
        records: newRecords
    })
}

//[GET] /admin/categories/products/create
module.exports.create = async (req, res) => {

    let find = {
        deleted: false
    }

    const records = await ProductCategories.find(find)

    const newRecords = createTreeHelper.tree(records)

    res.render('admin/pages/categories/create', {
        titlePage: 'Thêm danh mục sản phẩm',
        records: newRecords
    })
}

//[POST] /admin/categories/products/create
module.exports.createPost = async (req, res) => { 
    if(req.body.position == ""){
        const count = await ProductCategories.countDocuments()
        req.body.position = count + 1
    } else {
        req.body.position = parseInt(req.body.position)
    }

    const record = new ProductCategories(req.body)
    await record.save()
    
    req.flash('success', 'Thêm danh mục sản phẩm thành công')
    res.redirect(`${systemConfig.prefixAdmin}/categories/products`)
}

//[GET] /admin/categories/products/edit/:id
module.exports.edit = async (req, res) => {

    try {
        const id = req.params.id
        const data = await ProductCategories.findOne({ _id: id,
            deleted: false
        })
    
        const records = await ProductCategories.find({
            deleted: false
        })
    
        const newRecords = createTreeHelper.tree(records)
    
        res.render('admin/pages/categories/edit', {
            titlePage: 'Sửa danh mục sản phẩm',
            data: data,
            records: newRecords
        })

    } catch (error) {
        req.flash('error', 'Lỗi trang')
        res.redirect(`${systemConfig.prefixAdmin}/categories/products`)
    }
}

//[PATCH] /admin/categories/products/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id

    req.body.position = parseInt(req.body.position)

    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    } else {
        req.body.thumbnail = req.body.thumbnail
    }

    await ProductCategories.updateOne({ _id: id }, req.body)

    req.flash('success', 'Sửa danh mục sản phẩm thành công')
    res.redirect(`${systemConfig.prefixAdmin}/categories/products`)
}

//[GET] /admin/categories/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        let find = {
            deleted: false,
            _id: req.params.id
        }

        const data = await ProductCategories.findOne(find).lean() // ham lean de lay du lieu tu database ve dang object

        res.render('admin/pages/categories/detail', {
            titlePage: 'Chi tiết danh mục sản phẩm',
            data: data
    })
    } catch (error) {
        req.flash('error', 'Lỗi trang')
        res.redirect(`${systemConfig.prefixAdmin}/categories/products`)
    }
}

//[DELETE] /admin/categories/products/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id

    console.log(id);
    

    //Xóa mềm danh mục sản phẩm bằng cách đánh dấu deleted = true
    await ProductCategories.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date() // Them thoi gian xoa
        })

    //Xóa vĩnh viễn danh mục sản phẩm bằng cách xóa document trong database
    //await Product.deleteOne({ _id: id })

    req.flash('success', 'Xóa danh mục sản phẩm thành công')

    const backUrl = req.get('Referrer')
    res.redirect(backUrl)
}