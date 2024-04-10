<script setup lang="ts">
import ConnectWalletMenu from './ConnectWalletMenu.vue'
import { type PropType, ref, watch } from 'vue';
import type { BlockchainConfigSimple } from '../../lib/utils/type';
import { useBlockchainStore } from '../../lib/stores/blockchain';
import { storeToRefs } from 'pinia';

const props = defineProps({
    blockchainConfig: {
        type: Object as PropType<BlockchainConfigSimple>,
        required: true
    }
});

const emit = defineEmits(['connect', 'disconnect', 'bech32Address', 'evmAddress']);

const { selectedBlockchain } = storeToRefs(useBlockchainStore())
const connected = ref(null)
const connectMenu = ref({
    connectWallet: () => {}
})
setTimeout(() => {
})

selectedBlockchain.value = props.blockchainConfig
watch(props, () => {
    selectedBlockchain.value = props.blockchainConfig;
    connectMenu.value?.connectWallet();
})

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
            v-show="!((connected as any)?.cosmosAddress) || true">
        </ConnectWalletMenu>
    </div>
</template>

<style scoped></style>
../../lib/stores/blockchain