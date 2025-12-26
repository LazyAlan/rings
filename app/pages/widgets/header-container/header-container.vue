<!-- 全局头部菜单 -->
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    default: "System Management",
  },
});
</script>

<template>
  <el-container class="header-container">
    <el-header class="header">
      <el-row type="flex" align="middle">
        <el-row type="flex" align="middle">
          <img
            src="https://yweb0.cnliveimg.com/1607/img/2023/0914/230914140016194_337.jpeg"
            class="logo"
          />
          <el-row>{{ title }}</el-row>
        </el-row>
      </el-row>
    </el-header>
    <el-main class="main-container">
      <slot name="main-container"> </slot>
    </el-main>
  </el-container>
</template>

<style scoped lang="scss">
.header-container {
  height: 100%;
  min-width: 1000px;
  overflow: hidden;

  .header {
    max-height: 120px;
    border-bottom: 1px solid #e8e8e8;

    .logo {
      width: 40px;
      aspect-ratio: 1;
      clip-path: circle(30%);
    }
  }
  //   .mian-container {
  //   }
}

:deep(.el-header) {
  padding: 0;
}
</style>
