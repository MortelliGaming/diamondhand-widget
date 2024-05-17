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
        <v-list v-if="connectedWallets.length == 0" desity="compact">
            <v-list-item  class="text-center">
                <v-btn @click="toggleOverlay" color="primary" size="small">
                    <v-icon icon="mdi-wallet" class="pr-1"/>
                    {{ t('dhWidget.dhConnectWallet.connect') }}
                </v-btn>
            </v-list-item>
        </v-list>
        <v-list v-else density="compact">
            <v-list-item class="text-caption" v-for="(wallet, i) in connectedWallets" :key="i">
                <div class="d-flex flex-row">
                    <v-list-item-title>{{ wallet.wallet }}</v-list-item-title>
                    <div class="text-right flex-grow-1">
                        <v-btn size="xx-small" icon="mdi-logout" @click="disconnectWallet(wallet.wallet)"/>
                    </div>
                </div>
                <v-divider></v-divider>
                <div @click="() => emit('bech32Address', wallet?.cosmosAddress)"><b>bech32:</b> {{ wallet?.cosmosAddress }}</div>
                <div @click="() => emit('evmAddress', wallet?.evmAddress)"><b>EVM:</b> {{ wallet?.evmAddress }}</div>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item  class="text-center">
                <v-btn @click="toggleOverlay" color="primary" size="small">
                    <v-icon icon="mdi-wallet" class="pr-1"/>
                    {{ t('dhWidget.dhConnectWallet.connect') }}
                </v-btn>
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
                    v-for="(i, index) in notConnectedWallets"
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
import { computed, ref, type Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '../../lib/stores/wallet';
import { useBlockchainStore } from '../../lib/stores/blockchain';
import { WalletName } from '../../lib/wallet/Wallet';
import { coinType2HDPath } from '../../lib/utils/format';
import { useI18n } from 'vue-i18n';
import { messages } from '../../lib/i18n';

const { t } = useI18n({
    messages
})

const { connect, disconnect, loadWalletsFromLocalStorage } = useWalletStore()
const { connectedWallet, walletList, error } = storeToRefs(useWalletStore())
const { selectedBlockchain } = storeToRefs(useBlockchainStore())

const selectedWallet: Ref<WalletName|null> = ref(null)

const emit = defineEmits(['connect', 'disconnect', 'settings', 'bech32Address', 'evmAddress']);

const overlayOpen = ref(false)

const notConnectedWallets = computed(() => {
    return walletList.value.filter(wa => !connectedWallets.value.map(w => w.wallet).includes(wa.wallet))
})
const connectedWallets = computed(() => {
    return Object.values(connectedWallet.value)?.filter(o => o != undefined)
})

function toggleOverlay() {
    overlayOpen.value  = !overlayOpen.value;
}

function selectAndConnect(walletName: WalletName) {
    selectedWallet.value = walletName;
    connectWallet();
    selectedWallet.value = null;
}

function handleConnect() {
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

function connectWallet() {
    loadWalletsFromLocalStorage();
    if(selectedWallet.value) {
        handleConnect()
    } else {
        console.log('?')
        for(const walletName of connectedWallets.value.map(w => w.wallet)) {
            selectedWallet.value = walletName;
            handleConnect()
        }
        selectedWallet.value = null;
    }
    // connectedWallet.value[selectedWallet.value || WalletName.Keplr] = undefined
    console.log(selectedBlockchain.value?.chainId)
}

function disconnectWallet(walletName: WalletName|undefined) {
    disconnect(walletName);
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