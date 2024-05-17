<template>
    <div>
    <v-menu 
        :open-on-hover="true"
        :close-on-content-click="false"
    >
        <template v-slot:activator="{ props }">
            <v-btn
            density="comfortable"
            icon="mdi-wallet-outline"
            color="primary"
            v-bind="props"
            >
            </v-btn>
        </template>
        <v-list v-if="connectedWallet == null" desity="compact">
            <v-list-item  class="text-center">
                <v-btn @click="toggleOverlay" color="primary" size="small">
                    <v-icon icon="mdi-wallet" class="pr-1"/>
                    {{ t('dhWidget.dhConnectWallet.connect') }}
                </v-btn>
            </v-list-item>
        </v-list>
        <v-list v-else density="compact">
            <v-list-item class="text-caption">
                <v-list-item-title>{{ connectedWallet!.wallet }}</v-list-item-title>
                <v-divider></v-divider>
                <div @click="() => emit('bech32Address', connectedWallet!.cosmosAddress)"><b>bech32:</b> {{ connectedWallet!.cosmosAddress }}</div>
                <div @click="() => emit('evmAddress', connectedWallet!.evmAddress)"><b>EVM:</b> {{ connectedWallet!.evmAddress }}</div>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item class="text-caption">
                <v-list-item-title size="small" role="button" @click="disconnectWallet">{{ t('dhWidget.dhConnectWallet.disconnect') }}</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
    <v-overlay v-model="overlayOpen" class="align-center justify-center">
        <v-card class="wallet-selector-card">
            <v-card-title>
                {{ t('dhWidget.dhConnectWallet.selectWallet') }}
            </v-card-title>
            <v-card-text class="pa-2">
                <v-list location="center">
                    <v-list-item
                    v-for="(i, index) in walletList"
                    :value="index"
                    :prepend-avatar="i.logo"
                    @click="() => selectAndConnect(i.wallet)"
                    :selected="i.wallet == selectedWallet"
                    :key="i.wallet"
                    >
                        <v-list-item-title>{{ i.wallet }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-overlay>
    </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '../../lib/stores/wallet';
import { useBlockchainStore } from '../../lib/stores/blockchain';
import { WalletName } from '../../lib/wallet/Wallet'
import { coinType2HDPath } from '../../lib/utils/format';
import { useI18n } from 'vue-i18n';
import { messages } from '../../lib/i18n';

const { t } = useI18n({
    messages
})

const { connect, disconnect } = useWalletStore()
const { connectedWallet, walletList, error } = storeToRefs(useWalletStore())
const { selectedBlockchain } = storeToRefs(useBlockchainStore())

const selectedWallet: Ref<WalletName|null> = ref(null)

const emit = defineEmits(['connect', 'disconnect', 'settings', 'bech32Address', 'evmAddress']);

const overlayOpen = ref(false)

function toggleOverlay() {
    overlayOpen.value  = !overlayOpen.value;
}

function selectAndConnect(walletName: WalletName) {
    selectedWallet.value = walletName;
    connectWallet();
}

function connectWallet() {
    connectedWallet.value = null
    console.log(selectedBlockchain.value?.chainId)
    connect(selectedWallet.value ?? WalletName.Keplr, selectedBlockchain.value?.chainId ?? '', coinType2HDPath(parseInt(selectedBlockchain.value?.bip44?.coinType.toString() || '118')) ?? '', selectedBlockchain.value?.bech32Config.bech32PrefixAccAddr ?? '')
    .then(async () => {
        if(connectedWallet.value == null) {
            await alert(JSON.stringify(error.value, null, 2));
        } else {
            overlayOpen.value = false;
            emit('connect', connectedWallet.value)
        }
    })
}

function disconnectWallet() {
    disconnect();
    emit('disconnect')
}

defineExpose({
    connectWallet,
})
</script>
<style lang="scss" scoped>
.wallet-selector-card{
    min-width: 300px;
}
</style>