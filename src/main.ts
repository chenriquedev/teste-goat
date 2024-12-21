import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/_styles.scss'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'
import { router } from './routes'

const vuetify = createVuetify({ components, directives })

const app = createApp(App);
app.use(vuetify)
app.use(router)
app.mount('#app')

export default app;
