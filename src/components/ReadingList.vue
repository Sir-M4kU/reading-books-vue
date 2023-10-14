<script setup lang="ts">
import { useBooksStore } from '../hooks/useBooksStore'
import type { Book } from '../types.d'

const { removeBook } = useBooksStore()

defineProps<{
  books: Book[]
}>()
</script>

<template>
  <ul>
    <li v-for="book of books" :key="book.ISBN">
      <button @click="() => removeBook(book.ISBN)">
        <img :src="book.cover" :alt="book.title" />
      </button>
    </li>
  </ul>
</template>

<style scoped>
img {
  cursor: pointer;
  border-radius: 8px;
}
ul {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
li {
  list-style: none;
}
img {
  width: 100px;
  height: auto;
}
</style>
