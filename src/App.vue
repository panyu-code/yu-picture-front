<template>
  <div id="app">
    <BasicLayout />
  </div>
</template>

<script setup lang="ts">
import BasicLayout from '@/layouts/basic/BasicLayout.vue'
import { startExpirationChecker } from '@/util'
// 在应用启动时启动检查器
startExpirationChecker();
</script>

<style scoped></style>
