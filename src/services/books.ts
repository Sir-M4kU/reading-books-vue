import type { Book } from '../types.d'

export async function getBooks () {
  const books = await import('../mocks/books.json')
  // For extracting the book property
  const mappedBooks = books.default.library.map(book => book.book)
  return mappedBooks
}

export function extractGenres (arrayOfBooks: Book[]) {
  const arrayOfGenres: string[] = ['Todos']
  for (const book of arrayOfBooks) {
    const genreIndex = arrayOfGenres.indexOf(book.genre)
    if (genreIndex === -1) arrayOfGenres.push(book.genre)
  }
  return arrayOfGenres
}
