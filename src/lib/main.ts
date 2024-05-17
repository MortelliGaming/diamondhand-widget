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

export { WalletName } from './wallet/Wallet'
// I18n

// Components
import DhConnectWallet from '../components/ConnectWallet/ConnectWallet.vue'
import DhTxDialog from '../components/TxDialog/TxDialog.vue'

// Stores
import { useWalletStore } from './stores/wallet'
import { useBlockchainStore } from './stores/blockchain'
import { useTransactionStore } from './stores/transaction'
import { createPinia } from 'pinia'
import { WalletName } from './wallet/Wallet';

const DiamondhandWidgetPlugin = (app: App)=> {
    // registerPlugins(app)
    app.use(createPinia())
    // app.use(i18n)
    return app;
}

export { 
    // Plugin
    DiamondhandWidgetPlugin, 
    // Stores
    useWalletStore,
    useBlockchainStore,
    useTransactionStore,
    DhConnectWallet,
    DhTxDialog
}