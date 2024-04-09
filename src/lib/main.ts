
import { createPinia } from 'pinia'
import { App } from 'vue'

// I18n
import { createI18n, useI18n } from 'vue-i18n'
import { messages } from './i18n'

// Components
import DhConnectWallet from '../components/ConnectWallet/ConnectWallet.vue'
import DhTxDialog from '../components/TxDialog/index.vue'

// Stores
import { useWalletStore } from '../stores/wallet'

const DiamondhandWidgetPlugin = (app: App)=> {
    const i18n = createI18n({
        locale: navigator.language.substring(0,2), // set locale
        fallbackLocale: 'en', // set fallback locale
        legacy: false
    })
    // registerPlugins(app)
    app.use(createPinia())
    // app.use(i18n)
    app.component(
        "dh-connect-wallet",
        DhConnectWallet
    );
    app.component(
        "dh-tx-dialog",
        DhConnectWallet
    );
    return app;
}

export { DiamondhandWidgetPlugin, DhConnectWallet, DhTxDialog, useWalletStore };