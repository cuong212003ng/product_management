//[GET] /admin/products
module.exports.products = async (req, res) => {

    res.render('admin/pages/products/index', {
        titlePage: 'Quản lý sản phẩm'
    })
}