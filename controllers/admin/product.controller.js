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



 

    const products = await Product
        .find(find)
        .sort({ position: "asc" })
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)

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

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type
    const ids = req.body.ids.split(',')

    switch(type) {
        case 'active':
            await Product.updateMany({ _id: { $in: ids } }, { status: 'active' })
            break;
        case 'inactive':
            await Product.updateMany({ _id: { $in: ids } }, { status: 'inactive' })
            break;
        case 'delete-all':
            await Product.updateMany({ _id: { $in: ids } }, { deleted: true, deletedAt: new Date() })
            break;
        case 'change-position':           
            for( let item of ids) {
                let [id, position] = item.split('-')
                position = parseInt(position)
                await Product.updateOne({ _id: id}, { position: position})
            }
            break;
        default:
            break;
    }

    const backUrl = req.get('Referrer')
    res.redirect(backUrl)
}

//[DELETE] /admin/products/delete/:id
module.exports.delete = async (req, res) => {
    const id = req.params.id

    //Xóa mềm sản phẩm bằng cách đánh dấu deleted = true
    await Product.updateOne({ _id: id }, {
        deleted: true,
        deletedAt: new Date() // Them thoi gian xoa
        })

    //Xóa vĩnh viễn sản phẩm bằng cách xóa document trong database
    //await Product.deleteOne({ _id: id })

    const backUrl = req.get('Referrer')
    res.redirect(backUrl)
}

//[GET] /admin/products/trash
module.exports.trash = async (req, res) => {
    
    //lấy dữ liệu từ database
    const productsRaw = await Product.find({ deleted: true }).lean() 
    //tạo mới một mảng mới để lưu trữ dữ liệu đã được format thời gian
    const products = productsRaw.map((product) => { 
        return {
            ...product, //gán dữ liệu từ database vào product
            deletedAtFormatted: product.deletedAt
                ? product.deletedAt.toLocaleString('vi-VN', {
                      timeZone: 'Asia/Ho_Chi_Minh',
                  })
                : '',
        }
    })

    res.render("admin/pages/products/trash", {
        titlePage: "Sản phẩm bị xóa",
        products: products
    })
}
//[PATCH] /admin/products/trash/restore/:id
module.exports.restore = async (req, res) => {
    const id = req.params.id
    

    await Product.updateOne({ _id: id }, { deleted: false, deletedAt: null })

    const backUrl = req.get('Referrer')
    res.redirect(backUrl)
}