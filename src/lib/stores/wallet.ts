import { defineStore, storeToRefs } from 'pinia';

import { type Ref, ref } from 'vue';

import { 
    WalletName,
    createWallet,
    writeWallet,
    removeWallet, 
    type ConnectedWallet,
    type Account
} from '../wallet/Wallet'
import { getBalance } from '../utils/http';
import type { Coin } from '../utils/type';
import { useBlockchainStore } from './blockchain';
import { TokenUnitConverter } from '../utils/TokenUnitConverter';

export const useWalletStore = defineStore('dh-wallet', () => {
  const connectedWallet: Ref<ConnectedWallet|null> = ref(null)// ref(readWallet(selectedWallet.value, props.hdPath) as ConnectedWallet);

  const accountBalances: Ref<Coin[]> = ref([])
  const sending = ref(false);
  const error = ref('');

  const walletList = ref([
    {
        wallet: WalletName.Keplr,
        logo: 'https://ping.pub/logos/keplr-logo.svg',
    },
    {
        wallet: WalletName.Ledger,
        logo: 'https://ping.pub/logos/ledger.webp',
    },
    {
        wallet: WalletName.Leap,
        logo: 'https://assets.leapwallet.io/logos/leap-cosmos-logo.svg',
    },
    {
        wallet: WalletName.Metamask,
        logo: 'https://ping.pub/logos/metamask.png',
    }
  ]);

  async function loadBalances() {
    const { selectedBlockchain, coinMetadatas } = storeToRefs(useBlockchainStore())
    const balancesResult = await getBalance(selectedBlockchain.value?.api[0] ?? '', connectedWallet.value?.cosmosAddress ?? '')
    
    const converter = new TokenUnitConverter(Object.assign({},coinMetadatas.value))
    // convert to display denom
    const balances = balancesResult.balances.map(b => {
      try {
        return converter.baseToDisplay(b)
      } catch {
        return b
      }
    });
    accountBalances.value = [...balances, ...balancesResult.balances];
  }

  async function connect(walletName: WalletName, chainId: string, hdPath: string, addrPrefix: string) {
    sending.value = true;
      error.value = '';
      let accounts = [] as Account[];
      try {
          const wa = createWallet(walletName, {
              chainId: chainId,
              hdPath: hdPath,
              prefix: addrPrefix,
          });
          accounts = await wa.getAccounts();
          if (accounts.length > 0) {
              const [first] = accounts;
              connectedWallet.value = {
                  wallet: walletName,
                  cosmosAddress: first.address,
                  evmAddress: first.evmAddress,
                  hdPath: hdPath,
                  accounts
              };
              writeWallet(connectedWallet.value);
              loadBalances()
          }
      } catch (e: any) {
          error.value = e.message;
      }
      sending.value = false;
      return Promise.resolve(connectedWallet.value)
  }

  function disconnect() {
    removeWallet(connectedWallet.value?.wallet || WalletName.Keplr, connectedWallet.value?.hdPath || '');
    connectedWallet.value = null;
  }

  return { 
    walletList,
    connectedWallet,
    sending,
    error,
    accountBalances,
    connect,
    disconnect
  }
})