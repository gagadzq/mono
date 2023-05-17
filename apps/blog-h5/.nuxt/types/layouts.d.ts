import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default"
declare module "/Users/ZoeyDing/Desktop/papa-blog-mono/node_modules/.pnpm/nuxt@3.5.0_@types+node@18.0.0_eslint@8.40.0_less@4.1.3_typescript@5.0.4/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}