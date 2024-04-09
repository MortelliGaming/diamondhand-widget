
// Import Vue types
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
} from './utils/type'

// Plugin
declare const DiamondhandWidgetPlugin: (app: App) => App
export { DiamondhandWidgetPlugin }

// Stores
export function useWalletStore(): typeof import('./src/stores/wallet')['useWalletStore']
export function useBlockchainStore(): typeof import('./src/stores/blockchain')['useBlockchainStore']
export function useTransactionStore(): typeof import('./src/stores/transaction')['useTransactionStore']

// Components
export const DhConnectWallet: typeof import('./src/components/ConnectWallet/ConnectWallet.vue')['default']
export const DhTxDialog: typeof import('./src/components/TxDialog/index.vue')['default']