<script lang="ts" setup>
import { type PropType, computed, ref, type Ref } from 'vue';

import { useWalletStore } from '../../../lib/stores/wallet';
import { useBlockchainStore } from '../../../lib/stores/blockchain';
import { storeToRefs } from 'pinia';

import { useI18n } from 'vue-i18n';
import { messages } from '../../../lib/i18n/index';
import type { GovProposalMetadata, VoteParams } from '../../../lib/utils/type';

const { t } = useI18n({
    messages
})

const { connectedWallet } = storeToRefs(useWalletStore())
const { votingProposals } = storeToRefs(useBlockchainStore())

const props = defineProps({
    params: Object as PropType<VoteParams>
})

const proposal: Ref<GovProposalMetadata|null> = ref(null)
const option = ref("1")

const msgs = computed(() => {
    return [{
        typeUrl: '/cosmos.gov.v1beta1.MsgVote',
        value: {
            voter: connectedWallet.value?.cosmosAddress,
            proposalId: proposal.value?.proposal_id,
            option: Number(option.value),
        },
    }]
})
const isValid = computed(() => {
    let ok = true
    let error = ""
    if(!proposal.value?.proposal_id) {
        ok = false
        error = "Proposal id is empty"
    }
    else if(!option.value) {
        ok = false
        error = "Vote is empty"
    }
    return { ok, error }
})


const proposalList = computed(() => {
    return votingProposals.value.map(p => ({
        value: p,
        title: p.proposal_id + ' - ' + (p.content.title || p.content['@type'])
    }))
})

function initial() {
    if(props.params?.proposalId) {
        proposal.value = proposalList.value.find(p => p.value.proposal_id == props.params?.proposalId)?.value || null
    }
    if(props.params?.option) {
        option.value = props.params.option
    }

    if(proposal.value == null && proposalList.value.length > 0) {
        proposal.value = proposalList.value[0].value
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
                :model-value="connectedWallet?.cosmosAddress"
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
    <v-row no-gutters class="font-caption">
        <v-col>
            <v-radio-group inline v-model="option" :label="t('dhWidget.dhTxDialog.vote')"  class="font-caption">
                <v-radio :label="t('dhWidget.dhTxDialog.yes')" value="1" ></v-radio>
                <v-radio :label="t('dhWidget.dhTxDialog.no')" value="2" ></v-radio>
                <v-radio :label="t('dhWidget.dhTxDialog.veto')" value="3" ></v-radio>
                <v-radio :label="t('dhWidget.dhTxDialog.abstain')" value="4" ></v-radio>
            </v-radio-group>
        </v-col>
    </v-row>
</template>../../../lib/stores/wallet../../../lib/stores/blockchain