import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import {
  HomeFilled, Notebook, Collection, Camera
} from '@element-plus/icons-vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'main',
    redirect: '/home',
    component: () => import('@/pages/Index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/pages/home/Home.vue'),
        meta: {
          title: '首页',
          isMenu: true,
          icon: HomeFilled
        }
      },
      {
        path: '/note',
        name: 'note',
        redirect: '/note/list',
        meta: {
          title: '文章管理',
          isMenu: true,
          icon: Notebook
        },
        children: [
          {
            path: '/note/list',
            name: 'noteList',
            component: () => import('@/pages/note/NoteList.vue'),
            meta: {
              title: '文章列表',
              isMenu: true
            }
          },
          {
            path: '/note/add',
            name: 'addNote',
            component: () => import('@/pages/note/noteManage.vue'),
            meta: {
              title: '新建文章'
            }
          },
          {
            path: '/note/edit',
            name: 'editNote',
            component: () => import('@/pages/note/noteManage.vue'),
            meta: {
              title: '修改文章'
            }
          },
          {
            path: '/category/list',
            name: 'categoryList',
            component: () => import('@/pages/category/CategoryList.vue'),
            meta: {
              title: '分类管理',
              isMenu: true
            }
          },
          {
            path: '/tags/list',
            name: 'tagList',
            component: () => import('@/pages/tags/TagList.vue'),
            meta: {
              title: '标签管理',
              isMenu: true
            }
          },
        ]
      },
      {
        path: '/collection',
        name: 'collection',
        redirect: '/development',
        meta: {
          title: '收藏夹',
          isMenu: true,
          icon: Collection
        }
      },
      {
        path: '/life',
        name: 'life',
        redirect: '/development',
        meta: {
          title: '生活',
          isMenu: true,
          icon: Camera
        }
      },
      {
        path: '/development',
        name: 'inDevelopment',
        component: () => import('@/pages/inDevelopment/InDevelopment.vue'),
        meta: {
          title: '开发中'
        }
      },
      {
        path: '/:pathMatch(.*)',
        component: () => import('@/pages/404-page.vue'),
        meta: {
          title: '404 NOT FOUND'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login/Login.vue')
  },
]

const router = createRouter({
  history: createWebHistory('/admin/'),
  routes,
})

router.beforeEach((to, from) => {
  if (to.path !== "/login") {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      return "/login"
    }
  }
})

export default router