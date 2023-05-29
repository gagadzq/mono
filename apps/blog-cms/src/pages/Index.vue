<template>
  <Layout />
</template>

<script setup lang="ts">
import Layout from '@/components/layout/Layout.vue'
import { useAccountInfo } from '@/store'

useAccountInfo().getAccountInfo()
</script>
