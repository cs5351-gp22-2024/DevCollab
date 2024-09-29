<template>
  <div class="container">
    <h1>Home page</h1>
    <p>Messages from Home: {{ store.messages }}</p>
    <br />
    <br />
    <h2 class="example">SCSS is available! But CSS can still be used!</h2>
    <br />
    <br />
    <h2>Bootstrap is ready! Example:</h2>
    <button class="btn btn-primary">Click me!</button>
    <br />
    <br />
    <h2>Font family has been set: Montserrat Alternates</h2>
    <p class="light-text">This is light text.</p>
    <p class="emphasis">This is emphasized text.</p>
  </div>
</template>

<script setup lang="ts">
import { useHomeStore } from './home.store'
import _ from 'lodash'

const store = useHomeStore()

console.log(_.capitalize('lodash will make the project easy!'))

// Remove duplicates from an array
const uniqueArray = _.uniq([1, 2, 2, 3, 4, 4, 5])
console.log(uniqueArray) // [1, 2, 3, 4, 5]

// Deep clone an object
const original = { a: 1, b: { c: 2 } }
const clone = _.cloneDeep(original)
console.log(clone)

// Merge objects
const object = { a: [{ b: 2 }, { d: 4 }] }
const other = { a: [{ c: 3 }, { e: 5 }] }
const merged = _.merge({}, object, other)
console.log(merged) // { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
</script>

<!-- 
if CSS, no need to add lang="scss"
better to use scss
scope means the css will only be applied to this file
-->
<style lang="scss" scoped>
.example {
  color: $primary-color;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
}
</style>
