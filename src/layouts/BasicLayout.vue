<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://www.codefather.cn" target="_blank"> 编程导航 By CodeFather </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobalHeader from '@/components/GlobalHeader.vue'
</script>

<style scoped>
#basicLayout .header {
  padding-inline: 20px;
  background: #fff;
  color: unset;
  margin-bottom: 16px;
}

#basicLayout .content {
  padding: 20px;
  background: linear-gradient(to right, #fff, #f9f9f9);
  margin-bottom: 30px;
}

#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  font-weight: bolder;
}
</style>
