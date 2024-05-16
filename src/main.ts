/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createI18n } from 'vue-i18n'
const i18n = createI18n({
    locale: navigator.language.substring(0,2), // set locale
    fallbackLocale: 'en', // set fallback locale
    legacy: false
    // If you need to specify other options, you can set other options
    // ...
})

// Plugins
import { registerPlugins } from './plugins'

// import { useI18n } from 'vue-i18n';
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import vuetify from './plugins/vuetify'

const app = createApp(App)
// app.use(vuetify)
app.use(createPinia())
app.use(i18n)
registerPlugins(app)
app.mount('#app')
