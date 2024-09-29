import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { usePinia } from './vendors/pinia'
import { useVuetify } from './vendors/vuetify'

const app = createApp(App)

app.use(useVuetify())
app.use(usePinia())
app.use(router)

app.mount('#app')
