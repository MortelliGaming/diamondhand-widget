<template>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn
          color="primary"
          v-bind="props"
        >
          Connect Wallet
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(i, index) in walletList"
          :key="index"
          :value="index"
          :prepend-avatar="i.logo"
        >
            <v-list-item-title>{{ i.wallet }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { WalletName } from '../../lib/wallet/Wallet';

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
</script>