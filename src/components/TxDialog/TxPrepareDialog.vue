<script setup lang="ts">
import { ref, computed, type PropType } from 'vue';
import { storeToRefs } from 'pinia';
import {
    getLatestBlock,
    getStakingParam,
} from '../../lib/utils/http';
import { BroadcastMode, type TxDialogParams } from '../../lib/utils/type';

import { useWalletStore } from '../../stores/wallet';
import { useBlockchainStore } from '../../stores/blockchain';
import { useTransactionStore } from '../../stores/transaction';

// cosmos sdk messages
import Delegate from './messages/Delegate.vue';
import Deposit from './messages/Deposit.vue';
import Redelegate from './messages/Redelegate.vue';
import Send from './messages/Send.vue';
import Transfer from './messages/Transfer.vue';
import Unbond from './messages/Unbond.vue';
import Vote from './messages/Vote.vue';
import Withdraw from './messages/Withdraw.vue';
import WithdrawCommission from './messages/WithdrawCommission.vue';

// wasm msgs
import StoreCode from './wasm/StoreCode.vue';
import ExecuteContract from './wasm/ExecuteContract.vue';
import InstantiateContract from './wasm/InstantiateContract.vue';
import MigrateContract from './wasm/MigrateContract.vue';
import UpdateAdmin from './wasm/UpdateAdmin.vue';
import ClearAdmin from './wasm/ClearAdmin.vue';

// evm messages


import { useI18n } from 'vue-i18n';
import { messages } from '../../lib/i18n';

const { t } = useI18n({
    messages
})

// import ChainRegistryClient from '@ping-pub/chain-registry-client';
const props = defineProps({
    type: String,
    params: Object as PropType<TxDialogParams>
});

const msgType = computed(() => {
    switch (props.type?.toLowerCase()) {
        case 'send':
            return Send;
        case 'delegate':
            return Delegate;
        case 'withdraw':
            return Withdraw;
        case 'withdraw_commission':
            return WithdrawCommission;
        case 'redelegate':
            return Redelegate;
        case 'transfer':
            return Transfer;
        case 'unbond':
            return Unbond;
        case 'vote':
            return Vote;
        case 'deposit':
            return Deposit;
        case 'wasm_store_code':
            return StoreCode;
        case 'wasm_execute_contract':
            return ExecuteContract;
        case 'wasm_instantiate_contract':
            return InstantiateContract;
        case 'wasm_migrate_contract':
            return MigrateContract;
        case 'wasm_update_admin':
            return UpdateAdmin;
        case 'wasm_clear_admin':
            return ClearAdmin;
        default:
            return Send;
    }
});
const { selectedBlockchain } = storeToRefs(useBlockchainStore())
const { connectedWallet, accountBalances } = storeToRefs(useWalletStore())

const { sendTx } = useTransactionStore()

const advance = ref(false);
const sending = ref(false);
const dialogError = ref('');

const emit = defineEmits(['submitted', 'close']);


// input field
const msgBox = ref({
    msgs: [],
    isValid: { ok: false, error: '' },
    initial: function () { },
});


const feeAmount = ref(2000);
const feeDenom = ref('');
const gasInfo = ref(250000);
const memo = ref('');
const chainId = ref('cosmoshub-4');
const broadcast = ref(BroadcastMode.SYNC);

async function initData() {
    if (selectedBlockchain.value?.api[0] || '' && connectedWallet.value?.cosmosAddress) {

        if(props.params?.fees) {
            feeAmount.value = parseInt(props.params.fees.amount)
            feeDenom.value = props.params.fees.denom
            gasInfo.value = parseInt(props.params.fees.gasLimit)
        }
        memo.value = ''
        try {
            getLatestBlock(selectedBlockchain.value?.api[0] || '').then((x) => {
                chainId.value = x.block.header.chain_id;
            });

            // Every sub component should have a initial function
            if (msgBox.value && msgBox.value.initial) msgBox.value.initial();
            
            // load fee denom
            getStakingParam(selectedBlockchain.value?.api[0] || '').then((res) => {
                feeDenom.value = res?.params?.bond_denom;
            })
        } catch (err) {
            dialogError.value = String(err);
        }
        sending.value = false;
    }
}

function sendTransaction() {
    sendTx({
        feeDenom: feeDenom.value,
        feeAmount: feeAmount.value.toString(),
        gasLimit: gasInfo.value.toString(),
        messages: msgBox.value.msgs,
        broadcastMode: broadcast.value,
        memo: memo.value
    }).then((txHash) => {
        if(txHash) {
            dialogError.value = ''
        } else {
            dialogError.value = 'Send Failed!'
        }
    })
}

function emitClose() {
    emit('close')
}

defineExpose({
    initData,
})
</script>
<template>
    <div>
        <v-card v-if="!connectedWallet?.cosmosAddress || connectedWallet?.cosmosAddress == ''" class="tx-dialog-card">
            <v-card-title class="d-flex align-center">
                <div class="flex-grow-1">{{ t('dhWidget.dhTxDialog.dialogTitle') }}</div>
            </v-card-title>
            <v-card-text class="pa-5">
                {{ t('dhWidget.dhTxDialog.noWalletConnected') }}
            </v-card-text>
            <v-card-actions>
                <v-btn @click="emitClose">
                    {{t('dhWidget.dhTxDialog.close')}}
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-card v-else class="tx-dialog-card">
            <v-card-title class="d-flex align-center">
                <div class="flex-grow-1">{{ t('dhWidget.dhTxDialog.prepareTransaction') }}</div>
                <v-btn @click="emitClose" size="small" class="justify-center" icon="mdi-close"></v-btn>
            </v-card-title>
            <v-card-subtitle>
                <v-row no-gutters>
                    <v-col class="d-flex align-center" style="max-height: 50px;">
                        <h3 class="flex-grow-1">
                            {{ t('dhWidget.dhTxDialog.'+props.type) }}
                        </h3>
                        <v-checkbox class="pt-6" :label="t('dhWidget.dhTxDialog.advanced')" v-model="advance"></v-checkbox>
                    </v-col>
                </v-row>
            </v-card-subtitle>
            <v-card-text class="pa-5">
                <v-container class="overflow-y-auto" style="max-height:450px;">
                    <!-- The Message Component -->
                    <component 
                        :is="msgType" 
                        ref="msgBox" 
                        :params="(props.params as any)" />
                    <!-- advanced tx settings -->
                    <div v-if="advance">
                        <v-row no-gutters>
                            <v-col cols="7">
                                <v-text-field
                                    density="compact"
                                    v-model="feeAmount"
                                    hide-details="auto"
                                    :label="t('dhWidget.dhTxDialog.fee')"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="5" class="pl-2">
                                <v-select 
                                    :label="t('dhWidget.dhTxDialog.feeDenom')"
                                    density="compact"
                                    :items="accountBalances.map(b => b.denom)"
                                    v-model="feeDenom">
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-row no-gutters>
                            <v-col>
                                <v-text-field
                                    density="compact"
                                    v-model="memo"
                                    hide-details="auto"
                                    :label="t('dhWidget.dhTxDialog.memo')"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col>
                                <v-text-field
                                    density="compact"
                                    v-model="gasInfo"
                                    hide-details="auto"
                                    :label="t('dhWidget.dhTxDialog.gasLimit')"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row >
                            <v-col>
                                <v-select 
                                    v-model="broadcast"
                                    :items="Object.values(BroadcastMode)"
                                    density="compact"
                                    :label="t('dhWidget.dhTxDialog.broadcastMode')">
                                </v-select>
                            </v-col>
                        </v-row>
                    </div>
                </v-container>
            </v-card-text>
            <v-card-actions class="justify-center">
                <div class="d-flex flex-column">
                    <v-chip
                    v-if="!msgBox.isValid.ok"
                    class="ma-2"
                    color="red-darken-1"
                    prepend-icon="mdi-close-circle"
                    >
                    {{msgBox.isValid.error}}
                    </v-chip>
                    <v-btn @click="sendTransaction" :disabled="sending || !msgBox.isValid.ok">
                        {{ t('dhWidget.dhTxDialog.send') }}
                    </v-btn>
                </div>
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
