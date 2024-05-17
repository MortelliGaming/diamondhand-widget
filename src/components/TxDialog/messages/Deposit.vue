<script lang="ts" setup>
import { computed, ref, type Ref, type PropType, inject } from 'vue';
import type { GovProposalMetadata, DepositParams } from '../../../lib/utils/type';
import { TokenUnitConverter } from '../../../lib/utils/TokenUnitConverter';

import { useWalletStore } from '../../../lib/stores/wallet';
import { useBlockchainStore } from '../../../lib/stores/blockchain';
import { storeToRefs } from 'pinia';

import { useI18n } from 'vue-i18n';
import { messages } from '../../../lib/i18n/index';
import { WalletName } from '../../../lib/wallet/Wallet';

const { t } = useI18n({
    messages
})

const { connectedWallet, accountBalances } = storeToRefs(useWalletStore())
const { coinMetadatas, depositProposals } = storeToRefs(useBlockchainStore())

const props = defineProps({
    params: Object as PropType<DepositParams>
})

const walletName: Ref<WalletName> = inject('walletName') || ref(WalletName.Keplr)

const amount = ref("")
const amountDenom = ref("")
const proposal: Ref<GovProposalMetadata|null> = ref(null)

const available = computed(() => {
    return accountBalances.value.find(b => b.denom == amountDenom.value);
});

const msgs = computed(() => {
    const convert = new TokenUnitConverter(coinMetadatas.value)
    const meta = Object.values(coinMetadatas.value).find(m => m.denom_units.map(u => u.denom).includes(amountDenom.value))
    return [{
        typeUrl: '/cosmos.gov.v1beta1.MsgDeposit',
        value: {
          depositor: connectedWallet.value[walletName.value]?.cosmosAddress,
          proposalId: proposal.value?.proposal_id,
          amount: [convert.displayToBase(meta?.base || '', {
            amount: String(amount.value),
            denom: amountDenom.value
          })],
        },
      }]
})

function setAmountDenom(denom: string) {
    amountDenom.value = denom
}
const units = computed(() => {
    return accountBalances.value.map(b => {
        if(amountDenom.value == '') {
            setAmountDenom(b.denom)
        }
        return {
            denom: b.denom,
            amount: b.amount
        }
    })
});

const isValid = computed(() => {
    let ok = true
    let error = ""
    if(!proposal.value?.proposal_id) {
        ok = false
        error = "Proposal id is empty"
    }
    if(!(Number(amount.value || '0') > 0)) {
        ok = false
        error = "Amount should be great than 0"
    }
    return { ok, error }
})

const proposalList = computed(() => {
    return depositProposals.value.map(p => ({
        value: p,
        title: p.proposal_id + ' - ' + (p.content.title || p.content['@type'])
    }))
})

function initial() {
    amount.value = '0';
    if(props.params) {
        if(props.params.proposalId) {
            proposal.value = proposalList.value.find(p => p.value.proposal_id == props.params?.proposalId)?.value ?? null
        }
        if(props.params.amount) {
            amount.value = props.params.amount
        }
        if(props.params.denom) {
            amountDenom.value = props.params.denom
        }
    }
}

defineExpose({msgs, isValid, initial})
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
    <v-row no-gutters class="font-caption">
        <v-col>
            <v-select
                density="compact"
                v-model="proposal"
                :label="t('dhWidget.dhTxDialog.proposal')"
                :items="proposalList"
                class="text-caption">
            </v-select>
        </v-col>
    </v-row>
    <v-row no-gutters class="text-caption">
        <v-col cols="7">
            <v-text-field
                type="float"
                density="compact"
                v-model="amount"
                persistent-hint
                :hint="t('dhWidget.dhTxDialog.available') + ': ' + available?.amount + ' '+ available?.denom"
                :label="t('dhWidget.dhTxDialog.amount')"
            ></v-text-field>
        </v-col>
        <v-col cols="5" class="pl-2">
            <v-select
                density="compact"
                v-model="amountDenom"
                :items="units.filter(u => u.denom).map(u => u.denom)"
                :label="t('dhWidget.dhTxDialog.denom')">
            </v-select>
        </v-col>
    </v-row>
</template>