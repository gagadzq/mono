import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/ZoeyDing/Desktop/papa-blog-mono/node_modules/.pnpm/nuxt@3.5.0_@types+node@18.0.0_eslint@8.40.0_less@4.1.3_typescript@5.0.4/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}