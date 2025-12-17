<script setup lang="ts">
import { ref } from "vue";

const content = ref("");
console.log("page1 init");
</script>

<template>
  <div class="container">
    <h1>page 1</h1>
    <input v-model="content" placeholder="请输入内容" />
    <div>{{ content }}</div>
  </div>
</template>

<style scoped></style>
