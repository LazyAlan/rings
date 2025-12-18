<script setup lang="ts">
import { ref } from "vue";
import utils from "../common/utils";

const content = ref("");
console.log("page1 init");
console.log(utils);
</script>

<template>
  <div class="container">
    <h1>page 1</h1>
    <el-input v-model="content" placeholder="请输入内容" />
    <div>{{ content }}</div>
  </div>
</template>

<style scoped></style>
