/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
// import { components, directives } from 'vuetify/dist/vuetify.js'

import components from 'vuetify/dist/vuetify.js'
import directives from 'vuetify/dist/vuetify.js'
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

import { createI18n } from 'vue-i18n'
import { messages } from './lib/i18n'
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
// import vuetify from './plugins/vuetify'

const app = createApp(App)
// app.use(vuetify)
app.use(i18n)
registerPlugins(app)
app.mount('#app')
