
import { createPinia } from 'pinia'
import type { App } from 'vue'
export type { 
    BlockchainConfigSimple,
    TxDialogParams,
    DelegateParams,
    DepositParams,
    RedelegateParams,
    SendParams,
    UnbondParams,
    VoteParams,
} from '../lib/utils/type'

// I18n

// Components
import DhConnectWallet from '../components/ConnectWallet/ConnectWallet.vue'
import DhTxDialog from '../components/TxDialog/TxDialog.vue'

// Stores
import { useWalletStore } from '../stores/wallet'
import { useBlockchainStore } from '../stores/blockchain'
import { useTransactionStore } from '../stores/transaction'

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

export { 
    // Plugin
    DiamondhandWidgetPlugin, 
    // Stores
    useWalletStore,
    useBlockchainStore,
    useTransactionStore,
    // Components
    DhConnectWallet, 
    DhTxDialog,
};