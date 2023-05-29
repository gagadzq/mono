import { createApp } from 'vue'
import './style.less'
import './assets/styles/variables.less'
import App from './App.vue'
import router from './routers/index'
import { createPinia } from 'pinia'

import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'
import 'element-plus/dist/index.css'
// import 'element-plus/es/components/message/style/css'
import 'animate.css'

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
})

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(VueMarkdownEditor)

app.mount('#app')
