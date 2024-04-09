<script lang="ts" setup>
import { computed, ref } from 'vue';
import { getDelegateRewards } from '../../../lib/utils/http'

import { useWalletStore } from '../../../stores/wallet';
import { useBlockchainStore } from '../../../stores/blockchain';
import { storeToRefs } from 'pinia';

import { useI18n } from 'vue-i18n';
import { messages } from '../../../lib/i18n/index';

const { t } = useI18n({
    messages
})

const { connectedWallet } = storeToRefs(useWalletStore())
const { selectedBlockchain } = storeToRefs(useBlockchainStore())

const props = defineProps({
    params: Object as any
})
const rewards = ref([] as { reward: { amount: string, denom: string }, validator_address: string }[])

const msgs = computed(() => {
    return rewards.value.map(x => {
        return {
            typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
            value: {
                delegatorAddress: connectedWallet.value?.cosmosAddress,
                validatorAddress: x.validator_address,
            },
        }
    })
})

const isValid = computed(() => {
    let ok = true
    let error = ""
    if (!connectedWallet.value?.cosmosAddress) {
        ok = false
        error = "Sender is empty"
    }
    if (rewards.value.length === 0) {
        ok = false
        error = "No delegation found"
    }
    return { ok, error }
})

function initial() {
    if(props.params) {
        // 
    }
    getDelegateRewards(selectedBlockchain.value?.api[0] || '', connectedWallet.value?.cosmosAddress || '').then(x => {
        rewards.value = x.rewards
    })
}

defineExpose({ msgs, isValid, initial })
</script>
<template>
    <v-row no-gutters class="font-caption">
        <v-col>
            <v-text-field
                :disabled="true"
                density="compact"
                :model-value="connectedWallet?.cosmosAddress"
                :label="t('dhWidget.dhTxDialog.sender')"
            ></v-text-field>
        </v-col>
    </v-row>
</template>