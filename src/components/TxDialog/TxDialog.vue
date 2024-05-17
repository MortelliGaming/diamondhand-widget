<template>
    <div>
        <v-overlay v-model="visible" class="align-center justify-center">
            <tx-prepare-dialog
                v-show="dialogState == DialogState.DIALOG_STATE_PREPARE"
                ref="txPrepareDialog"
                :type="txType"
                :params="(txDialogParams as any)"
                @close="hide"
            />
            <tx-progress-dialog
                v-if="dialogState != DialogState.DIALOG_STATE_PREPARE"
                @retry="() => { dialogState = DialogState.DIALOG_STATE_PREPARE }"
                @close="hide"
            />
        </v-overlay>
    </div>
</template>
<script setup lang="ts">
import { provide, ref, type PropType, type Ref } from 'vue';

import TxProgressDialog from './TxProgressDialog.vue';
import TxPrepareDialog from './TxPrepareDialog.vue';

import type { DhDialogMessageType, TxDialogParams } from '../../lib/utils/type';
import { useBlockchainStore } from '../../lib/stores/blockchain';
import { useTransactionStore } from '../../lib/stores/transaction';

// evm messages
import { watch } from 'vue';
import { ChainInfo } from '@keplr-wallet/types';
import { storeToRefs } from 'pinia';
import { WalletName } from '../../lib/wallet/Wallet';

enum DialogState {
    DIALOG_STATE_PREPARE,
    DIALOG_STATE_COMITTED,
    DIALOG_STATE_CONFIRMED,
    DIALOG_STATE_ERROR,
}

const { isSendingTx, txHash, txError, txMsg, txStep, skipGasEstimation } = storeToRefs(useTransactionStore())
const { selectedBlockchain } = storeToRefs(useBlockchainStore())

const props = defineProps({
    blockchainConfig: {
        type: Object as PropType<ChainInfo>,
        required: false
    },
});

const walletName: Ref<WalletName> = ref(WalletName.Keplr)

const dialogState = ref(DialogState.DIALOG_STATE_PREPARE)

const txType = ref('send')
const txDialogParams: Ref<TxDialogParams|undefined> = ref(undefined)
const txPrepareDialog = ref<InstanceType<typeof TxPrepareDialog>>();
    
const visible = ref(false)

const emit = defineEmits(['submitted', 'confirmed', 'error']);

function show(txMessageType: DhDialogMessageType, wallet: WalletName, dialogParams?: TxDialogParams) {
    if(props.blockchainConfig) {
        selectedBlockchain.value = props.blockchainConfig
    }
    walletName.value = wallet
    skipGasEstimation.value = false
    txError.value = ''
    txMsg.value = ''
    txHash.value = ''
    txStep.value = 0
    dialogState.value = DialogState.DIALOG_STATE_PREPARE
    txType.value = txMessageType;
    txDialogParams.value = dialogParams
    visible.value = true;
    // the ref is set a little bit later
    setTimeout(() => {
        txPrepareDialog.value?.initData();
    }, 10)
}
function hide() {
    visible.value = false;
}

provide('walletName', walletName);

defineExpose({
    show,
    hide
})

watch(isSendingTx, async (newValue, oldValue) => {
  if(oldValue == false && newValue == true) {
    dialogState.value = DialogState.DIALOG_STATE_COMITTED
    emit('submitted', txHash.value)
  }
  if(newValue == false && oldValue == true) {
    if(txError.value) {
        dialogState.value = DialogState.DIALOG_STATE_ERROR
        emit('error', txError.value)
    } else if(txMsg.value) {
        emit('confirmed', txMsg)
        dialogState.value = DialogState.DIALOG_STATE_CONFIRMED
    } else {
        emit('error', 'unexpected tx error')
        dialogState.value = DialogState.DIALOG_STATE_ERROR
    }
  }
})

</script>
<style lang="scss">
.tx-dialog-card {
    min-width: 400px;
}
</style>