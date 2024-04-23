import { FunctionPlugin } from 'vue'

// Import Vue types
export type { 
    BlockchainConfigSimple,
    TxDialogParams,
    DelegateParams,
    DepositParams,
    RedelegateParams,
    SendParams,
    UnbondParams,
    VoteParams,
} from './src/lib/utils/type'

// Plugin
declare const DiamondhandWidgetPlugin: FunctionPlugin<[]>
export { DiamondhandWidgetPlugin }

// Stores
export function useWalletStore(): typeof import('./src/lib/stores/wallet')['useWalletStore']
export function useBlockchainStore(): typeof import('./src/lib/stores/blockchain')['useBlockchainStore']
export function useTransactionStore(): typeof import('./src/lib/stores/transaction')['useTransactionStore']

// Components
export const DhConnectWallet: typeof import('./src/components/ConnectWallet/ConnectWallet.vue')['default']
export const DhTxDialog: typeof import('./src/components/TxDialog/TxDialog.vue')['default']