<script setup lang="ts">
import type { Book } from '../types.d'
import { useBooksStore } from '../hooks/useBooksStore'

const { addBook } = useBooksStore()

defineProps<{
  books: Book[]
}>()
</script>

<template>
  <div class="book-list">
    <article v-for="book of books" :key="book.ISBN">
      <button @click="() => addBook(book.ISBN)">
        <img :src="book.cover" :alt="book.title" />
      </button>
    </article>
  </div>
</template>

<style scoped>
img {
  width: 200px;
  height: auto;
  display: block;
  opacity: 1;
  backface-visibility: hidden;
  border-radius: 8px;
  cursor: pointer;
}
.book-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}
</style>