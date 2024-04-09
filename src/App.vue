
<template>
  <v-app>
    <v-main>
      <dh-connect-wallet
        @connect="handleWalletConnected"
        :blockchain-config="bConfig"
        />
      <dh-tx-dialog
        ref="dhTxDialog"
        :blockchain-config="bConfig"
        :type="'deposit'"/>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import components from 'vuetify/dist/vuetify.js' //For having types in all files while dev
import DhConnectWallet from './components/ConnectWallet/ConnectWallet.vue';
import DhTxDialog from './components/TxDialog/index.vue';

import { Account } from './lib/wallet/Wallet';
import { BlockchainConfigSimple, TxDialogParams } from './lib/utils/type';
import { Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n() // for no $t errors in files while dev

const bConfig: Ref<BlockchainConfigSimple> = ref({
  "chain_name": "crossfi testnet",
  "coingecko": "crossfi",
  "chainId": "crossfi-evm-testnet-1",
  "api": ["https://crossfi-testnet-api.itrocket.net:443", "https://crossfitestnetapi.diamondhand.capital"],
  "rpc": ["https://crossfi-testnet-rpc.itrocket.net:443", "https://crossfitestnetrpc.diamondhand.capital"],
  "jsonRpc": [],
  "snapshot_provider": "",
  "sdk_version": "0.46.1",
  "coin_type": "60",
  "min_tx_fee": "800",
  "addr_prefix": "mx",
  "logo": "/logos/crossfi.jpeg",
  "theme_color": "#812cd6",
  "keplr_features": ["eth-address-gen", "eth-key-sign", "ibc-transfer", "ibc-go"],
  "has_evm_features": true,
  "assets": [{
      "base": "xfi",
      "symbol": "XFI",
      "exponent": "18",
      "coingecko_id": "xfi", 
      "logo": "/logos/xfi.jpeg",
      "isFeeAsset": true,
      "isStakingAsset": false,
  },{
      "base": "mpx",
      "symbol": "MPX",
      "exponent": "18",
      "coingecko_id": "xfi_mpx", 
      "logo": "/logos/xfi.jpeg",
      "isFeeAsset": true,
      "isStakingAsset": true,
  },{
      "base": "xft",
      "symbol": "XFT",
      "exponent": "18",
      "coingecko_id": "xft", 
      "logo": "/logos/xfi.jpeg",
      "isFeeAsset": false,
      "isStakingAsset": false,
  }]
})
const dhTxDialog = ref({
  show: function (txType: string, params?: TxDialogParams) { },
  hide: function () { },
});

function handleWalletConnected(wallet: Account) {
  dhTxDialog.value.show('withdraw_commission', {
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
  })
}

setTimeout(() => {
  dhTxDialog.value.show('deposit')
}, 100)
</script>
