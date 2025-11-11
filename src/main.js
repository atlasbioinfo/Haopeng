import { createApp } from 'vue'
import './assets/style.css'
import App from './App.vue'

// Naive UI uses meta tags to inject global styles
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

createApp(App).mount('#app')
