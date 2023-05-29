<script setup lang="ts">
import { RouteRecordName, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import { useAccountInfo } from "@/store";

const accountInfo = useAccountInfo().info

const userRouter = useRouter()
const logout = () => {
  userRouter.push({
    name: 'login'
  })
}

const { currentRoute } = userRouter
const breadcrumbItems = ref<{
  name?: RouteRecordName;
  title: string;
}[]>([]);
watch(
  () => currentRoute.value,
  (route) => {
    const list = route.matched.filter((item) => item.name !== "main");
    
    breadcrumbItems.value = list.map((item) => {
      return {
        name: item.name,
        title: item.meta.title as string
      }
    })
  },
  { immediate: true }
)

</script>

<template>
  <header class="header-pc">
    <div class="header-left flex">
      <!-- <img src="../../assets/images/icon.png" class="icon" alt="爬爬の小破站"> -->
      <!-- <h1 class="title flex-center">爬爬の小破站</h1> -->
      <el-breadcrumb separator-class="el-icon-arrow-right" separator="/">
        <TransitionGroup
          appear
          enter-active-class="animate__animated animate__fadeInRight"
        >
          <el-breadcrumb-item :to="{ path: '/' }" key="home">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="breadItem in breadcrumbItems" :key="breadItem.name">{{ breadItem.title }}</el-breadcrumb-item>
        </TransitionGroup>
      </el-breadcrumb>
    </div>
    <div class="header-right flex">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ accountInfo.nickname || 'admin'}}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- <a v-else class="login-btn">登录</a> -->
    </div>
  </header>
</template>

<style lang="less">
.header {
  padding: 0 12px;
  background: #fff;
  box-shadow: 0px 4px 8px 0px #e9e9e9;
}

.header-pc {
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background: #fff;
  padding: 20px 18px 20px 10px;
  .header-left {
    align-items: center;
    padding: 5px 12px;
    .icon {
      width: 20px;
    }
    .title {
      display: inline-flex;
      font-size: 18px;
      padding: 10px 8px;
      font-weight: 400;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    .login-btn {
      font-size: 14px;
    }
    .el-dropdown-link {
      cursor: pointer;
    }
  }
}
</style>
