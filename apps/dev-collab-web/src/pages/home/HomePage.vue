<template>
  <div>
    <h1>Home page</h1>
    <p>Messages from Home: {{ store.messages }}</p>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from './home.store'

const store = useHomeStore()
</script>
