
import { createPinia } from 'pinia'
import { App } from 'vue'

// I18n

// Components
import DhConnectWallet from '../components/ConnectWallet/ConnectWallet.vue'
import DhTxDialog from '../components/TxDialog/index.vue'

// Stores
import { useWalletStore } from '../stores/wallet'

const DiamondhandWidgetPlugin = (app: App)=> {
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