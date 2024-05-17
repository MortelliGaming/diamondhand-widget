import { defineStore, storeToRefs } from 'pinia';

import { type Ref, ref } from 'vue';

import { 
    WalletName,
    createWallet,
    writeWallet,
    removeWallet, 
    type ConnectedWallet,
    type Account,
    readWallet
} from '../wallet/Wallet'
import { getBalance } from '../utils/http';
import type { Coin } from '../utils/type';
import { useBlockchainStore } from './blockchain';
import { TokenUnitConverter } from '../utils/TokenUnitConverter';
import { coinType2HDPath } from '../utils/format';

export const useWalletStore = defineStore('dh-wallet', () => {
  // const connectedWallet: Ref<ConnectedWallet|null> = ref(null)// ref(readWallet(selectedWallet.value, props.hdPath) as ConnectedWallet);

  const connectedWallet: Ref<Partial<{
    [id in WalletName]: ConnectedWallet|undefined
  }>> = ref({
    [WalletName.Keplr]: undefined,
    [WalletName.Metamask]: undefined,
  })

  const accountBalances: Ref<Coin[]> = ref([])
  const sending = ref(false);
  const error = ref('');

  const { selectedBlockchain, coinMetadatas } = storeToRefs(useBlockchainStore())

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

  function loadWalletsFromLocalStorage() {
    for(const wallet in WalletName) {
      if(wallet) {
        const hdPath = coinType2HDPath(selectedBlockchain.value?.bip44.coinType)
        const savedWallet = readWallet(WalletName[wallet], hdPath) as ConnectedWallet
        if(savedWallet && Object.keys(savedWallet).length > 0) {
          connectedWallet.value[wallet] = savedWallet
        }
      }
    }
  }

  async function loadBalances() {
    for(const wallet of Object.values(connectedWallet.value)) {
      if(wallet) {
        const balancesResult = await getBalance(selectedBlockchain.value?.rest ?? '', connectedWallet.value[wallet.wallet]?.cosmosAddress ?? '')
        const converter = new TokenUnitConverter(Object.assign({},coinMetadatas.value))
        // convert to display denom
        const balances = balancesResult.balances?.map(b => {
          try {
            return converter.baseToDisplay(b)
          } catch {
            return b
          }
        });
        accountBalances.value = [...balances, ...balancesResult.balances];
      }
    }
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
              
              connectedWallet.value[walletName] = {
                wallet: walletName,
                cosmosAddress: first.address,
                evmAddress: first.evmAddress,
                hdPath: hdPath,
                accounts
              };
              writeWallet(connectedWallet.value[walletName]!);
              loadBalances()
          }
      } catch (e: any) {
          error.value = e.message;
      }
      sending.value = false;
      return Promise.resolve(connectedWallet.value)
  }

  function disconnect(walletName: WalletName|undefined) {
    if(walletName && connectedWallet.value[walletName]) {
      removeWallet(walletName, connectedWallet.value[walletName]!.hdPath);
      connectedWallet.value[walletName] = undefined
    } else {
      for(const wallet of Object.values(connectedWallet.value)) {
        if(wallet) {
          removeWallet(wallet.wallet, connectedWallet.value[wallet.wallet]!.hdPath);
          connectedWallet.value[wallet.wallet] = undefined
        }
      }
    }
  }

  return { 
    walletList,
    connectedWallet,
    sending,
    error,
    accountBalances,
    connect,
    disconnect,
    loadWalletsFromLocalStorage
  }
})