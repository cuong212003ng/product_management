const Product = require('../../model/product.model')

module.exports.products = async (req, res) => {


    const products = await Product.find({
        status: 'active',
        deleted: false,
    })

    products.forEach(item => {
        item.oldPrice = item.price * (1 + item.discountPercentage / 100)
    })

    res.render('client/pages/products/index',{
        titlePage: 'Danh sách sản phẩm',
        products: products
    })
}