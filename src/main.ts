import { createApp } from 'vue'
import './style.css'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import 'vuetify/_styles.scss'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import { router } from './routes'
import { createPinia } from 'pinia'

const app = createApp(App);
const vuetify = createVuetify({ components, directives,
  icons: {
    defaultSet: 'mdi',
  },
 })
const pinia = createPinia()

app.use(vuetify)
app.use(router)
app.use(pinia)
app.mount('#app')

export default app;
