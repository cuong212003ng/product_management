module.exports.search = (query) => {
    let objectSearch = {
        keyword: "",
        regex: ""
    }

    if(query.keyword) {
        objectSearch.keyword = query.keyword

        const regex = new RegExp(objectSearch.keyword, 'i') // tim hieu them kien thuc regex

        objectSearch.regex = regex

    }

    return objectSearch
}