const Product = require('../../model/product.model')

const filterStatusHelper = require('../../helpers/filterStatus')
const searchHelper = require('../../helpers/search')
const paginationHelper = require('../../helpers/pagination')

//[GET] /admin/products
module.exports.products = async (req, res) => {

    let find = {
        deleted: false
    }
    
    if(req.query.status){
        find.status = req.query.status
    }
    
    //Filter status
    const filterStatus = filterStatusHelper.filterStatus(req.query)
    //End Filter status

    //Search
    const objectSearch = searchHelper.search(req.query)

    if(objectSearch.regex){
        find.title = objectSearch.regex
    }      
    //End Search
    
    //Pagination
    const countProducts = await Product.countDocuments(find);

    let objectPagination =  paginationHelper.pagination(
        {
            currentPage: 1,
            limitItems: 5
        },
        req.query,
        countProducts
    )

    //End Pagination



 

    const products = await Product.find(find).limit(objectPagination.limitItems).
    skip(objectPagination.skip)

    res.render('admin/pages/products/index', {
        titlePage: 'Sản phẩm',
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    })
}

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status
    const id = req.params.id

    await Product.updateOne({ _id: id }, { status: status })

    // Sau khi cập nhật trạng thái, quay lại đúng trang trước đó (giữ nguyên page, filter, search)
    const backUrl = req.get('Referrer')
    res.redirect(backUrl)
}