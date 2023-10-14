<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBooksStore } from '../hooks/useBooksStore'

const store = useBooksStore()
const { booksGenre, filter, sorting } = storeToRefs(store)
</script>

<template>
  <div class="filters">
    <div class="filter">
      <label for="filter-by-pages">Filter by pages: {{ sorting }}</label>
      <input id="filter-by-pages" v-model="sorting" type="range" step="100" min="100" max="1200" />
    </div>
    <div class="filter">
      <label for="filter-by-genre">Filter by genre</label>
      <select id="filter-by-genre" v-model="filter">
        <option v-for="genre of booksGenre" :key="genre">
          {{ genre }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  justify-content: space-between;
}
.filter {
  display: flex;
  flex-direction: column;
  align-items: start;
}
</style>