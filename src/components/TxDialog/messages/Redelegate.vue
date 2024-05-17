<script lang="ts" setup>
import { type ComputedRef, type PropType, type Ref, computed, ref, inject } from 'vue';
import { getActiveValidators, getInactiveValidators, getStakingParam, getDelegationsByDelegator } from '../../../lib/utils/http'
import { decimal2percent } from '../../../lib/utils/format'
import type { Coin, RedelegateParams } from '../../../lib/utils/type';
import { TokenUnitConverter } from '../../../lib/utils/TokenUnitConverter';

import { useWalletStore } from '../../../lib/stores/wallet';
import { useBlockchainStore } from '../../../lib/stores/blockchain';
import { storeToRefs } from 'pinia';

import { useI18n } from 'vue-i18n';
import { messages } from '../../../lib/i18n/index';
import { fromBech32, toBech32 } from '@cosmjs/encoding';
import type { Validator } from "cosmjs-types/cosmos/staking/v1beta1/staking"
import { WalletName } from '../../../lib/wallet/Wallet';

const { t } = useI18n({
    messages
})

const props = defineProps({
    params: Object as PropType<RedelegateParams>,
});
const walletName: Ref<WalletName> = inject('walletName') || ref(WalletName.Keplr)


const { connectedWallet } = storeToRefs(useWalletStore())
const { selectedBlockchain, coinMetadatas } = storeToRefs(useBlockchainStore())
// const params = computed(() => JSON.parse(props.params || "{}"))

const validator = ref('')
const destinationValidator = ref('')

const activeValidators = ref([])
const inactiveValidators = ref([])
const stakingDenom = ref("")
const amount = ref("")
const amountDenom = ref("")
const delegations: Ref<[{
        balance: Coin,
        delegation: {
            delegator_address: string,
            shares: string,
            validator_address: string
        }
    }]> = ref([] as any) 
const error = ref("")

const msgs = computed(() => {
    const convert = new TokenUnitConverter(coinMetadatas.value)
    return [{
        typeUrl: '/cosmos.staking.v1beta1.MsgBeginRedelegate',
        value: {
          delegatorAddress: connectedWallet.value[walletName.value]?.cosmosAddress,
          validatorSrcAddress: validator.value,
          validatorDstAddress: destinationValidator.value,
          amount: convert.displayToBase(stakingDenom.value, {
            amount: String(amount.value),
            denom: amountDenom.value,
          }),
        },
      }]
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


const validatorList = computed(() => {
    return list.value
        .map(v => ({
                value: v.operator_address, 
                title: v.description.moniker + ' (' + decimal2percent(v.commission.commission_rates.rate) +'%)' + (v.status !== 'BOND_STATUS_BONDED' ? (v.status == 'BOND_STATUS_JAILED' ? ' [!! JAILED !!]' : ' [ INACTIVE ]' ) : '')
            }))
})
const delegatedValidatorList = computed(() => {
    return delegatedValidators.value.filter(v => v != undefined).map(v => ({value: v!.operator_address, title: v!.description.moniker + ' (' + decimal2percent(v!.commission.commission_rates.rate) +'%)' + (v!.status !== 'BOND_STATUS_BONDED' ? (v!.status == 'BOND_STATUS_JAILED' ? ' [!! JAILED !!]' : ' [ INACTIVE ]' ) : '')}))
})
const delegatedValidators = computed(() => {
    return delegations.value?.map(d => list.value.find(v => toBech32(selectedBlockchain.value?.bech32Config.bech32PrefixValAddr ||'', fromBech32(v.operator_address).data) == d.delegation.validator_address))
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
    if(!validator.value) {
        ok = false
        error = "Validator is empty"
    }
    if(!destinationValidator.value) {
        ok = false
        error = "Destinattion Validator is empty"
    }
    if((!(Number(amount.value) > 0)) || Number(amount.value) > Number(available.value.display.amount)) {
        ok = false
        error = "Amount should be great than 0 and not more than u have staked on the source validator"
    }
    return { ok, error }
})

function setDenom(denom: string) {
    amountDenom.value = denom
}

function loadInactiveValidators() {
    getInactiveValidators(selectedBlockchain.value?.rest || '').then((x) => {
        inactiveValidators.value = x.validators;
    });
}

async function initial() {
    if(props.params?.sourceValidator) {
        validator.value = props.params.sourceValidator;
    }
    if(props.params?.destinationValidator) {
        destinationValidator.value = props.params.destinationValidator;
    }
    if(props.params?.amount) {
        amount.value = props.params.amount;
    }
    if(props.params?.denom) {
        amountDenom.value = props.params.denom;
    }

    await getDelegationsByDelegator(selectedBlockchain.value?.rest || '', connectedWallet.value[walletName.value]?.cosmosAddress || '').then(x => {
        delegations.value = x.delegation_responses
        if(delegations.value?.length > 0 && validator.value == '') {
            validator.value = delegations.value[0].delegation.validator_address
        }
    }).catch(err => {
        error.value = err
    })

    await getStakingParam(selectedBlockchain.value?.rest || '').then((x) => {
        stakingDenom.value = x.params.bond_denom;
    });

    await getActiveValidators(selectedBlockchain.value?.rest || '').then(x => {
        activeValidators.value = x.validators
        if(destinationValidator.value == '') {
            destinationValidator.value = x.validators.find((v: Validator) => v.description.identity === '32BEA58DE3D6EDB7')?.operator_address
        }
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
                :model-value="connectedWallet[walletName]?.cosmosAddress"
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
    </v-row>
    <v-row no-gutters class="font-caption">
        <v-col cols="7">
            <v-select
                density="compact"
                v-model="destinationValidator"
                :label="t('dhWidget.dhTxDialog.validator')"
                :items="validatorList"
                class="text-caption">
            </v-select>
        </v-col>
        <v-col cols="5" class="d-flex pb-6 d-flex justify-end">
            <div class="d-flex align-center" role="button" >
                <v-btn @click="loadInactiveValidators" size="small" color="primary">
                    {{ t('dhWidget.dhTxDialog.loadInactive') }}
                </v-btn>
            </div>
        </v-col>
    </v-row>
    <v-row no-gutters class="text-caption">
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