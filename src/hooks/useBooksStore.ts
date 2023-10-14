import { Genres, type Book } from '../types.d'
import { ref, computed, onMounted, watchEffect, watch } from 'vue'
import { defineStore } from 'pinia'
import { GENRES, BOOKS_STORAGE, BOOKS_TO_READ } from '../consts'
import { getBooks, extractGenres } from '../services/books'

export const useBooksStore = defineStore('books', () => {
  const books = ref<Book[]>([])
  const booksGenre = ref<string[]>([])
  const readingBooks = ref<Book[]>([])
  const filter = ref<Genres>(GENRES.All)
  const sorting = ref(100)
  
  const onStorageUpdate = (event: StorageEvent) => {
    const { key, newValue } = event
    if (newValue != null)
    {
      if (key === BOOKS_STORAGE)
      {
        books.value = JSON.parse(newValue)
      } else if (key === BOOKS_TO_READ)
      {
        readingBooks.value = JSON.parse(newValue)
      }
    }
  }

  onMounted(() => {
    const booksStorage = localStorage.getItem(BOOKS_STORAGE)
    const booksToReadStorage = localStorage.getItem(BOOKS_TO_READ)
    const storageExists = (
      (booksStorage != null && booksStorage !== undefined) && 
      (booksToReadStorage != null && booksToReadStorage !== undefined) &&
      (booksStorage.length > 0 && booksToReadStorage.length > 0)
    )

    if (storageExists) {
      const newBooks: Book[] = JSON.parse(booksStorage)
      const newReadingBooks: Book[] = JSON.parse(booksToReadStorage)

      booksGenre.value = extractGenres(newBooks)
      books.value = newBooks
      readingBooks.value = newReadingBooks
    } else {
      getBooks()
        .then(res => {
          books.value = res
          booksGenre.value = extractGenres(res)
        })
    }
  })
  watch(books, () => {
    localStorage.setItem(BOOKS_STORAGE, JSON.stringify(books.value))
  })
  watch(readingBooks, () => {
    localStorage.setItem(BOOKS_TO_READ, JSON.stringify(readingBooks.value))
  })

  watchEffect(() => {
    // if (books.value.length !== 0) {
    //   localStorage.setItem(BOOKS_STORAGE, JSON.stringify(books.value))
    //   localStorage.setItem(BOOKS_TO_READ, JSON.stringify(readingBooks.value))
    // }
    window.addEventListener('storage', onStorageUpdate)
    return () => {
      window.removeEventListener('storage', onStorageUpdate)
    }
  })

  const filteredBooks = computed(() => {
    if (filter.value === GENRES.All) return books.value
    return books.value.filter(book => book.genre === filter.value)
  })
  const sortedBooks = computed(() => {
    return filteredBooks.value.filter(book => book.pages >= sorting.value)
  })

  function addBook (id: string) {
    const book = books.value.find(book => book.ISBN === id)
    const bookIndex = books.value.findIndex(book => book.ISBN === id)
    let newBooks: Book[]

    // if toSpliced method exist
    if (Array.prototype.toSpliced != null) {
      newBooks = books.value.toSpliced(bookIndex, 1)
    } else { // For testing pruposes
      newBooks = [...books.value].splice(bookIndex, 1)
    }
      if (book != null) {
      const newReadingBooks = [...readingBooks.value, book]
        readingBooks.value = newReadingBooks
      }
      books.value = newBooks
  }
  function removeBook (id: string) {
    const book = readingBooks.value.find(book => book.ISBN === id)
    if (book != null) {
      const newBooks = [...books.value, book]
      books.value = newBooks
    }
    const newReadingBooks = readingBooks.value.filter(book => book.ISBN !== id)
    readingBooks.value = newReadingBooks
  }

  return {
    books,
    filter,
    sortedBooks,
    sorting,
    booksGenre,
    readingBooks,
    addBook,
    removeBook
  }
})
