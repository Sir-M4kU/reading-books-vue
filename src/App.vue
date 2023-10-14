<script setup lang="ts">
import { useBooksStore } from './hooks/useBooksStore'
import { storeToRefs } from 'pinia'
import BooksList from './components/BooksList.vue'
import Filters from './components/Filters.vue'
import ReadingList from './components/ReadingList.vue'

const store = useBooksStore()
const { readingBooks, sortedBooks } = storeToRefs(store)
</script>

<template>
  <header>
    <h1>Reading List</h1>
    <Filters />
  </header>
  <main>
    <aside class="books">
      <span class="counter" v-if="sortedBooks.length > 0">Books to add: {{ sortedBooks.length }}</span>
      <BooksList v-if="sortedBooks.length > 0" :books="sortedBooks" />
      <span v-else>No books to add</span>
    </aside>
    <aside class="reading-list">
      <span class="counter" v-if="readingBooks.length > 0">Books to read: {{ readingBooks.length }}</span>
      <ReadingList v-if="readingBooks.length > 0" :books="readingBooks" />
      <span v-else>No books to read right now</span>
    </aside>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  display: flex;
  margin-top: 16px;
  gap: 8px;
}
.books {
  width: 100%;
}
.counter {
  font-weight: 700;
  display: block;
  margin-bottom: 16px;
}
</style>