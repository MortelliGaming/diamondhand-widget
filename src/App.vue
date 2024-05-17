
<script lang="ts" setup>
import components from 'vuetify/dist/vuetify.js' //For having types in all files while dev
import DhConnectWallet from './components/ConnectWallet/ConnectWallet.vue';
import DhTxDialog from './components/TxDialog/TxDialog.vue';

import { Account, WalletName } from './lib/wallet/Wallet';
import { BlockchainConfigSimple, type TxDialogParams } from './lib/utils/type';
import { Ref, ref } from 'vue';
import { ChainInfo } from '@keplr-wallet/types';

const crossfi: Ref<ChainInfo> = ref({
  "rpc": "https://crossfitestnetrpc.diamondhand.capital",
  "rest": "https://crossfitestnetapi.diamondhand.capital",
  "chainId": "crossfi-evm-testnet-1",
  "chainName": "CrossFi Testnet",
  "chainSymbolImageUrl": "https://media.licdn.com/dms/image/D4E0BAQEs0PUwKhAw9g/company-logo_200_200/0/1699597847512/crossfichain_logo?e=2147483647&v=beta&t=36793GMlIOqcltdR6gIdZhOpT8OpANC52XwQ4gewqmg",
  "nodeProvider": {
    "name": "CrossFi Foundation",
    "website":"https://crossfi.org/",
    "email": "info@crossfi.org"
  },
  "stakeCurrency": {
    "coinDenom": "MPX",
    "coinMinimalDenom": "mpx",
    "coinDecimals": 18
  },
  "bip44": {
    "coinType": 60
  },
  "bech32Config": {
    "bech32PrefixAccAddr": "mx",
    "bech32PrefixAccPub": "mxpub",
    "bech32PrefixValAddr": "mxvaloper",
    "bech32PrefixValPub": "mxvaloperpub",
    "bech32PrefixConsAddr": "mxvalcons",
    "bech32PrefixConsPub": "mxvalconspub"
  },
  "currencies": [
    {
      "coinDenom": "MPX",
      "coinMinimalDenom": "mpx",
      "coinDecimals": 18
    },{
      "coinDenom": "XFI",
      "coinMinimalDenom": "xfi",
      "coinDecimals": 18
    },{
      "coinDenom": "XFT",
      "coinMinimalDenom": "xft",
      "coinDecimals": 18
    },{
      "coinDenom": "eMPX",
      "coinMinimalDenom": "empx",
      "coinDecimals": 18
    },{
      "coinDenom": "exe",
      "coinMinimalDenom": "EXE",
      "coinDecimals": 18
    },{
      "coinDenom": "xUSD",
      "coinMinimalDenom": "xusd",
      "coinDecimals": 18
    }
  ],
  "feeCurrencies": [
    {
      "coinDenom": "XFI",
      "coinMinimalDenom": "xfi",
      "coinDecimals": 18,
      "gasPriceStep": {
        "low": 10000000000,
        "average": 15000000000,
        "high": 20000000000
      }
    },
    {
      "coinDenom": "MPX",
      "coinMinimalDenom": "mpx",
      "coinDecimals": 18,
      "gasPriceStep": {
        "low": 10000000000,
        "average": 15000000000,
        "high": 20000000000
      }
    }
  ],
  "features": ["eth-address-gen", "eth-key-sign", "ibc-transfer", "ibc-go", "cosmwasm"],
  "evm": {
    "rpc": '',
    "chainId": 0,
  }
})

const dhTxDialog = ref<InstanceType<typeof DhTxDialog>>();

function handleWalletConnected(wallet: Account) {
  dhTxDialog.value?.show('delegate', WalletName.Metamask, {
    fees: {
      amount: '2000',
      denom: 'mpx',
      gasLimit: '125000000000000000',
    },
    validator: 'mxvaloper1dr8v4vkuex4umggv7mxlxh5s6h38pkrpwvctjx',
    proposalId: '2',
    amount: '100',
    denom: 'MPX',
    sourceValidator: 'mxvaloper1dr8v4vkuex4umggv7mxlxh5s6h38pkrpwvctjx',
    destinationValidator: 'mxvaloper1dr8v4vkuex4umggv7mxlxh5s6h38pkrpwvctjx',
    option: '1'
  } as TxDialogParams)
}

setTimeout(() => {
  dhTxDialog.value?.show('deposit', WalletName.Metamask)
}, 100)
</script>

<template>
  <v-app>
    <v-main>
      <dh-connect-wallet
        @connect="handleWalletConnected"
        @disconnect="() => {}"
        @bech32-address="(address) => { console.log(address)}"
        @evm-address="(address) => { console.log(address) }"
        :blockchain-config="crossfi"
        />
      <dh-tx-dialog
        ref="dhTxDialog"
        @submitted="(txHash: string) => { console.log('submitted ' + txHash )}"
        @confirmed="(txHash: string) => { console.log('confirmed ' + txHash )}"
        @error="(error: string) => { console.log('error ' + error )}"
        :blockchain-config="crossfi"
        :type="'deposit' "/>
    </v-main>
  </v-app>
</template>
