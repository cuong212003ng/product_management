//ButtonStatus
const buttonsStatus = document.querySelectorAll('[button-status]')
if (buttonsStatus.length > 0) {

    let url = new URL(window.location.href)
    // console.log(url);

    buttonsStatus.forEach(button => {
        button.addEventListener('click', () => {
            const status = button.getAttribute('button-status')

            if (status) {
                url.searchParams.set('status', status)
            } else {
                url.searchParams.delete('status')
            }

            console.log(url.href);
            window.location.href = url.href

        })
    })
}
//End buttonStatus

//FormSearch
const formSearch = document.querySelector('#form-search')
if (formSearch) {
    let url = new URL(window.location.href)


    formSearch.addEventListener('submit', (e) => {
        e.preventDefault()
        const keyword = e.target.keyword.value

        if (keyword) {
            url.searchParams.set('keyword', keyword)
        } else {
            url.searchParams.delete('keyword')
        }

        window.location.href = url.href
    })
}
//End FormSearch

//ButtonPagination
const buttonPagination = document.querySelectorAll('[button-pagination]')
if (buttonPagination.length > 0) {
    let url = new URL(window.location.href)

    buttonPagination.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('button-pagination')
            url.searchParams.set('page', page)

            window.location.href = url.href
        })
    })
}
//End ButtonPagination

//CheckboxMulti
const checkboxMulti = document.querySelector('[checkbox-multi]')
if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector('input[name="checkAll"]')
    const inputIds = checkboxMulti.querySelectorAll('input[name="checkItem"]')

    if (inputCheckAll) {
        inputCheckAll.addEventListener('click', () => {
            if (inputCheckAll.checked) {
                inputIds.forEach(input => {
                    input.checked = true
                })
            }
            else {
                inputIds.forEach(input => {
                    input.checked = false
                })
            }
        })
    }


    inputIds.forEach(input => {
        input.addEventListener('click', () => {
            let countChecked = checkboxMulti.querySelectorAll('input[name="checkItem"]:checked').length

            if (countChecked == inputIds.length) {
                inputCheckAll.checked = true
            } else {
                inputCheckAll.checked = false
            }

        })
    })

}
//End CheckboxMulti

//FormChangeMulti
const formChangeMulti = document.querySelector('[form-change-multi]')
if (formChangeMulti) {

    formChangeMulti.addEventListener('submit', (e) => {
        e.preventDefault()

        const checkboxMulti = document.querySelector('[checkbox-multi]')
        const inputsChecked = checkboxMulti.querySelectorAll('input[name="checkItem"]:checked')


        const typeChange = e.target.type.value
        if (typeChange == 'delete-all') {
            const isConfirm = confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm này không?')

            if (!isConfirm) {
                return;
            }
        }

        if (inputsChecked.length > 0) {
            let ids = []
            const inputIds = formChangeMulti.querySelector('input[name="ids"]')

            inputsChecked.forEach(input => {
                const id = input.getAttribute('value')

                if (typeChange == 'change-position') {

                    const position = input.closest('tr').querySelector('input[name="position"]').value

                    ids.push(`${id}-${position}`)

                } else {

                    ids.push(id)
                }
            })

            inputIds.value = ids.join(",")
            formChangeMulti.submit()
        }
    })
}
//End FormChangeMulti

//Show Alert
const showAlert = document.querySelector('[show-alert')

if(showAlert) {
    const time = showAlert.getAttribute('data-time')
    const closeAlert = showAlert.querySelector('[close-alert]')

    setTimeout(() => {
    showAlert.classList.add('alert-hidden')
    }, time)

    closeAlert.addEventListener('click', () => {
        showAlert.classList.add('alert-hidden')
    })
}


//End Show Alert