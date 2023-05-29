<template>
  <div class="common-layout">
    <el-container style="height: 100%">
      <AsideMenu />
      <el-container class="container">
        <el-header style="padding: 0; height: 68px">
          <Header class="header" />
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
      <!-- <el-footer>
        <Footer></Footer>
      </el-footer> -->
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import AsideMenu from './AsideMenu.vue'
import Footer from './Footer.vue'
</script>

<style lang="less">
.header {
}
.common-layout {
  height: 100%;
}
</style>
