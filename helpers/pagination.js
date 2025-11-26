module.exports.pagination = (objectPagination, query, countProducts) => {
    if(query.page){
        objectPagination.currentPage = parseInt(query.page)       
    }

    // Trang hien tai - 1 * so luong san pham tren trang = so luong san pham can bo qua
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems
    
    
    const totalPage = Math.ceil(countProducts / objectPagination.limitItems)
    objectPagination.totalPage = totalPage
    
    return objectPagination
}