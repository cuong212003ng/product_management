const ProductCategories = require('../../model/product-categories.model')
const systemConfig = require('../../config/system')

//[GET] /admin/categories/products
module.exports.categoriesProducts = async (req, res) => {

    res.render('admin/pages/categories/index', {
        titlePage: 'Danh mục sản phẩm'
    })
}

//[GET] /admin/categories/products/create
module.exports.create = async (req, res) => {
    res.render('admin/pages/categories/create', {
        titlePage: 'Thêm danh mục sản phẩm'
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