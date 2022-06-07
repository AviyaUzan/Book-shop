'use strict';
const STORAGE_KEY = 'bookDB'
const PAGE_SIZE = 2

var gBooks
var gFilterBy = {maxPrice: 0, minRate: 0, txt: '' }
var gPageIdx = 0



_createBooks()

function nextPage () {
    gPageIdx++
    if(gPageIdx * PAGE_SIZE >= gBooks.length) {
        gPageIdx = 0
    }
}

function getBooksForDisplay () {
    if(!gFilterBy) return gBooks

        var books = gBooks

        // var filteredBooks = filterBooks(books)

        if(gFilterBy.maxPrice){
            books = books.filter((book) =>
            book.price <= gFilterBy.maxPrice)
        }

        if(gFilterBy.minRate){
            books = books.filter((book) =>
            book.rate >= gFilterBy.minRate)
        }
        
        if(gFilterBy.txt){
            books = books.filter((book) =>
            book.name.includes(gFilterBy.txt))
        }

        const startIdx = gPageIdx * PAGE_SIZE
        books = books.slice(startIdx, startIdx + PAGE_SIZE)
        return books   
        
        // const startIdx = gPageIdx * PAGE_SIZE
        // filteredBooks = filteredBooks.slice(startIdx, startIdx + PAGE_SIZE)
        // return filteredBooks    
}

// function filterBooks(books) {
//     var filterBooks = []

//     if(gFilterBy.maxPrice){
//         filterBooks = books.filter((book) =>
//         book.price <= gFilterBy.maxPrice)
//     }

//     if(gFilterBy.minRate){
//         filterBooks = books.filter((book) =>
//         book.rate >= gFilterBy.minRate)
//     }
    
//     if(gFilterBy.txt){
//         filterBooks = books.filter((book) =>
//         book.name.includes(gFilterBy.txt))
//     }

//     return filterBooks

// }

function removeBook(bookId) {
    const bookIdx = gBooks.findIndex((book) =>
    bookId === book.id)
    gBooks.splice(bookIdx,1)
    _saveBooksToStorage()
}

function addbook(name, price) {
    const randImg = rand(0, 3)
    const book = _createBook(name, price, `img/${randImg}.png`)
    gBooks.unshift(book) // unshift place this at the start of the array
    _saveBooksToStorage()
    gPageIdx = 0
    return book 
}

function getBookById(bookId) {
    const book = gBooks.find((book) => bookId === book.id)
    return book
}

function updateBook(bookId, newPrice) {
    const book = gBooks.find((book) => book.id === bookId) // func get book by id
    book.price = newPrice
    _saveBooksToStorage()
    return book
}

function changeRate(bookId) {
    const elRate = document.querySelector('[name=rate]')
    const book = gBooks.find((book) => book.id === bookId)
    book.rate = elRate.value
    _saveBooksToStorage()
    return book
}

function setBookFilter(filterBy = {}) {
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    return gFilterBy
  }

function setFilter(filterBy) {
    gFilterBy = {
        ...gFilterBy,
        ...filterBy
    }
    return gFilterBy;
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    // if there is nothing in storage - demo data
    if(!books || !books.length) {
        books = [
        _createBook('Learning Laravel', 18.90, "img/0.png"),
        _createBook('Beginning with Laravel', 6.65, "img/1.png"),
        _createBook('Java for developers', 7.20, "img/2.png")
        ]
    }
    gBooks = books
    _saveBooksToStorage()
}

function _createBook(name, price, imgUrl) {
    return {
        id: makeId(),
        name,
        price,
        imgUrl, 
        rate: 0,
    }
}

function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks);
}
