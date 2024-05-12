import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import Router from './router'
const app = createApp(App)
app.use(ElementPlus)
app.use(Router)
app.mount('#app')
