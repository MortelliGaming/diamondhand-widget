<script lang="ts" setup>
import { type PropType, computed, ref, type ComputedRef, type Ref } from 'vue';
import { getActiveValidators, getDelegationsByDelegator, getStakingParam } from '../../../lib/utils/http'
import type { Coin, UnbondParams } from '../../../lib/utils/type';
import { TokenUnitConverter } from '../../../lib/utils/TokenUnitConverter';

import { useWalletStore } from '../../../lib/stores/wallet';
import { useBlockchainStore } from '../../../lib/stores/blockchain';
import { storeToRefs } from 'pinia';

import { useI18n } from 'vue-i18n';
import { messages } from '../../../lib/i18n/index';
import { toBech32, fromBech32 } from '@cosmjs/encoding';
import { decimal2percent } from '../../../lib/utils/format';

const { t } = useI18n({
    messages
})

const props = defineProps({
    params: Object as PropType<UnbondParams>,
});

const { connectedWallet } = storeToRefs(useWalletStore())
const { selectedBlockchain, coinMetadatas } = storeToRefs(useBlockchainStore())

const validator = ref('')
const activeValidators = ref([])
const inactiveValidators = ref([])

const amount = ref("")
const amountDenom = ref("")
const stakingDenom = ref("")
const error = ref("")

const delegations: Ref<[{
    balance: Coin,
    delegation: {
        delegator_address: string,
        shares: string,
        validator_address: string
    }
}]> = ref([] as any) 

const msgs = computed(() => {
    const convert = new TokenUnitConverter(coinMetadatas.value)
    return [{
        typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
        value: {
          delegatorAddress: connectedWallet.value?.cosmosAddress,
          validatorAddress: validator.value,
          amount: convert.displayToBase(stakingDenom.value, {
            amount: String(amount.value),
            denom: amountDenom.value,
          }),
        },
      }]
})

const available = computed(() => {
    const convert = new TokenUnitConverter(coinMetadatas.value)
    const base = delegations.value.find(d => d.delegation.validator_address == validator.value)?.balance || { amount: "0", denom: stakingDenom.value }
    return {
        base,
        display: convert.baseToUnit(base, amountDenom.value)
    }
})

const units = computed(() => {
    if(!coinMetadatas.value || !coinMetadatas.value[stakingDenom.value]) {
        setDenom(stakingDenom.value)
        return [{denom: stakingDenom.value, exponent: 0, aliases: []}]
    }
    let list = coinMetadatas.value[stakingDenom.value].denom_units;
    list = list.sort((a, b) => b.exponent - a.exponent)
    if(list.length > 0) setDenom(list[0].denom)
    return list
})

const isValid = computed(() => {
    let ok = true
    let error = ""
    if(connectedWallet.value?.cosmosAddress == '') {
        ok = false
        error = "Sender is empty"
    }
    else if(validator.value == '') {
        ok = false
        error = "Validator is empty"
    }
    else if(!(Number(amount.value) > 0)) {
        ok = false
        error = "Amount should be great than 0"
    }
    else if((Number(amount.value) > Number(available.value.display.amount))) {
        ok = false
        error = "Amount cannot be greater than balance"
    }
    return { ok, error }
})


const list: ComputedRef<{
    operator_address: string,
    consensus_pubkey: any,
    description: {moniker: string}
    commission: { commission_rates: {rate: string}}
    status: string
}[]> = computed(() => {
    return [...activeValidators.value, ...inactiveValidators.value]
})

const delegatedValidatorList = computed(() => {
    return delegatedValidators.value.filter(v => v != undefined).map(v => ({value: v!.operator_address, title: v!.description.moniker + ' (' + decimal2percent(v!.commission.commission_rates.rate) +'%)' + (v!.status !== 'BOND_STATUS_BONDED' ? (v!.status == 'BOND_STATUS_JAILED' ? ' [!! JAILED !!]' : ' [ INACTIVE ]' ) : '')}))
})
const delegatedValidators = computed(() => {
    return delegations.value?.map(d => list.value.find(v => toBech32(selectedBlockchain.value?.addr_prefix + 'valoper' ||'', fromBech32(v.operator_address).data) == d.delegation.validator_address))
})

function setDenom(denom: string) {
    amountDenom.value = denom
}
async function initial() {
    if(props.params?.validator) {
        validator.value = props.params.validator;
    }
    if(props.params?.amount) {
        amount.value = props.params.amount;
    }
    if(props.params?.denom) {
        amountDenom.value = props.params.denom;
    }

    await getDelegationsByDelegator(selectedBlockchain.value?.api[0] || '', connectedWallet.value?.cosmosAddress || '').then(x => {
        delegations.value = x.delegation_responses
        if(delegations.value?.length > 0 && validator.value == '') {
            validator.value = delegations.value[0].delegation?.validator_address
        }
    }).catch(err => {
        error.value = err
    })

    await getStakingParam(selectedBlockchain.value?.api[0] || '').then((x) => {
        stakingDenom.value = x.params.bond_denom;
    });

    await getActiveValidators(selectedBlockchain.value?.api[0] || '').then(x => {
        activeValidators.value = x.validators
    })
}

defineExpose({msgs, isValid, initial})
</script>
<template>
    <v-row no-gutters>
        <v-col>
            <v-text-field
                :disabled="true"
                density="compact"
                :model-value="connectedWallet?.cosmosAddress"
                :label="t('dhWidget.dhTxDialog.delegator')"
            ></v-text-field>
        </v-col>
    </v-row>
    <v-row no-gutters class="font-caption">
        <v-col>
            <v-select
                density="compact"
                v-model="validator"
                :label="t('dhWidget.dhTxDialog.validator')"
                :items="delegatedValidatorList"
                class="text-caption">
            </v-select>
        </v-col>
    </v-row><v-row no-gutters class="text-caption">
        <v-col cols="7">
            <v-text-field
                type="float"
                density="compact"
                v-model="amount"
                persistent-hint
                :hint="t('dhWidget.dhTxDialog.available') + ': ' + available?.display.amount + ' '+ available?.display.denom"
                :label="t('dhWidget.dhTxDialog.amount')"
            ></v-text-field>
        </v-col>
        <v-col cols="5" class="pl-2">
            <v-select
                density="compact"
                v-model="amountDenom"
                :items="units.filter(u => u.denom).map(u => u.denom)"
                :label="t('dhWidget.dhTxDialog.stakingDenom')">
            </v-select>
        </v-col>
    </v-row>
</template>