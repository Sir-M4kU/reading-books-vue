import { describe, it, beforeEach } from 'vitest'
import { setActivePinia, createPinia, storeToRefs } from 'pinia'
import { isRef } from 'vue'
import { useBooksStore } from '../hooks/useBooksStore'
import { getBooks } from '../services/books'
import { GENRES } from '../consts'

describe('Test useBooksStore...', async () => {
  const mockedBooks = await getBooks()

  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('books has to be a Ref', () => {
    const store = useBooksStore()
    const storeRef = storeToRefs(store)

    expect(isRef(storeRef.books)).toBe(true)
  })

  it('books has to save books', async () => {
    const store = useBooksStore()
    const { books } = storeToRefs(store)
    expect(books.value).toHaveLength(0)
    books.value = mockedBooks
    expect(books.value.length).toBeGreaterThan(1)
  })

  it('should be filter the books by zombie genre and return 1 book', () => {
    const store = useBooksStore()
    const { books, filter, sortedBooks } = storeToRefs(store)

    books.value = mockedBooks
    filter.value = GENRES.Zombies

    expect(sortedBooks.value.length).toBe(1)
  })

  it('should add a book in readingBooks', () => {
    const store = useBooksStore()
    const { books, readingBooks } = storeToRefs(store)
    const { addBook } = store

    books.value = mockedBooks
    expect(readingBooks.value.length).toBe(0)
    addBook(books.value[0].ISBN)
    expect(readingBooks.value.length).toBe(1)
  })

  it('should remove a book in readingBooks', () => {
    const store = useBooksStore()
    const { books, readingBooks } = storeToRefs(store)
    const { addBook, removeBook } = store

    books.value = mockedBooks
    addBook(books.value[0].ISBN)
    expect(readingBooks.value.length).toBe(1)
    removeBook(readingBooks.value[0].ISBN)
    expect(readingBooks.value.length).toBe(0)
  })
})
