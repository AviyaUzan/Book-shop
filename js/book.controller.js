'use strict'

function onInit() {
    renderBooks()
    renderFilterByQueryStringParams()
}

function renderBooks() {
    var books = getBooksForDisplay ()

    var strHTMLs = books.map(
        (book) => `
        <tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td><img src="${book.imgUrl}"></td>
                <td>${book.price}</td>
                <td>${book.rate}</td>
                <td>
                <button onclick="onRead('${book.id}')">Read</button>
                <button onclick="onUpdateBook ('${book.id}')">Update</button>
                <button onclick="onRemoveBook('${book.id}')">Delete</button>
                </td>
        </tr>
        `
    ) 
    var elTbody = document.querySelector('tbody')
    elTbody.innerHTML = strHTMLs.join('')  
    console.log('strHTML',strHTMLs)
}

function onRemoveBook(bookId) {
    console.log('bookId',bookId)
    removeBook(bookId)
    renderBooks()
}

function onAddBook() {
    var name = prompt('Book Name')
    var price = +prompt('Book Price')
    if(name && price) {
       addbook(name, price)
        renderBooks()
    }
}

function onUpdateBook(bookId) {
    // ev.preventDefault() 
    const book = getBookById(bookId) 
    var newPrice = +prompt('Enter new price', book.price)
    if(newPrice) {
        updateBook(bookId, newPrice)
        renderBooks()
    }
}

function onRead(bookId) {

var book = getBookById(bookId)
var elModal = document.querySelector('.modal')
elModal.querySelector('.book-name').innerText = book.name 
elModal.querySelector('.book-price').innerText = book.price
elModal.querySelector('.book-id').innerText = book.id
elModal.classList.remove('hidden')
// make the rate box remember the rate of the currBook
elModal.querySelector('input').value = book.rate 
}

function onCloseModal() {
    document.querySelector('.modal').classList.add('hidden')
}

function onChangeRate () {
    var bookId = document.querySelector('.book-id').innerText
    changeRate(bookId)
    renderBooks()
}

function onSetFilter(filterBy) {
    filterBy = setFilter(filterBy)
    renderBooks()

    console.log(filterBy);
    const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&txt=${filterBy.txt}`
    const newUrl = window.location.protocol + '//' + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderFilterByQueryStringParams() {
    // Retrieve data from the current query-params
    const queryStringParams = new URLSearchParams(window.location.search)

    const filterBy = {
        // maxPrice: 0, minRate: 0, txt: ''
        maxPrice:  +queryStringParams.get('maxPrice') || 0,
        minRate: +queryStringParams.get('minRate') || 0,
        txt: queryStringParams.get('txt') || '',
    }
    if (!filterBy.maxPrice && !filterBy.minRate && !filterBy.txt) return

    document.querySelector('.max-price').value = filterBy.maxPrice
    document.querySelector('.min-rate').value = filterBy.minRate
    document.querySelector('.search').value = filterBy.txt
    setBookFilter(filterBy)

  }

function onNextPage() {
    nextPage ()
    renderBooks()
}


