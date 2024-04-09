<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTransactionStore } from '../../stores/transaction';
const {
    txError,
    txMsg,
    txStep,
    txHash,
    isSendingTx,
    skipGasEstimation
} = storeToRefs(useTransactionStore())

const txDialogOpen = ref(true)
const emit = defineEmits(['close', 'retry']);

function disableGasEstimation() {
    skipGasEstimation.value = true;
    emit('retry')
}

</script>
<template>
    <div>
    <v-card class="tx-dialog-card">
        <v-card-title class="d-flex align-center">
            <div class="flex-grow-1">{{ 'Transaction' }}</div>
            <v-btn @click="() => { txDialogOpen = false; }" size="small" class="justify-center" icon="mdi-close"></v-btn>
        </v-card-title>
        <v-card-text class="pa-5">
            <v-container class="overflow-y-auto" style="max-height:450px;">
                <v-row no-gutters>
                    <v-col>
                        Hash
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col>
                        {{ txHash }}
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        {{ txStep }}
                        <v-progress-linear
                            :model-value="txStep"
                            :min="0"
                            :max="100"
                            :color="txError ? 'red' : (txMsg.toLowerCase().includes('submitted') ? 'orange' : 'green')"
                            height="20"
                        />
                    </v-col>
                </v-row>
                <v-row v-if="txError" color="danger">
                    <v-col>{{  txError }}</v-col>
                </v-row>
                <v-row v-if="txMsg" color="success">
                    <v-col>{{  txMsg }}</v-col>
                </v-row>
            </v-container>
        </v-card-text>
        <v-card-actions>
            <v-btn :disabled="isSendingTx" @click="() => emit('close')">
                Close
            </v-btn>

            <v-btn
                @click="disableGasEstimation"
                v-if="txError.toLowerCase().includes('failed to simulate tx gas')"
                :disabled="isSendingTx">
                Disable Gas Estimation
            </v-btn>
        </v-card-actions>
    </v-card>
</div>
</template>
<script lang="ts" scoped>
export default {
    name: 'TxDialog',
};
</script>
<style lang="scss">
.tx-dialog-card {
    min-width: 400px;
}

</style>
