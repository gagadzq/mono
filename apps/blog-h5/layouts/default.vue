<template>
  <div class="common-layout">
    <slot></slot>
    <!-- <el-container style="height: 100%">
      <Header class="header" />
      <el-scrollbar class="container-scroll">
        <RouterView class="container"></RouterView>
      </el-scrollbar>
    </el-container> -->
  </div>
</template>

<script setup lang="ts">
// import Header from './Header.vue'
// import { useIsMobileScreen } from '@/store'

// const isMobileScreen = useIsMobileScreen()

const handleResizeWindow = () => {
  const width = document.body.clientWidth
  // isMobileScreen.value = width < 768
}

handleResizeWindow()
window.addEventListener('resize', handleResizeWindow)

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResizeWindow)
})
</script>

