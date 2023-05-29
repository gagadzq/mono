<script lang="ts" setup>
import { shallowRef, DefineComponent } from 'vue'; 
import router from '@/routers'
import { RouteRecordRaw, RouteRecordName, RouteRecordNormalized } from 'vue-router';

type Tabs = {
	name: any,
	title: unknown,
	icon: unknown,
  children: Tabs[]
}

const allRoutes = router.getRoutes()
let menus: Tabs[] = []
const initMenu = (detail: RouteRecordRaw):Tabs => ({
  name: detail.name || '',
  title: detail.meta?.title,
  icon: detail.meta?.icon,
  children: []
})
allRoutes
  .find(item => item.name === 'main')
  ?.children
  .forEach(item => {
    if (item.meta?.isMenu) {
      let menuInfo = initMenu(item)
      item.children && item.children.length && item.children.forEach(child => {
        if (child.meta?.isMenu) {
          menuInfo.children.push(initMenu(child))
        }
      });
      menus.push(menuInfo)
    }
  }
);
const menuList = shallowRef<Tabs[]>(menus)

</script>

<template>
  <el-aside width="180px" class="aside">
    <el-scrollbar>
      <div class="site-title">
        <h1>Blog Admin</h1>
      </div>
      <el-menu style="border: none">
        <template v-for="(item, index) in menuList" :key="index">
          <el-sub-menu v-if="item.children?.length" :index="item.name">
            <template #title>
              <el-icon class="nav-icon">
                <component :is="item.icon"></component>
              </el-icon>
              <span>{{ item.title }}</span>
            </template>
            <router-link v-for="(menu, index) in item.children" :key="menu.name" :to="{ name: menu.name }">
              <el-menu-item :index="menu.name">
                {{ menu.title }}
              </el-menu-item>
            </router-link>
          </el-sub-menu>
          <router-link v-else :to="{ name: item.name }">
            <el-menu-item :index="item.name">
              <template #title>
                <el-icon class="nav-icon">
                  <component :is="item.icon"></component>
                </el-icon>
                {{ item.title }}
              </template>
            </el-menu-item>
          </router-link>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style lang="less" scoped>
.aside {
  box-shadow: 2px 0px 9px 0px #e9e9e9;
}
.site-title {
  text-align: center;
  height: 64px;
  line-height: 64px;
}
</style>
