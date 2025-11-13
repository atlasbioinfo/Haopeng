import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'

// Naive UI uses meta tags to inject global styles
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

const app = createApp(App)

// Register particles plugin
app.use(Particles, {
  init: async engine => {
    await loadSlim(engine)
  }
})

app.mount('#app')
