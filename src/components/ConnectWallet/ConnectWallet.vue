<script setup lang="ts">
import type { ChainInfo } from '@keplr-wallet/types'
import ConnectWalletMenu from './ConnectWalletMenu.vue'
import { type PropType, ref, defineExpose, watch } from 'vue';
import { useBlockchainStore } from '../../lib/stores/blockchain';
import { storeToRefs } from 'pinia';

const props = defineProps({
    blockchainConfig: {
        type: Object as PropType<ChainInfo>,
        required: true
    }
});

const emit = defineEmits(['connect', 'disconnect', 'bech32Address', 'evmAddress']);

const { selectedBlockchain } = storeToRefs(useBlockchainStore())

const connectMenu = ref({
    connectWallet: () => {}
})

function connectWallet() {
    connectMenu.value?.connectWallet();
}
selectedBlockchain.value = props.blockchainConfig
watch(props, () => {
    if(props.blockchainConfig) {
        selectedBlockchain.value = props.blockchainConfig
        connectWallet()
        console.log('bc config changed')
    }
})

defineExpose({
    connectWallet,
});

</script>
<template>
    <div>
        <ConnectWalletMenu
            ref="connectMenu"
            @connect="(event) => emit('connect', event)"
            @disconnect="(event) => emit('disconnect', event)"
            @bech32Address="(event) => emit('bech32Address', event)"
            @evmAddress="(event) => emit('evmAddress', event)"
            theme="dark"
            v-show="true">
        </ConnectWalletMenu>
    </div>
</template>

<style scoped></style>
../../lib/stores/blockchain