import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { usePinia } from './vendors/pinia'
import { useVuetify } from './vendors/vuetify'

// Import Bootstrap and its styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import './assets/styles.scss'


const app = createApp(App)

app.use(useVuetify())
app.use(usePinia())
app.use(router)

app.mount('#app')
