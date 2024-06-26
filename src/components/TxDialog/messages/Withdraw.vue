<script lang="ts" setup>
import { Ref, computed, inject, ref } from 'vue';
import { getDelegateRewards } from '../../../lib/utils/http'

import { useWalletStore } from '../../../lib/stores/wallet';
import { useBlockchainStore } from '../../../lib/stores/blockchain';
import { storeToRefs } from 'pinia';

import { useI18n } from 'vue-i18n';
import { messages } from '../../../lib/i18n/index';
import { WalletName } from '../../../lib/wallet/Wallet';

const { t } = useI18n({
    messages
})

const { connectedWallet } = storeToRefs(useWalletStore())
const { selectedBlockchain } = storeToRefs(useBlockchainStore())

const props = defineProps({
    params: Object as any
})
const walletName: Ref<WalletName> = inject('walletName') || ref(WalletName.Keplr)

const rewards = ref([] as { reward: { amount: string, denom: string }, validator_address: string }[])

const msgs = computed(() => {
    return rewards.value.map(x => {
        return {
            typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
            value: {
                delegatorAddress: connectedWallet.value[walletName.value]?.cosmosAddress,
                validatorAddress: x.validator_address,
            },
        }
    })
})

const isValid = computed(() => {
    let ok = true
    let error = ""
    if (!connectedWallet.value[walletName.value]?.cosmosAddress) {
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
    getDelegateRewards(selectedBlockchain.value?.rest || '', connectedWallet.value[walletName.value]?.cosmosAddress || '').then(x => {
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
                :model-value="connectedWallet[walletName]?.cosmosAddress"
                :label="t('dhWidget.dhTxDialog.sender')"
            ></v-text-field>
        </v-col>
    </v-row>
</template>